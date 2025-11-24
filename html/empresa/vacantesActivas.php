<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Vacantes Activas";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vacantes Activas - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/vacantesActivas.css">
</head>
<body>

    <div class="pantalla" id="vacantesActivas">
        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            <div class="page-title-bar">
                <h2>Vacantes Activas</h2>
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar vacante por título...">
                    <img src="../../assets/icons/search.svg" class="search-icon">
                </div>
            </div>

            <div class="lista-vacantes">
                
                <div class="vacante-card">
                    <div class="vacante-info">
                        <h4>Desarrollador Front-End (React)</h4>
                        <p>Tiempo Completo | Remoto | Publicada: 28/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>25</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Postulantes"><img src="../../assets/icons/observar.svg"></button>
                        <button class="btn-accion-vacante" title="Editar Vacante"><img src="../../assets/icons/editar.svg"></button>
                        <button class="btn-accion-vacante" title="Finalizar Vacante"><img src="../../assets/icons/finalizar.svg"></button>
                    </div>
                </div>

                <div class="vacante-card">
                    <div class="vacante-info">
                        <h4>Diseñador UX/UI Senior</h4>
                        <p>Medio Tiempo | Híbrido | Publicada: 25/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>8</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Postulantes"><img src="../../assets/icons/observar.svg"></button>
                        <button class="btn-accion-vacante" title="Editar Vacante"><img src="../../assets/icons/editar.svg"></button>
                        <button class="btn-accion-vacante" title="Finalizar Vacante"><img src="../../assets/icons/finalizar.svg"></button>
                    </div>
                </div>
                
                 <div class="vacante-card">
                    <div class="vacante-info">
                        <h4>Back-End Developer (Node.js)</h4>
                        <p>Tiempo Completo | Presencial | Publicada: 22/10/2025</p>
                    </div>
                    <div class="vacante-stats">
                        <strong>42</strong>
                        <span>Postulantes</span>
                    </div>
                    <div class="vacante-acciones">
                        <button class="btn-accion-vacante" title="Ver Postulantes"><img src="../../assets/icons/observar.svg"></button>
                        <button class="btn-accion-vacante" title="Editar Vacante"><img src="../../assets/icons/editar.svg"></button>
                        <button class="btn-accion-vacante" title="Finalizar Vacante"><img src="../../assets/icons/finalizar.svg"></button>
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
<script src="../../assets/js/vacantesActivas.js"></script>
</body>
</html>