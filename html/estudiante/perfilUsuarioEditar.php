<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Editar Mi Perfil";
$userRole = "Ana Torres<br>Ing. de Software";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/perfilUsuarioEditar.css">
</head>
<body>

    <div class="pantalla" id="pantallaEditarPerfil">
        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content form-configuracion">
            
            <div class="form-seccion">
                <h3 class="seccion-titulo">Mis Datos</h3>

                <div class="form-grupo profile-pic-uploader">
                    <label>Foto de Perfil</label>
                    <div class="uploader-content">
                        
                        <div class="current-avatar" id="avatar-preview" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=AT')"></div>
                        
                        <div class="uploader-actions">
                            <p>Sube tu foto de perfil. (Recomendado: 100x100px)</p>
                            <button class="btn btn-secondary" onclick="document.getElementById('avatar-upload-input').click();">Cambiar Foto</button>
                            <input type="file" id="avatar-upload-input" accept="image/png, image/jpeg" style="display: none;">
                        </div>
                    </div>
                </div>
                
                <div class="form-grupo profile-pic-uploader">
                   </div>

                <div class="form-grupo">
                    <label for="alumno-descripcion">Acerca de mí (Descripción breve)</label>
                    <textarea id="alumno-descripcion" rows="5" placeholder="Escribe una breve descripción sobre ti, tus intereses profesionales, etc. Esto será visible en tu perfil.">Estudiante de 8vo semestre apasionada por el desarrollo web front-end. Busco mi primera oportunidad para aplicar mis conocimientos en React y Vue.js. Me considero proactiva, autodidacta y lista para nuevos retos.</textarea>
                </div>
                <div class="input-grid-col-2">
                    <div class="form-grupo">
                        <label for="alumno-nombre">Nombre(s)</label>
                        <input type="text" id="alumno-nombre" value="Ana">
                    </div>
                     <div class="form-grupo">
                        <label for="alumno-apellidos">Apellidos</label>
                        <input type="text" id="alumno-apellidos" value="Torres Gutierrez">
                    </div>
                </div>
                 <div class="form-grupo">
                    <label for="alumno-telefono">Teléfono</label>
                    <input type="text" id="alumno-telefono" value="(664) 123-4567">
                </div>
            </div>

            </main>
        
        <footer class="pantalla-footer split">
            <a href="perfilUsuario.php" class="btn btn-secondary">Cancelar</a>
            <button class="btn" id="btn-guardar-perfil">Guardar Cambios</button>
        </footer>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/perfilUsuarioEditar.js"></script>
</body>
</html>