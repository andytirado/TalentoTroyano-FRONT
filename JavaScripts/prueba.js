document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.profile-nav li');
    const contentTabs = document.querySelectorAll('.content-tab');
    const tabOrder = ['personal', 'contacto', 'curriculum', 'foto'];

    function changeTab(tabId) {
        navItems.forEach(item => item.classList.remove('active'));
        contentTabs.forEach(tab => tab.classList.remove('active'));

        const activeNavItem = document.querySelector(`.profile-nav li[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`tab-${tabId}`);

        if (activeNavItem) activeNavItem.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            changeTab(tabId);
        });
    });

    function validarFormulario(tab) {
        const inputs = tab.querySelectorAll('input[required]');
        let valido = true;
        tab.querySelectorAll('.error-msg').forEach(e => e.remove());
        inputs.forEach(input => input.classList.remove('input-error'));

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                valido = false;
                const error = document.createElement('div');
                error.className = 'error-msg';
                error.textContent = 'Este campo es obligatorio';
                input.classList.add('input-error');
                if (!input.nextElementSibling?.classList.contains('error-msg')) {
                    input.insertAdjacentElement('afterend', error);
                }
            }
        });
        return valido;
    }

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

    document.querySelectorAll('.btn.primary').forEach(button => {
        if (button.classList.contains('finalizar-btn')) {
            button.addEventListener('click', () => {
                let successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
            });
            return;
        }
        button.addEventListener('click', () => {
            const currentTab = button.closest('.content-tab');
            if (!currentTab) return;
            const currentId = currentTab.id.replace('tab-', '');
            const currentIndex = tabOrder.indexOf(currentId);
            if (currentIndex < tabOrder.length - 1) {
                const nextId = tabOrder[currentIndex + 1];
                changeTab(nextId);
            }
        });
    });

    const fotoInput = document.getElementById('foto-upload');
    const fotoUploadState = document.getElementById('foto-upload-state');
    const fotoSuccess = document.getElementById('foto-success');
    const fotoError = document.getElementById('foto-error-raw');

    if (fotoInput) {
        fotoInput.addEventListener('change', () => {
            const file = fotoInput.files[0];
            if (!file) return;
            const maxSize = 3 * 1024 * 1024;
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

    const curriculumInput = document.getElementById('curriculum-upload');
    const uploadState = document.getElementById('curriculum-upload-state');
    const successState = document.getElementById('curriculum-success');
    const errorState = document.getElementById('curriculum-error-docx');

    if (curriculumInput) {
        curriculumInput.addEventListener('change', () => {
            const file = curriculumInput.files[0];
            if (!file) return;
            const maxSize = 5 * 1024 * 1024;
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
