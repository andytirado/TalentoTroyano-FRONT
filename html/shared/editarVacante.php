<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Editar Vacante";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Vacante - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../assets/css/core/global.css">
    <link rel="stylesheet" href="../assets/css/core/globalAdmin.css">
    <link rel="stylesheet" href="../assets/css/pages/empresa/editarVacante.css">
</head>
<body>

    <div class="pantalla" id="pantallaEditarVacante">

        <?php include '../components/header.php'; ?>

        <main class="pantalla-content form-content">
            
            <form id="formEditarVacante">
                
                <div class="form-grid-2col">
                    <div class="form-col">
                        <div class="btn btn-secondary form-section-title">Información General</div>
                        
                        <div class="form-grupo">
                            <label>Título del Puesto</label>
                            <input type="text" id="edit-titulo" value="Desarrollador Front-End Jr.">
                        </div>
                        
                        <div class="form-grupo">
                            <label>Modalidad</label>
                            <input type="text" id="edit-modalidad" value="Híbrido">
                        </div>

                        <div class="form-grupo">
                            <label>Horario</label>
                            <input type="text" id="edit-horario" value="Lunes a Viernes, 9am - 6pm">
                        </div>
                    </div>

                    <div class="form-col">
                        <div class="btn btn-secondary form-section-title">Detalles de Contratación</div>
                        
                        <div class="form-grupo">
                            <label>Tipo de Contratación</label>
                            <input type="text" id="edit-contratacion" value="Tiempo Completo">
                        </div>

                        <div class="form-grupo">
                            <label>Ubicación</label>
                            <input type="text" id="edit-ubicacion" value="Querétaro, Qro.">
                        </div>

                        <div class="form-grupo">
                            <label>Salario Mensual</label>
                            <input type="text" id="edit-salario" value="$12,000 - $15,000 MXN">
                        </div>
                    </div>
                </div>

                <div class="form-full-width">
                    <div class="form-grupo">
                        <div class="btn btn-secondary form-section-title">Descripción del Puesto</div>
                        <textarea id="edit-descripcion" rows="5">Buscamos un desarrollador apasionado por crear interfaces de usuario dinámicas y responsivas. Trabajarás de la mano con el equipo de diseño.</textarea>
                    </div>

                    <div class="form-grupo">
                        <div class="btn btn-secondary form-section-title">Requisitos</div>
                        <textarea id="edit-requisitos" rows="5">- Experiencia con HTML, CSS y JavaScript.
- Conocimiento de React o Vue.js.
- Manejo de Git.
- Inglés intermedio.</textarea>
                    </div>
                </div>

                <div class="estado-section">
                    <label for="edit-estado">Estado de la vacante:</label>
                    <select id="edit-estado" class="input-select">
                        <option value="activa" selected>🟢 Activa</option>
                        <option value="pausada">🟡 Pausada</option>
                        <option value="cerrada">🔴 Cerrada/Finalizada</option>
                    </select>
                </div>

            </form>

        </main>
        
        <footer class="pantalla-footer split">
            <a href="vacantesActivas.php" class="btn btn-secondary">Cancelar</a>
            <button class="btn" id="btnGuardarCambios">Guardar Cambios</button>
        </footer>
    </div>

    <div class="pantalla" id="success" style="display: none;">
        <main class="pantalla-content success-content">
            <div class="checkmark">
                <div class="circle"></div>
                <div class="tick">✔</div>
            </div>
            <h2>Cambios guardados correctamente</h2>
            <button class="btn" id="btnVolverLista">Volver a mis vacantes</button>
        </main>
    </div>
    
    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/editarVacante.js"></script>
</body>
</html>