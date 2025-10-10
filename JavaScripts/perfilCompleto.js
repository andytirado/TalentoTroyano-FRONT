document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.profile-nav li');
    const contentTabs = document.querySelectorAll('.content-tab');
    const tabOrder = ['personal', 'contacto', 'curriculum', 'foto'];

    // Función principal para mostrar una pestaña específica
    function changeTab(tabId) {
        navItems.forEach(item => item.classList.remove('active'));
        contentTabs.forEach(tab => tab.classList.remove('active'));

        const activeNavItem = document.querySelector(`.profile-nav li[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`tab-${tabId}`);
        
        if (activeNavItem) activeNavItem.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    // 1. Listener para los clics en el menú lateral
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            changeTab(tabId);
        });
    });
    // ---------------------------
    // VALIDACIÓN DE FORMULARIOS
    // ---------------------------
    function validarFormulario(tab) {
        const inputs = tab.querySelectorAll('input[required], select[required], textarea[required]');
        let valido = true;

        // Eliminar mensajes anteriores
        tab.querySelectorAll('.error-msg').forEach(e => e.remove());
        inputs.forEach(input => input.classList.remove('input-error'));

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                valido = false;

                // Crear mensaje de error
                const error = document.createElement('div');
                error.className = 'error-msg';
                error.textContent = 'Este campo es obligatorio';

                // Agregar clase para borde rojo
                input.classList.add('input-error');

                // Insertar el mensaje
                if (!input.nextElementSibling?.classList.contains('error-msg')) {
                    input.insertAdjacentElement('afterend', error);
                }
            }
        });

        return valido;
    }

    // Cuando el usuario escribe, quitar el error si corrige
    document.addEventListener('input', (e) => {
        const input = e.target;
        if (input.classList.contains('input-error') && input.value.trim() !== '') {
            input.classList.remove('input-error');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
                errorMsg.remove();
            }
        }
    });
    // 2. Manejo de todos los botones "Siguiente" y "Finalizar"

    // Seleccionamos TODOS los botones primarios (azules)
    document.querySelectorAll('.btn.primary').forEach(button => {
        
        // El botón "Finalizar" de la última pestaña tiene una lógica especial,
        // así que la manejamos primero y luego salimos.
        if (button.classList.contains('finalizar-btn')) {
            button.addEventListener('click', () => {
                alert("¡Perfil completado y enviado!");
            });
            return; // Salta al siguiente botón
        }

        // Esta lógica maneja el avance para:
        // - Botones de Personal y Contacto
        // - Botones "Siguiente" dentro del estado de éxito de Currículum
        button.addEventListener('click', () => {
            const currentTab = button.closest('.content-tab');
            if (!currentTab) return; // Salir si no se encuentra la pestaña

            const currentId = currentTab.id.replace('tab-', '');
            const currentIndex = tabOrder.indexOf(currentId);
            
            // Si hay una siguiente pestaña, avanzamos
            if (currentIndex < tabOrder.length - 1) {
                const nextId = tabOrder[currentIndex + 1];
                changeTab(nextId);
            } else {
                // Esto solo debería ocurrir si el botón Finalizar no tiene la clase correcta
                alert("Ya estás en la última sección.");
            }
             // ---------------------------
    // VALIDACIÓN DE FOTO DE PERFIL
    // ---------------------------
    const fotoInput = document.getElementById('foto-upload');
    const fotoUploadState = document.getElementById('foto-upload-state');
    const fotoSuccess = document.getElementById('foto-success');
    const fotoError = document.getElementById('foto-error-raw');

    if (fotoInput) {
        fotoInput.addEventListener('change', () => {
            const file = fotoInput.files[0];
            if (!file) return;

            // Tamaño máximo 3MB
            const maxSize = 3 * 1024 * 1024;
            const validTypes = ['image/jpeg', 'image/png'];

            // Ocultar todos los estados
            fotoUploadState.classList.remove('active');
            fotoSuccess.classList.remove('active');
            fotoError.classList.remove('active');

            if (!validTypes.includes(file.type)) {
                // Tipo inválido
                fotoError.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                fotoError.querySelector('.file-message').textContent = "Formato no permitido. Solo JPG o PNG.";
                fotoError.classList.add('active');
            } else if (file.size > maxSize) {
                // Tamaño excedido
                fotoError.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                fotoError.querySelector('.file-message').textContent = "El archivo supera los 3 MB permitidos.";
                fotoError.classList.add('active');
            } else {
                // Éxito
                fotoSuccess.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-check"></i>`;
                fotoSuccess.querySelector('.file-message').textContent = "¡Foto subida con éxito!";
                fotoSuccess.classList.add('active');
            }
        });
    }


    // ---------------------------
    // VALIDACIÓN DE CURRÍCULUM
    // ---------------------------
    const curriculumInput = document.getElementById('curriculum-upload');
    const uploadState = document.getElementById('curriculum-upload-state');
    const successState = document.getElementById('curriculum-success');
    const errorState = document.getElementById('curriculum-error-docx');

    if (curriculumInput) {
        curriculumInput.addEventListener('change', () => {
            const file = curriculumInput.files[0];
            if (!file) return;

            const maxSize = 5 * 1024 * 1024; // 5MB máximo

            // Ocultar todos los estados
            uploadState.classList.remove('active');
            successState.classList.remove('active');
            errorState.classList.remove('active');

            if (file.type !== "application/pdf") {
                // Error por tipo
                errorState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                errorState.querySelector('.file-message').textContent = "Revisa el formato del documento. Solo PDF permitido.";
                errorState.classList.add('active');
            } else if (file.size > maxSize) {
                // Error por tamaño
                errorState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-times"></i>`;
                errorState.querySelector('.file-message').textContent = "El archivo supera los 5 MB permitidos.";
                errorState.classList.add('active');
            } else {
                // Éxito
                successState.querySelector('.file-name-bar').innerHTML = `${file.name} <i class="fas fa-check"></i>`;
                successState.querySelector('.file-message').textContent = "¡Currículum subido con éxito!";
                successState.classList.add('active');
            }
        });
    }
});
        });
    });
