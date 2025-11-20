// JavaScripts/verPerfilEmpresa.js

document.addEventListener("DOMContentLoaded", () => {
    
    // Referencia a la imagen del logo
    const logoPublico = document.getElementById("logoPublico");

    // Intentar recuperar el logo que guardaste en el paso de "Editar Perfil"
    const logoGuardado = localStorage.getItem('empresaLogo');

    if (logoGuardado && logoPublico) {
        // Si existe una imagen guardada, la usamos en lugar del placeholder
        logoPublico.src = logoGuardado;
    }

    // (Opcional) Aquí podrías añadir lógica para cargar dinámicamente 
    // los textos (Nombre, descripción, etc.) desde una base de datos o API.
});