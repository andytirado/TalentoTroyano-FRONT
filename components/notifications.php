<?php
// components/notifications.php
?>

<!-- 1. Enlace a la hoja de estilos específica del componente -->
<link rel="stylesheet" href="../../assets/css/notifications.css">

<!-- 2. Estructura HTML del componente de notificaciones -->
<div class="notification-container">
    <span id="notification-bell-trigger" style="cursor: pointer;">
        <img src="../../assets/icons/notificacion.svg" alt="notificaciones">
        <span class="notification-badge" id="notification-count" style="display: none;"></span>
    </span>

    <div class="dropdown-menu notifications-dropdown" id="notifications-panel">
        <div class="dropdown-header">
            <span>Notificaciones</span>
            <a href="#" id="mark-all-as-read">Marcar todas como leídas</a>
        </div>
        <div class="notification-list" id="notification-list-container">
            <div class="notification-placeholder">No tienes notificaciones nuevas.</div>
        </div>
    </div>
</div>

<!-- 3. Enlace al script JS que le da vida al componente -->
<script src="../../assets/js/notifications.js"></script>