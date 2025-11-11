document.addEventListener('DOMContentLoaded', () => {
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
        
        // CAMBIO: Lógica del botón "Finalizar" actualizada
        if (button.classList.contains('finalizar-btn')) {
            button.addEventListener('click', () => {
                // (Opcional: aquí podrías validar la subida de foto)
                changeTab("success"); 
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
});