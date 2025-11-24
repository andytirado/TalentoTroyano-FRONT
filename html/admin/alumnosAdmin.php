<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Gestionar Alumnos";
$userRole = "Administrador<br>Universidad";


?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Alumnos - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/globalAdmin.css">
    <link rel="stylesheet" href="../../assets/css/alumnosAdmin.css">
</head>
<body>

    <div class="pantalla" id="adminPantallaAlumnos">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content">
            <div class="page-title-bar">
                <h2>Lista de Alumnos</h2>
                <div class="filtros-busqueda">
                    <input type="text" id="filtro-expediente" placeholder="Buscar por Expediente..." class="input-filtros">
                    <select id="filtro-carrera" class="input-filtros select-filtro">
                        <option value="">Todas las Carreras</option>
                        <option value="Ingenieria de software">Ingeniería de software</option>
                        <option value="Ingenieria en computacion">Ingeniería en computación</option>
                        <option value="Ingenieria en telecomunicaciones y redes">Ingeniería en telecomunicaciones y redes</option>
                        <option value="Ingenieria en ciencia y analitica de datos">Ingeniería en ciencia y analítica de datos</option>
                        <option value="Ingenieria en tecnologias de informacion y ciberseguridad">Ingeniería en tecnologías de información y ciberseguridad</option>
                        <option value="Licenciatura en administracion de TI">Licenciatura en administración de TI</option>
                    </select>
                </div>
            </div>
            <div class="user-list" id="user-list-container">
                
                <div class="admin-user-card status-active-bar" data-carrera="Ingenieria de software" data-expediente="123456">
                    <div class="user-info">
                        <div class="user-avatar" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=AT')"></div>
                        <div class="user-text">
                            <h4>Ana Torres</h4>
                            <p>Ing. de software</p>
                            <span>Expediente: 123456</span>
                        </div>
                    </div>
                    <div class="user-status status-active">Activo</div>
                    <div class="user-actions">
                        <button class="btn-user-action" title="Ver CV"><img src="https://api.iconify.design/mdi:file-document-outline.svg?color=white"></button>
                        <button class="btn-user-action" title="Dar de Baja"><img src="https://api.iconify.design/mdi:account-off-outline.svg?color=#f87171"></button>
                    </div>
                </div>
                
                <div class="admin-user-card status-inactive-bar" data-carrera="Ingenieria en computacion" data-expediente="654321">
                    <div class="user-info">
                        <div class="user-avatar" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=CM')"></div>
                        <div class="user-text">
                            <h4>Carlos Mendoza</h4>
                            <p>Ing. en computación</p>
                            <span>Expediente: 654321</span>
                        </div>
                    </div>
                    <div class="user-status status-inactive">Inactivo</div>
                    <div class="user-actions">
                        <button class="btn-user-action" title="Ver CV"><img src="https://api.iconify.design/mdi:file-document-outline.svg?color=white"></button>
                        <button class="btn-user-action" title="Reactivar"><img src="https://api.iconify.design/mdi:account-check-outline.svg?color=#4ade80"></button>
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
    <script src="../../assets/js/alumnosAdmin.js"></script>
</body>
</html>