<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Estadísticas";
$userRole = "Administrador<br>Universidad";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/globalAdmin.css">
    <link rel="stylesheet" href="../../assets/css/estadisticaAdmin.css">
</head>
<body>

    <div class="pantalla" id="adminPantallaEstadisticas">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content">
            <div class="kpi-grid">
                <div class="kpi-card">
                    <img src="https://api.iconify.design/mdi:domain.svg?color=white" class="kpi-icon">
                    <span class="kpi-value">15</span>
                    <span class="kpi-label">Empresas Totales</span>
                </div>
                <div class="kpi-card">
                    <img src="https://api.iconify.design/mdi:account-school-outline.svg?color=white" class="kpi-icon">
                    <span class="kpi-value">230</span>
                    <span class="kpi-label">Alumnos Totales</span>
                </div>
                <div class="kpi-card">
                    <img src="https://api.iconify.design/mdi:briefcase-outline.svg?color=white" class="kpi-icon">
                    <span class="kpi-value">42</span>
                    <span class="kpi-label">Vacantes Totales</span>
                </div>
                <div class="kpi-card">
                    <img src="https://api.iconify.design/mdi:account-check-outline.svg?color=#4ade80" class="kpi-icon">
                    <span class="kpi-value">68</span>
                    <span class="kpi-label">Alumnos Aceptados</span>
                </div>
                <div class="kpi-card">
                    <img src="https://api.iconify.design/mdi:account-remove-outline.svg?color=#f87171" class="kpi-icon">
                    <span class="kpi-value">112</span>
                    <span class="kpi-label">Alumnos Rechazados</span>
                </div>
            </div>
            <!-- Aquí puedes añadir más gráficos -->
        </main>
        <footer class="pantalla-footer">
            <!-- El botón Regresar ahora es un enlace <a> -->
            <a href="admin.php" class="btn btn-secondary">Regresar al Dashboard</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/estadisticaAdmin.js"></script>
</body>
</html>