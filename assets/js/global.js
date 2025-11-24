/**
 * global.js
 * Funcionalidad global compartida entre todas las páginas
 * - Dropdown de perfil
 * - Logout
 * - Información del usuario
 */

document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // DROPDOWN DE PERFIL
    // ============================================

    const trigger = document.getElementById("profile-avatar-trigger");
    const menu = document.getElementById("profile-menu");

    if (trigger && menu) {
        // Toggle del menú al hacer clic en el avatar
        trigger.addEventListener("click", (event) => {
            event.stopPropagation();
            menu.classList.toggle("show");
        });

        // Cerrar el menú al hacer clic fuera de él
        window.addEventListener("click", () => {
            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
            }
        });
    }

    // ============================================
    // LOGOUT
    // ============================================

    // Buscar todos los enlaces de "Cerrar Sesión"
    const logoutLinks = document.querySelectorAll('a[href*="login.php"]');

    logoutLinks.forEach(link => {
        // Si el texto contiene "Cerrar Sesión" o "Logout"
        if (link.textContent.includes('Cerrar Sesión') ||
            link.textContent.includes('Logout') ||
            link.classList.contains('dropdown-item-danger')) {

            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Llamar a la función logout de auth.js
                if (typeof logout === 'function') {
                    logout();
                } else {
                    // Fallback si auth.js no está cargado
                    console.warn('auth.js no está cargado. Limpiando localStorage manualmente.');
                    localStorage.clear();
                    window.location.href = link.href;
                }
            });
        }
    });

    // ============================================
    // CARGAR INFORMACIÓN DEL USUARIO
    // ============================================

    // Solo si hay una sesión activa
    if (typeof getUserData === 'function') {
        const userData = getUserData();

        if (userData) {
            // Mostrar nombre del usuario si existe el elemento
            const userNameElements = document.querySelectorAll('.user-name, .profile-name');
            userNameElements.forEach(el => {
                el.textContent = userData.nombre || userData.email;
            });

            // Actualizar avatar si tiene foto
            if (userData.foto_perfil) {
                const avatarElements = document.querySelectorAll('.avatar');
                avatarElements.forEach(avatar => {
                    avatar.style.backgroundImage = `url(${userData.foto_perfil})`;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                });
            }
        }
    }
});