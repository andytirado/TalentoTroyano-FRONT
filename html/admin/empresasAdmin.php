<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Gestionar Empresas";
$userRole = "Administrador<br>Universidad";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Empresas - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/globalAdmin.css">
    <link rel="stylesheet" href="../../assets/css/empresasAdmin.css">
</head>
<body>

    <div class="pantalla" id="adminPantallaEmpresas">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content">
            <div class="page-title-bar">
                <h2>Lista de Empresas</h2>
                <div class="filtros-busqueda">
                    <input type="text" id="filtro-empresa" placeholder="Buscar por Nombre o RFC..." class="input-filtros">
                    
                    <button class="btn-filtro" style="background:transparent; border:none; cursor:pointer;">
                        <img src="../../assets/icons/filter.svg" alt="Filtrar" style="width:24px; opacity:0.7;">
                    </button>
                </div>
            </div>
            <div class="user-list" id="empresa-list-container">
                
                <div class="admin-user-card status-active-bar">
                    <div class="user-info">
                        <div class="user-avatar" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=EF')"></div>
                        <div class="user-text">
                            <h4>Empresa Ficticia S.A.</h4>
                            <p>RFC: ABC123456XYZ</p>
                            <span>Reclutador: Juan Pérez</span>
                        </div>
                    </div>
                    <div class="user-status status-active">Activa</div>
                    <div class="user-actions">
                        <button class="btn-user-action" title="Ver Perfil"><img src="https://api.iconify.design/mdi:eye-outline.svg?color=white"></button>
                        <button class="btn-user-action" title="Dar de Baja"><img src="https://api.iconify.design/mdi:domain-off.svg?color=#f87171"></button>
                    </div>
                </div>

                <div class="admin-user-card status-inactive-bar">
                    <div class="user-info">
                        <div class="user-avatar" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=TS')"></div>
                        <div class="user-text">
                            <h4>Tech Solutions</h4>
                            <p>RFC: ZYX987654CBA</p>
                            <span>Reclutador: María López</span>
                        </div>
                    </div>
                    <div class="user-status status-inactive">Inactiva</div>
                    <div class="user-actions">
                        <button class="btn-user-action" title="Ver Perfil"><img src="https://api.iconify.design/mdi:eye-outline.svg?color=white"></button>
                        <button class="btn-user-action" title="Reactivar"><img src="https://api.iconify.design/mdi:domain-plus.svg?color=#4ade80"></button>
                    </div>
                </div>

            </div>
        </main>
        <footer class="pantalla-footer">
            <a href="admin.php" class="btn btn-secondary">Regresar al Dashboard</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/empresasAdmin.js"></script>
</body>
</html>