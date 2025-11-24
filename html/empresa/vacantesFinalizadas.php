<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Vacantes Finalizadas";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vacantes Finalizadas - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/vacantesFinalizadas.css">
</head>
<body>

    <div class="pantalla" id="vacantesFinalizadas">
        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            <div class="page-title-bar">
                <h2>Vacantes Finalizadas</h2>
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar vacante por título...">
                    <img src="../../assets/icons/search.svg" class="search-icon">
                </div>
            </div>

            <div class="lista-vacantes">
                
                <div class="vacante-card status-contratada">
                    <div class="vacante-info">
                        <h4>Desarrollador Front-End (React)</h4>
                        <p>Finalizada: 28/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>25</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-resultado">
                        <img src="../../assets/icons/postulacion-on.svg" class="icon-resultado">
                        <div>
                            <span>Contratado</span>
                            <strong>Ana Torres</strong>
                        </div>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Detalles"><img src="../../assets/icons/observar.svg"></button>
                        </div>
                </div>

                <div class="vacante-card status-cancelada">
                    <div class="vacante-info">
                        <h4>Diseñador UX/UI Senior</h4>
                        <p>Cancelada: 25/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>8</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-resultado">
                        <img src="../../assets/icons/cancelada.svg" class="icon-resultado">
                        <div>
                            <span>Estado</span>
                            <strong>Cancelada</strong>
                        </div>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Detalles"><img src="../../assets/icons/observar.svg"></button>
                        </div>
                </div>
                
                <div class="vacante-card status-contratada">
                    <div class="vacante-info">
                        <h4>Back-End Developer (Node.js)</h4>
                        <p>Finalizada: 22/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>42</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-resultado">
                        <img src="../../assets/icons/postulacion-on.svg" class="icon-resultado">
                        <div>
                            <span>Contratado</span>
                            <strong>Carlos Mendoza</strong>
                        </div>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Detalles"><img src="../../assets/icons/observar.svg"></button>
                        </div>
                </div>

            </div>
        </main>
        
        <footer class="pantalla-footer">
            <a href="empresa.php" class="btn btn-secondary">Regresar al Dashboard</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/vacantesFinalizadas.js"></script>
</body>
</html>