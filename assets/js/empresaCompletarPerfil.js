document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.COMPANY);

    const inputLogo = document.getElementById('inputLogo');
    const imgPreview = document.getElementById('imgPreview');
    const btnGuardar = document.getElementById('btn-guardar-perfil');

    // 1. Previsualizar imagen al seleccionar
    inputLogo.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreview.src = e.target.result;
                imgPreview.classList.remove('img-placeholder');
                imgPreview.style.width = "100%";
                imgPreview.style.height = "100%";
                imgPreview.style.objectFit = "cover";
                imgPreview.style.padding = "0";
            }
            reader.readAsDataURL(file);
        }
    });

    // 2. Guardar en LocalStorage al dar click en "Guardar y Entrar"
    btnGuardar.addEventListener('click', function() {
        // Guardamos la imagen (si existe) para usarla en empresa.html
        if (imgPreview.src && !imgPreview.src.includes('plus.svg')) {
            localStorage.setItem('empresaLogo', imgPreview.src);
        }
        
        // Aquí iría tu redirección normal
        window.location.href = 'empresa.html';
    });

});