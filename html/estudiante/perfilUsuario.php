<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Mi Perfil";
$userRole = "Ana Torres<br>Ing. de Software";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Perfil - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/perfilUsuario.css">
</head>
<body>

    <div class="pantalla" id="perfilDashboard">
        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content form-configuracion">
            
            <div class="form-seccion">
                <div class="form-grupo profile-pic-uploader">
                    <div class="uploader-content">
                        <div class="current-avatar" id="perfil-foto"></div>
                        <div class="uploader-actions perfil-info">
                            <h4 id="perfil-nombre">Cargando...</h4>
                            <p id="perfil-descripcion">
                                Cargando descripción...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-seccion">
                <div class="seccion-header-accion">
                    <h3 class="seccion-titulo">Mis Datos Personales</h3>
                    <a href="perfilUsuarioEditar.php" class="btn btn-secondary">Editar Datos</a>
                </div>
                <div class="vista-datos-grid">
                    <div class="vista-dato">
                        <label>Nombre Completo</label>
                        <span id="dato-nombre-completo">Cargando...</span>
                    </div>
                    <div class="vista-dato">
                        <label>Email</label>
                        <span id="dato-email">Cargando...</span>
                    </div>
                    <div class="vista-dato">
                        <label>Teléfono</label>
                        <span id="dato-telefono">Cargando...</span>
                    </div>
                    <div class="vista-dato">
                        <label>Matrícula</label>
                        <span id="dato-matricula">Cargando...</span>
                    </div>
                    <div class="vista-dato">
                        <label>Fecha de Nacimiento</label>
                        <span id="dato-fecha-nacimiento">Cargando...</span>
                    </div>
                </div>
            </div>

            <div class="form-seccion">
                <h3 class="seccion-titulo">Mis Documentos</h3>
                <div class="documento-lista" id="lista-documentos">
                    <!-- Los documentos se cargarán dinámicamente desde la BD -->
                    <p id="mensaje-sin-documentos" style="color: #666; font-style: italic;">Cargando documentos...</p>
                </div>
            </div>

            <div class="admin-dashboard-grid">
                <a href="misPostulaciones.php" class="btn btn-secondary" id="btn-ver-postulaciones">
                    <img src="https://api.iconify.design/mdi:briefcase-eye-outline.svg?color=white" class="btn-icon">
                    Ver mis Postulaciones
                </a>
            </div>

        </main>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/perfilUsuario.js"></script>
</body>
</html>