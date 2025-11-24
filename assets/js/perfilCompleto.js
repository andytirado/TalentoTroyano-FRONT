document.addEventListener('DOMContentLoaded', () => {

    // Permitir acceso si el usuario acaba de registrarse (flag 'pending_profile')
    const pendingProfile = (() => {
        try { return JSON.parse(localStorage.getItem('pending_profile')); } catch (e) { return null; }
    })();

    if (!pendingProfile) {
        // Solo verificar auth/rol para usuarios ya autenticados
        checkAuth();
        requireRole(USER_ROLES.STUDENT);
    } else {
        // Prefill email en la pestaña de contacto si existe
        const contactoEmail = document.querySelector('.contact-form input[name="correo"]');
        if (contactoEmail && pendingProfile.email) {
            contactoEmail.value = pendingProfile.email;
        }
        
        // Si no tiene token pero tiene credenciales, hacer login automático
        const token = getToken();
        if (!token && pendingProfile.email && pendingProfile.password) {
            console.log('=== LOGIN AUTOMÁTICO TRAS REGISTRO ===');
            console.log('Usando credenciales almacenadas para login...');
            
            // Hacer login automático con las credenciales guardadas
            fetch(API_ENDPOINTS.auth.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    usEmail: pendingProfile.email,
                    password: pendingProfile.password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta login automático:', data);
                if (data.success || data.message === 'Authenticated') {
                    const user = data.data?.user || data.user;
                    const tokenResponse = data.data?.token || data.token;
                    
                    if (tokenResponse && user) {
                        console.log('✓ Login automático exitoso, token guardado');
                        setToken(tokenResponse);
                        setUserData(user);
                    }
                }
            })
            .catch(error => console.error('Error en login automático:', error));
        }
    }
    const navItems = document.querySelectorAll('.profile-nav li');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    // CAMBIO: Añadida la nueva pestaña 'success'
    const tabOrder = ['personal', 'contacto', 'curriculum', 'foto', 'success'];

    // Función principal para mostrar una pestaña específica
    function changeTab(tabId) {
        navItems.forEach(item => item.classList.remove('active'));
        contentTabs.forEach(tab => tab.classList.remove('active'));

        const activeNavItem = document.querySelector(`.profile-nav li[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`tab-${tabId}`);
        
        if (activeNavItem) activeNavItem.classList.add('active');
        if (activeContent) activeContent.classList.add('active');

        // Caso especial: si vamos a la pestaña de éxito, deseleccionamos el nav lateral
        if (tabId === 'success') {
             navItems.forEach(item => item.classList.remove('active'));
        }
    }

    // 1. Listener para los clics en el menú lateral
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            changeTab(tabId);
        });
    });
    
    // ---------------------------
    // VALIDACIÓN DE FORMULARIOS (CAMBIO)
    // ---------------------------
    function validarFormulario(tab) {
        // Busca solo inputs requeridos DENTRO de la pestaña actual
        const inputs = tab.querySelectorAll('input[required]');
        let valido = true;

        // Eliminar mensajes anteriores
        tab.querySelectorAll('.error-msg').forEach(e => e.remove());
        tab.querySelectorAll('.input-field.input-error').forEach(field => field.classList.remove('input-error'));

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                valido = false;
                const inputField = input.closest('.input-field');

                // Crear mensaje de error
                const error = document.createElement('div');
                error.className = 'error-msg';
                error.textContent = 'Este campo es obligatorio';

                // Agregar clase para borde rojo al contenedor
                if(inputField) {
                    inputField.classList.add('input-error');
                    // Insertar el mensaje después del input-field
                    if (!inputField.nextElementSibling?.classList.contains('error-msg')) {
                         inputField.insertAdjacentElement('afterend', error);
                    }
                }
            }
        });

        return valido;
    }

    // Cuando el usuario escribe, quitar el error si corrige
    document.addEventListener('input', (e) => {
        const input = e.target;
        if (input.value.trim() !== '') {
            const inputField = input.closest('.input-field');
            if (inputField && inputField.classList.contains('input-error')) {
                inputField.classList.remove('input-error');
                const errorMsg = inputField.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-msg')) {
                    errorMsg.remove();
                }
            }
        }
    });
    
    // 2. Manejo de todos los botones "Siguiente" y "Finalizar"
    document.querySelectorAll('.btn.primary').forEach(button => {
        
        // CAMBIO: Lógica del botón "Finalizar" actualizada para enviar datos
        if (button.classList.contains('finalizar-btn')) {
            button.addEventListener('click', async () => {
                await submitProfile();
            });
            return; // Salta al siguiente botón
        }

        // CAMBIO: Lógica para "Siguiente" con validación
        button.addEventListener('click', () => {
            const currentTab = button.closest('.content-tab');
            if (!currentTab) return; 

            // --- ¡AQUÍ ESTÁ LA VALIDACIÓN! ---
            // Solo valida pestañas con un formulario que tenga la clase 'needs-validation'
            const form = currentTab.querySelector('.needs-validation');
            if (form && !validarFormulario(currentTab)) {
                return; // Detiene si el formulario no es válido
            }
            // --- FIN DE LA VALIDACIÓN ---

            const currentId = currentTab.id.replace('tab-', '');
            const currentIndex = tabOrder.indexOf(currentId);
            
            if (currentIndex < tabOrder.length - 1) {
                const nextId = tabOrder[currentIndex + 1];
                changeTab(nextId);
            }
        });
    });

    // CAMBIO: Añadido listener para el nuevo botón "Volver al inicio"
    const btnVolver = document.getElementById('btn-volver-perfil');
    if (btnVolver) {
        btnVolver.addEventListener('click', () => {
            changeTab('personal'); // Vuelve a la primera pestaña
            // Opcional: podrías querer recargar la página
            // location.reload(); 
        });
    }

    // ---------------------------
    // VALIDACIÓN DE FOTO DE PERFIL (CORREGIDO)
    // (Movido fuera del bucle forEach)
    // ---------------------------
    const fotoInput = document.getElementById('foto-upload');
    const fotoUploadState = document.getElementById('foto-upload-state');
    const fotoSuccess = document.getElementById('foto-success');
    const fotoError = document.getElementById('foto-error-raw');

    if (fotoInput) {
        fotoInput.addEventListener('change', () => {
            const file = fotoInput.files[0];
            if (!file) return;

            const maxSize = 3 * 1024 * 1024; // 3MB
            const validTypes = ['image/jpeg', 'image/png'];

            fotoUploadState.classList.remove('active');
            fotoSuccess.classList.remove('active');
            fotoError.classList.remove('active');

            if (!validTypes.includes(file.type)) {
                fotoError.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                fotoError.querySelector('.file-message').textContent = "Formato no permitido. Solo JPG o PNG.";
                fotoError.classList.add('active');
            } else if (file.size > maxSize) {
                fotoError.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                fotoError.querySelector('.file-message').textContent = "El archivo supera los 3 MB permitidos.";
                fotoError.classList.add('active');
            } else {
                fotoSuccess.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-check"></i>`;
                fotoSuccess.querySelector('.file-message').textContent = "¡Foto subida con éxito!";
                fotoSuccess.classList.add('active');
            }
        });
    }

    // ---------------------------
    // VALIDACIÓN DE CURRÍCULUM (CORREGIDO)
    // (Movido fuera del bucle forEach)
    // ---------------------------
    const curriculumInput = document.getElementById('curriculum-upload');
    const uploadState = document.getElementById('curriculum-upload-state');
    const successState = document.getElementById('curriculum-success');
    const errorState = document.getElementById('curriculum-error-docx');

    if (curriculumInput) {
        curriculumInput.addEventListener('change', () => {
            const file = curriculumInput.files[0];
            if (!file) return;

            const maxSize = 5 * 1024 * 1024; // 5MB

            uploadState.classList.remove('active');
            successState.classList.remove('active');
            errorState.classList.remove('active');

            if (file.type !== "application/pdf") {
                errorState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                errorState.querySelector('.file-message').textContent = "Revisa el formato del documento. Solo PDF permitido.";
                errorState.classList.add('active');
            } else if (file.size > maxSize) {
                errorState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                errorState.querySelector('.file-message').textContent = "El archivo supera los 5 MB permitidos.";
                errorState.classList.add('active');
            } else {
                successState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-check"></i>`;
                successState.querySelector('.file-message').textContent = "¡Currículum subido con éxito!";
                successState.classList.add('active');
            }
        });
    }
    // ---------------------------
    // FUNCIÓN PARA ENVIAR PERFIL AL BACKEND
    // ---------------------------
    async function submitProfile() {
        try {
            console.log('=== INICIANDO ENVÍO DE PERFIL ===');
            
            // Recopilar datos del formulario personal
            const personalForm = document.querySelector('.profile-form');
            const contactForm = document.querySelector('.contact-form');
            
            if (!personalForm || !contactForm) {
                console.error('Formularios no encontrados');
                alert('Error: Formularios no encontrados en la página');
                return;
            }

            // Obtener token PRIMERO
            const token = getToken();
            console.log('Token obtenido:', token ? 'Sí (primeros 20 caracteres: ' + token.substring(0, 20) + '...)' : 'NO - Token es nulo');
            
            if (!token) {
                console.error('No hay token disponible');
                alert('Error: No se encontró token de autenticación. Por favor, inicia sesión de nuevo.');
                return;
            }

            // Crear FormData para incluir archivos
            const formData = new FormData();

            // Agregar campos del formulario personal
            const personalInputs = {
                usName: personalForm.querySelector('input[name="usName"]')?.value || '',
                usLastName: personalForm.querySelector('input[name="usLastName"]')?.value || '',
                usLastName2: personalForm.querySelector('input[name="usLastName2"]')?.value || '',
                expedient: personalForm.querySelector('input[name="expedient"]')?.value || '',
                usBirthday: personalForm.querySelector('input[name="usBirthday"]')?.value || '',
                usDescription: personalForm.querySelector('input[name="usDescription"]')?.value || ''
            };

            // Agregar campos del formulario de contacto
            const contactInputs = {
                usPhoneNumber: contactForm.querySelector('input[name="usPhoneNumber"]')?.value || '',
                github: contactForm.querySelector('input[name="github"]')?.value || '',
                linkedin: contactForm.querySelector('input[name="linkedin"]')?.value || '',
                blog: contactForm.querySelector('input[name="blog"]')?.value || ''
            };

            console.log('Datos personales a enviar:', personalInputs);
            console.log('Datos de contacto a enviar:', contactInputs);

            // Agregar archivos
            const curriculumFile = document.getElementById('curriculum-upload')?.files[0];
            const fotoFile = document.getElementById('foto-upload')?.files[0];

            console.log('Curriculum:', curriculumFile ? `Sí (${curriculumFile.name})` : 'No');
            console.log('Foto perfil:', fotoFile ? `Sí (${fotoFile.name})` : 'No');

            // Primero subir el PDF al endpoint /api/documents si existe
            if (curriculumFile) {
                console.log('=== SUBIENDO PDF A /api/documents ===');

                try {
                    const pdfResponse = await uploadDocument(curriculumFile);

                    if (pdfResponse.success) {
                        console.log('✓ PDF subido exitosamente:', pdfResponse);
                    } else {
                        console.error('✗ Error al subir PDF:', pdfResponse.message);
                        alert('Error al subir el currículum: ' + (pdfResponse.message || 'Error desconocido'));
                        return;
                    }
                } catch (error) {
                    console.error('✗ Error al subir PDF:', error);
                    alert('Error al subir el currículum: ' + error.message);
                    return;
                }
            }

            // Construir FormData con todos los campos
            Object.entries(personalInputs).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            Object.entries(contactInputs).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            // Agregar foto de perfil si existe
            // NOTA: El curriculum ya se subió a /api/documents antes de llegar aquí
            if (fotoFile) {
                formData.append('usProfilePicture', fotoFile);
            }

            // IMPORTANTE: Laravel no soporta FormData en PUT, usamos POST con _method
            formData.append('_method', 'PUT');

            // Mostrar endpoint
            const endpoint = API_ENDPOINTS.students.updateProfile;
            console.log('Enviando POST (spoofing PUT) a:', endpoint);

            // Enviar al backend
            console.log('Iniciando fetch...');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // NO incluir 'Content-Type', fetch lo configura automáticamente con boundary para FormData
                },
                body: formData
            });

            console.log('Respuesta recibida - Status:', response.status, response.statusText);

            // Intentar parsear como JSON
            let data;
            try {
                data = await response.json();
                console.log('Datos de respuesta:', data);
            } catch (e) {
                console.log('No se pudo parsear JSON. Respuesta texto:', await response.text());
                data = {};
            }

            // Determinar si fue exitoso
            const isSuccess = response.ok || data.success === true || response.status === 200;
            console.log('¿Es exitoso?', isSuccess, '(response.ok:', response.ok, ', data.success:', data.success, ')');

            if (isSuccess) {
                console.log('✓ Perfil actualizado exitosamente');
                
                // Guardar token/user si viene en la respuesta
                if (data.data?.token) {
                    console.log('Actualizando token en localStorage...');
                    setToken(data.data.token);
                }
                if (data.data?.user) {
                    console.log('Actualizando datos de usuario en localStorage...');
                    setUserData(data.data.user);
                }

                // Limpiar flag de pending_profile
                localStorage.removeItem('pending_profile');
                console.log('Flag pending_profile removido');

                // Mostrar pantalla de éxito
                changeTab('success');
                console.log('Mostrando pantalla de éxito...');

                // Redirigir al dashboard después de 2 segundos
                console.log('Redirigiendo a dashboard en 2 segundos...');
                console.log('URL destino:', FRONTEND_ROUTES.student.dashboard);
                
                setTimeout(() => {
                    const redirectUrl = FRONTEND_ROUTES.student.dashboard || '/html/estudiante/homeuser.php';
                    console.log('Ejecutando redirect a:', redirectUrl);
                    window.location.replace(redirectUrl);  // Usar replace en lugar de href para evitar problemas
                }, 2000);
            } else {
                const errorMsg = data.message || data.error || 'Error desconocido';
                console.error('✗ Error al actualizar perfil:', errorMsg);
                alert('Error al actualizar perfil: ' + errorMsg);
            }
        } catch (error) {
            console.error('✗ Error en try-catch:', error);
            console.error('Stack:', error.stack);
            alert('Error al enviar perfil: ' + error.message);
        }
    }

});