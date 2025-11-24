<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Postulantes";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postulantes - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/verPostulantes.css">
</head>
<body>

    <div class="pantalla" id="pantallaPostulantes">

        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            
            <div class="page-title-bar">
                <h2 id="tituloVacante">Postulantes</h2> <div class="search-bar-container">
                    <input type="text" id="buscadorPostulantes" class="search-input" placeholder="Buscar por nombre o carrera...">
                    <img src="../../assets/icons/search.svg" class="search-icon">
                </div>
            </div>

            <div class="lista-postulantes" id="listaPostulantesContainer">
                <div class="loading-spinner">Cargando postulantes...</div>
            </div>

        </main>
        
        <footer class="pantalla-footer">
            <a href="vacantesActivas.php" class="btn btn-secondary">Regresar a Vacantes</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/verPostulantes.js"></script>
</body>
</html>