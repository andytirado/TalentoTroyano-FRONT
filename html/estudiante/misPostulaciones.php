<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Mis Postulaciones";
$userRole = "Ana Torres<br>Ing. de Software";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Postulaciones - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/misPostulaciones.css">
</head>
<body>

    <div class="pantalla" id="pantallaMisPostulaciones">

        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            
            <div class="page-title-bar">
                <div class="filtros-busqueda">
                    <input type="text" placeholder="Buscar postulación por puesto o empresa..." class="input-filtros">
                    <button class="btn-filtro" style="background:transparent; border:none; cursor:pointer; padding:0.5rem;">
                        <img src="../../assets/icons/filter.svg" alt="Buscar" style="width:20px; opacity:0.7;">
                    </button>
                </div>
            </div>

            <div class="postulacion-lista">
                
                <div class="postulacion-card status-accepted-bar">
                    <div class="job-info">
                        <div class="job-avatar" style="background-color: #336699;"></div>
                        <div class="job-text">
                            <h4>Becario de Desarrollo</h4>
                            <p>Facultad de Informática</p>
                            <span>Postulado: 10 Nov 2025</span>
                        </div>
                    </div>
                    <div class="job-status status-accepted">
                        <span>✔</span> Aceptado
                    </div>
                    <div class="job-actions">
                        <a href="#" class="btn btn-secondary btn-accion-card">Ver Detalles</a>
                        <button class="btn-user-action" title="Retirar postulación">✕</button>
                    </div>
                </div>
            
                <div class="postulacion-card status-viewed-bar">
                    <div class="job-info">
                        <div class="job-avatar" style="background-color: #888;"></div>
                        <div class="job-text">
                            <h4>Analista de Datos Jr.</h4>
                            <p>Innovatech Solutions</p>
                            <span>Postulado: 05 Nov 2025</span>
                        </div>
                    </div>
                    <div class="job-status status-viewed">
                        <span>👁</span> CV Visto
                    </div>
                    <div class="job-actions">
                        <a href="#" class="btn btn-secondary btn-accion-card">Ver Detalles</a>
                        <button class="btn-user-action" title="Retirar postulación">✕</button>
                    </div>
                </div>
            
                <div class="postulacion-card status-pending-bar">
                    <div class="job-info">
                        <div class="job-avatar" style="background-color: #cca;"></div>
                        <div class="job-text">
                            <h4>Desarrollador Front-End Jr.</h4>
                            <p>Empresa Ficticia S.A.</p>
                            <span>Postulado: 02 Nov 2025</span>
                        </div>
                    </div>
                    <div class="job-status status-pending">
                        <span>🕒</span> Pendiente
                    </div>
                    <div class="job-actions">
                        <a href="#" class="btn btn-secondary btn-accion-card">Ver Detalles</a>
                        <button class="btn-user-action" title="Retirar postulación">✕</button>
                    </div>
                </div>
            
                <div class="postulacion-card status-rejected-bar">
                    <div class="job-info">
                        <div class="job-avatar" style="background-color: #d65a5a;"></div>
                        <div class="job-text">
                            <h4>Soporte Técnico N1</h4>
                            <p>Soporte Total</p>
                            <span>Postulado: 01 Nov 2025</span>
                        </div>
                    </div>
                    <div class="job-status status-rejected">
                        <span>✕</span> No Seleccionado
                    </div>
                    <div class="job-actions">
                        <a href="#" class="btn btn-secondary btn-accion-card">Ver Detalles</a>
                        <button class="btn-user-action" title="Eliminar del historial">✕</button>
                    </div>
                </div>
            
            </div>
        </main>
        
        <footer class="pantalla-footer">
            <a href="perfilUsuario.php" class="btn btn-secondary">Regresar al Perfil</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/misPostulaciones.js"></script>
</body>
</html>