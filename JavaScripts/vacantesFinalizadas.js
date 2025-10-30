/**
 * app.js
 *
 * Script principal para la inicialización de la página.
 * - Espera a que el DOM esté cargado.
 * - Inicializa los iconos de Lucide.
 * - Muestra el contenido del body (que estaba oculto por CSS).
 */
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Verifica si la biblioteca Lucide está disponible
    if (typeof lucide !== 'undefined') {
        // Renderiza todos los iconos con el atributo 'data-lucide'
        lucide.createIcons();
    } else {
        console.warn("Lucide icons library not found.");
    }
    
    // 2. Muestra el body.
    // Esto previene un "flash" de contenido sin estilo
    // o de iconos sin renderizar.
    document.body.style.display = 'block';

});