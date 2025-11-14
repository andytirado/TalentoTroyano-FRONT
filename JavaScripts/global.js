/* === global.js === */
/* Lógica para el dropdown de perfil */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Encontrar el gatillo (el avatar) y el menú
    const trigger = document.getElementById("profile-avatar-trigger");
    const menu = document.getElementById("profile-menu");

    // 2. Si ambos existen en la página...
    if (trigger && menu) {
        
        // 3. ...añadir un "escuchador" de clic al gatillo
        trigger.addEventListener("click", (event) => {
            // Detener el clic para que no lo detecte el 'window'
            event.stopPropagation(); 
            // Mostrar u ocultar el menú
            menu.classList.toggle("show");
        });

        // 4. Añadir un "escuchador" al resto de la página
        //    (para cerrar el menú si haces clic *fuera* de él)
        window.addEventListener("click", () => {
            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
            }
        });
    }
});