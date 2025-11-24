document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.STUDENT);

    console.log("perfilUsuarioEditar.js: Script cargado");

    // Variables globales
    let currentUserData = null;
    let selectedPhotoFile = null;

    // Elementos del formulario
    const avatarUploadInput = document.getElementById("avatar-upload-input");
    const avatarPreview = document.getElementById("avatar-preview");
    const descripcionInput = document.getElementById("alumno-descripcion");
    const nombreInput = document.getElementById("alumno-nombre");
    const apellidosInput = document.getElementById("alumno-apellidos");
    const telefonoInput = document.getElementById("alumno-telefono");
    const btnGuardar = document.getElementById("btn-guardar-perfil");

    // Cargar datos del usuario al iniciar
    await loadUserData();

    // Previsualizar foto de perfil cuando se selecciona
    if (avatarUploadInput && avatarPreview) {
        avatarUploadInput.addEventListener("change", function(event) {
            const file = event.target.files[0];

            if (file) {
                // Validar que sea una imagen
                if (!file.type.startsWith('image/')) {
                    alert('Por favor, selecciona un archivo de imagen válido');
                    return;
                }

                // Validar tamaño (máximo 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('La imagen es muy grande. El tamaño máximo es 5MB');
                    return;
                }

                console.log("Procesando imagen seleccionada...");
                selectedPhotoFile = file;

                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
                    console.log("Vista previa actualizada");
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Guardar cambios
    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
            await saveProfile();
        });
    }

    /**
     * Carga los datos actuales del usuario
     */
    async function loadUserData() {
        try {
            console.log('Cargando datos del usuario...');

            const response = await fetchCurrentUser();

            if (response.success && response.data) {
                currentUserData = response.data.data || response.data.user || response.data;

                // Llenar los campos del formulario
                if (nombreInput) {
                    nombreInput.value = currentUserData.usName || '';
                }

                if (apellidosInput) {
                    apellidosInput.value = currentUserData.usLastName || '';
                }

                if (telefonoInput) {
                    telefonoInput.value = currentUserData.usPhoneNumber || '';
                }

                if (descripcionInput) {
                    descripcionInput.value = currentUserData.usDescription || '';
                }

                // Cargar foto de perfil
                if (avatarPreview && currentUserData.usProfilePicture) {
                    const fullPhotoUrl = currentUserData.usProfilePicture.startsWith('http')
                        ? currentUserData.usProfilePicture
                        : `${API_BASE_URL.replace('/api', '')}${currentUserData.usProfilePicture}`;
                    avatarPreview.style.backgroundImage = `url('${fullPhotoUrl}')`;
                } else if (avatarPreview) {
                    // Mostrar iniciales si no hay foto
                    const inicial = (currentUserData.usName || 'U').charAt(0).toUpperCase();
                    avatarPreview.textContent = inicial;
                    avatarPreview.style.backgroundImage = 'none';
                    avatarPreview.style.backgroundColor = '#336699';
                    avatarPreview.style.color = 'white';
                    avatarPreview.style.display = 'flex';
                    avatarPreview.style.alignItems = 'center';
                    avatarPreview.style.justifyContent = 'center';
                    avatarPreview.style.fontSize = '40px';
                    avatarPreview.style.fontWeight = 'bold';
                }

                console.log('Datos del usuario cargados correctamente');
            } else {
                console.error('Error al cargar los datos del usuario:', response.message);
                alert('Error al cargar los datos del perfil');
            }
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            alert('Error de conexión al cargar el perfil');
        }
    }

    /**
     * Guarda los cambios del perfil
     */
    async function saveProfile() {
        try {
            // Validar campos requeridos
            if (!nombreInput.value.trim()) {
                alert('Por favor, ingresa tu nombre');
                nombreInput.focus();
                return;
            }

            if (!apellidosInput.value.trim()) {
                alert('Por favor, ingresa tus apellidos');
                apellidosInput.focus();
                return;
            }

            // Deshabilitar el botón mientras se guarda
            btnGuardar.disabled = true;
            btnGuardar.textContent = 'Guardando...';

            console.log('Guardando cambios del perfil...');

            // Preparar los datos a enviar
            const formData = new FormData();

            // IMPORTANTE: Agregar _method para indicar que es PUT (Laravel method spoofing)
            formData.append('_method', 'PUT');

            // Agregar campos de texto
            formData.append('usName', nombreInput.value.trim());
            formData.append('usLastName', apellidosInput.value.trim());
            formData.append('usPhoneNumber', telefonoInput.value.trim());
            formData.append('usDescription', descripcionInput.value.trim());

            // Agregar foto de perfil si fue seleccionada
            if (selectedPhotoFile) {
                formData.append('usProfilePicture', selectedPhotoFile);
            }

            // Enviar al backend
            const response = await updateMyProfile(formData);

            if (response.success) {
                alert('Perfil actualizado exitosamente');
                console.log('Perfil actualizado:', response.data);

                // Redirigir al perfil
                window.location.href = 'perfilUsuario.php';
            } else {
                console.error('Error al actualizar perfil:', response.message);
                alert('Error al actualizar el perfil: ' + (response.message || 'Error desconocido'));
            }

        } catch (error) {
            console.error('Error al guardar perfil:', error);
            alert('Error de conexión al guardar el perfil');
        } finally {
            // Rehabilitar el botón
            btnGuardar.disabled = false;
            btnGuardar.textContent = 'Guardar Cambios';
        }
    }

    /**
     * Actualiza el perfil del usuario autenticado
     * @param {FormData} formData - Datos del formulario
     * @returns {Promise<Object>} Respuesta del servidor
     */
    async function updateMyProfile(formData) {
        try {
            const token = getToken();
            const response = await fetch(API_ENDPOINTS.students.updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Accept': 'application/json',
                    // NO incluir Content-Type para FormData (se añade automáticamente)
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            } else {
                return {
                    success: false,
                    message: data.message || 'Error al actualizar el perfil',
                    errors: data.errors || {},
                };
            }
        } catch (error) {
            console.error('Error en petición de actualización:', error);
            return {
                success: false,
                message: 'Error de conexión con el servidor',
                error: error.message,
            };
        }
    }
});
