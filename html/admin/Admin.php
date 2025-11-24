<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Panel de Administración";
$userRole = "Administrador<br>Universidad";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administrador</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/globalAdmin.css">
    <link rel="stylesheet" href="../../assets/css/admin.css">
</head>
<body>

    <div class="pantalla" id="adminDashboard">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content dashboard-content">

            <div class="sidebar-izquierdo">
                <div class="empresa-logo-grande">
                    <img src="../../assets/icons/logoFacultad.png" alt="facultad de informatica">
                </div>
                <div class="empresa-nombre-dashboard">
                    <span>Facultad de Informática</span>
                </div>
                <div class="empresa-descripcion-dashboard admin-contact-info">
                    <ul>
                        <li><strong>Encargado:</strong> Dr. Nombre Apellido</li>
                        <li><strong>Email:</strong> contacto.fi@universidad.mx</li>
                        <li><strong>Teléfono:</strong> (123) 456-7890 Ext. 123</li>
                        <li><strong>Ubicación:</strong> Cubículo A-101</li>
                    </ul>
                </div>
            </div>

            <div class="contenido-derecho">
                <div class="page-title-bar" style="border: none; margin-bottom: 0;">
                    <h2>Panel de Administración</h2>
                </div>

                <div class="admin-dashboard-grid">
                    <a href="crearEmpresa.php" class="btn btn-secondary" id="btn-admin-crear-empresa">
                        <img src="https://api.iconify.design/mdi:domain-plus.svg?color=white" class="btn-icon">
                        Crear Empresa
                    </a>
                    <a href="../shared/crearVacanteAdmin.php" class="btn btn-secondary" id="btn-admin-crear-vacante">
                        <img src="../../assets/icons/plus.svg" class="btn-icon">
                        Crear Vacante Global
                    </a>

                    <a href="alumnosAdmin.php" class="btn btn-secondary" id="btn-admin-alumnos">
                        <img src="https://api.iconify.design/mdi:school-outline.svg?color=white" class="btn-icon">
                        Gestionar Alumnos
                    </a>
                    <a href="empresasAdmin.php" class="btn btn-secondary" id="btn-admin-empresas">
                        <img src="https://api.iconify.design/mdi:domain.svg?color=white" class="btn-icon">
                        Gestionar Empresas
                    </a>
                    <a href="estadisticaAdmin.php" class="btn btn-secondary" id="btn-admin-stats">
                        <img src="https://api.iconify.design/mdi:chart-bar.svg?color=white" class="btn-icon">
                        Estadísticas
                    </a>
                    <a href="adminConfiguracion.php" class="btn btn-secondary" id="btn-admin-config">
                        <img src="https://api.iconify.design/mdi:cog-outline.svg?color=white" class="btn-icon">
                        Configuración de Cuenta
                    </a>
                </div>
            </div>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/admin.js"></script>
</body>
</html>
