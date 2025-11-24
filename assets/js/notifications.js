// assets/js/notifications.js

document.addEventListener('DOMContentLoaded', function() {
    const bellTrigger = document.getElementById('notification-bell-trigger');
    const notificationsPanel = document.getElementById('notifications-panel');
    
    // Elementos del menú de perfil (para poder cerrarlos)
    const profileTrigger = document.getElementById('profile-avatar-trigger');
    const profileMenu = document.getElementById('profile-menu');

    if (bellTrigger && notificationsPanel) {
        bellTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            // Ocultar el menú de perfil si está abierto
            if (profileMenu) profileMenu.classList.remove('show');
            // Mostrar/ocultar el panel de notificaciones
            notificationsPanel.classList.toggle('show');
        });

        // Evitar que el panel se cierre al hacer clic dentro de él
        notificationsPanel.addEventListener('click', e => e.stopPropagation());
    }

    // Cerrar el panel de notificaciones si se hace clic fuera
    window.addEventListener('click', function(e) {
        if (notificationsPanel && notificationsPanel.classList.contains('show')) {
            // Asegurarse de que el clic no fue en el ícono de la campana
            if (bellTrigger && !bellTrigger.contains(e.target)) {
                notificationsPanel.classList.remove('show');
            }
        }
    });
});

// ==================================================================
// FUNCIÓN GLOBAL PARA MOSTRAR NOTIFICACIONES EN EL PANEL
// Reemplaza el uso de alert() para una mejor experiencia de usuario.
// ==================================================================

/**
 * Muestra una notificación en el panel de notificaciones.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - El tipo de notificación ('info', 'success', 'error', 'warning'). Por defecto es 'info'.
 */
function showAppNotification(message, type = 'info') {
    const listContainer = document.getElementById('notification-list-container');
    const countBadge = document.getElementById('notification-count');
    const placeholder = listContainer.querySelector('.notification-placeholder');

    if (!listContainer || !countBadge) {
        console.error('Elementos del panel de notificaciones no encontrados. No se puede mostrar la notificación.');
        // Fallback a un alert si el componente no está en la página
        alert(`[${type.toUpperCase()}] ${message}`);
        return;
    }

    // 1. Ocultar el mensaje de "No tienes notificaciones" si está visible
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    // 2. Crear el nuevo elemento de notificación
    const notificationItem = document.createElement('div');
    notificationItem.className = `notification-item notification-item--${type}`;
    
    // Iconos según el tipo de notificación
    const icons = {
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        warning: '⚠️'
    };

    notificationItem.innerHTML = `
        <div class="notification-icon">${icons[type] || '🔔'}</div>
        <div class="notification-content">
            <p>${message}</p>
            <span class="notification-time">${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
    `;

    // 3. Añadir la nueva notificación al principio de la lista
    listContainer.prepend(notificationItem);

    // 4. Actualizar el contador de notificaciones
    let currentCount = parseInt(countBadge.textContent || '0', 10);
    currentCount++;
    countBadge.textContent = currentCount;
    countBadge.style.display = 'flex'; // Asegurarse de que el contador sea visible

    // Opcional: Hacer que la campana parpadee o se mueva para llamar la atención
    const bellIcon = document.getElementById('notification-bell-trigger');
    if (bellIcon) {
        bellIcon.classList.add('new-notification-animation');
        // Quitar la clase de animación después de que termine para poder reutilizarla
        setTimeout(() => bellIcon.classList.remove('new-notification-animation'), 600);
    }
}