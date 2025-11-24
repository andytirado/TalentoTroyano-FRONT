<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Detalles de Vacante";
$userRole = "Ana Torres<br>Ing. de Software";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles de Vacante - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/verDetallesVacante.css">
</head>
<body>

    <div class="pantalla" id="pantallaDetallesVacante">

        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            
            <div class="btn btn-secondary form-section-title">
                Detalles de Vacante
            </div>
            
            <div class="resumen-texto" id="detalles-vacante">
                
                <h3>Becario de Desarrollo</h3>
                <p><strong>Empresa:</strong> Facultad de Informática</p>

                <p>
                    <strong>Contratación:</strong> Medio Tiempo<br>
                    <strong>Horario:</strong> L-V 9am-2pm<br>
                    <strong>Modalidad:</strong> Remoto<br>
                    <strong>Ubicación:</strong> Edificio A, CU<br>
                    <strong>Salario:</strong> $8,000 MXN<br>
                    <strong>Carreras:</strong> Ing. de Software, Ing. en Computación
                </p>
                
                <p>
                    <strong>Descripción:</strong><br>
                    (Aquí va el texto completo de la descripción de la vacante, 
                    que puede ser un párrafo largo con todos los detalles sobre 
                    las responsabilidades del puesto, el equipo de trabajo y 
                    las metas esperadas.)
                </p>
                
                <p>
                    <strong>Requisitos:</strong><br>
                    (Aquí van los requisitos completos, que pueden ser una 
                    lista o un párrafo detallando lo que el alumno debe 
                    saber, como 'Inglés B2', 'Manejo de React', 'Conocimiento 
                    de bases de datos SQL', etc.)
                </p>

            </div>
        </main>

        <footer class="pantalla-footer">
            <a href="misPostulaciones.php" class="btn btn-secondary">Regresar</a>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/verDetallesVacante.js"></script>
</body>
</html>