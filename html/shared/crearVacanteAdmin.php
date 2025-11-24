<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Crear Vacante Global (Paso 1/3)";
$userRole = "Administrador<br>Universidad";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Vacante Global - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/core/global.css">
    <link rel="stylesheet" href="../assets/css/core/globalAdmin.css">
    <link rel="stylesheet" href="../assets/css/pages/admin/crearVacanteAdmin.css">
</head>
<body>

    <!-- ============================================================ -->
    <!-- Pantalla 1: Detalles del Puesto                            -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso1">
        <?php include '../components/header.php'; ?>
        <main class="pantalla-content form-content">
            <form class="form-paso1" onsubmit="return false;"> 
                <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Detalles</div>
                    <input type="text" id="titulo" placeholder="Título de la Vacante" required>
                    <!-- CAMBIO: Campo para que el Admin asigne una empresa (opcional) -->
                    <input type="text" id="empresa-asignada" placeholder="Empresa (Opcional, ej. 'Facultad de Informática')">
                    <input type="text" id="contratacion" placeholder="Contratación (Ej. 'Medio Tiempo')" required>
                    <input type="text" id="horario" placeholder="Horario (Ej. 'L-V 9am-2pm')" required>
                </div>
                <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Sobre el empleo</div>
                    <input type="text" id="modalidad" placeholder="Modalidad (Ej. 'Remoto')" required>
                    <input type="text" id="ubicacion" placeholder="Ubicación (Ej. 'Edificio A, CU')" required>
                    <input type="text" id="salario" placeholder="Salario (Ej. '$8,000 MXN')" required>
                    <input type="text" id="carreras" placeholder="Carreras Requeridas (Ej. 'Software, TI')">
                </div>
            </form>
        </main>
        <footer class="pantalla-footer split">
            <!-- El botón de regresar es un enlace al dashboard -->
            <a href="admin.php" class="btn btn-secondary">Regresar</a>
            <button class="btn" id="btnSiguiente1">Siguiente</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Pantalla 2: Descripción (Oculta)                           -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso2" style="display: none;">
        <header class="pantalla-header">
            <div class="logo-titulo">
                <img src="../../assets/icons/logo.png" alt="Logo" class="logo-icon-header">
                <h2><span class="titulo1">Talento</span><span class="titulo2">Troyano</span></h2>
                <span class="breadcrumb">Crear Vacante Global (Paso 2/3)</span>
            </div>
            <div class="user-info">
                 <span><img src="../../assets/icons/notificacion.svg" alt="notificaciones"></span>
                <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>
                <div class="profile">
                    <span>Administrador<br>Universidad</span>
                    <div class="avatar"></div>
                </div>
            </div>
        </header>
        <main class="pantalla-content form-content form-paso2">
            <div class="form-col">
                <div class="btn btn-secondary form-section-title">Descripción</div>
                <textarea id="descripcion" placeholder="Escribe aquí los detalles del puesto..." required></textarea>
            </div>
            <div class="form-col">
                <div class="btn btn-secondary form-section-title">Requisitos</div>
                <textarea id="requisitos" placeholder="Escribe aquí los requisitos (ej. 'Inglés B2', 'Manejo de React', etc.)" required></textarea>
            </div>
        </main>
        <footer class="pantalla-footer split">
            <button class="btn btn-secondary" id="btnAnterior2">Anterior</button>
            <button class="btn" id="btnSiguiente2">Siguiente</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Pantalla 3: Resumen (Oculta)                               -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso3" style="display: none;">
        <header class="pantalla-header">
            <div class="logo-titulo">
                <img src="../../assets/icons/logo.png" alt="Logo" class="logo-icon-header">
                <h2><span class="titulo1">Talento</span><span class="titulo2">Troyano</span></h2>
                <span class="breadcrumb">Crear Vacante Global (Paso 3/3)</span>
            </div>
            <div class="user-info">
                 <span><img src="../../assets/icons/notificacion.svg" alt="notificaciones"></span>
                <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>
                <div class="profile">
                    <span>Administrador<br>Universidad</span>
                    <div class="avatar"></div>
                </div>
            </div>
        </header>
        <main class="pantalla-content form-content">
            <div class="btn btn-secondary form-section-title">Resumen</div>
            <!-- El contenido se genera por JS -->
            <div class="resumen-texto" id="resumenTexto">
            </div>
        </main>
        <footer class="pantalla-footer split">
            <button class="btn btn-secondary" id="btnRegresar3">Regresar</button>
            <button class="btn" id="btnPublicar">Publicar vacante</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Pantalla 4: Éxito (Oculta)                                 -->
    <!-- ============================================================ -->
    <div class="pantalla" id="success" style="display: none;">
        <main class="pantalla-content success-content">
            <div class="checkmark">
                <div class="circle"></div>
                <div class="tick">✔</div>
            </div>
            <h2>Vacante publicada con éxito</h2>
            <button class="btn" id="volverInicio">Volver al Dashboard</button>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
<script src="../../assets/js/config.js"></script>
<script src="../../assets/js/auth.js"></script>
<script src="../../assets/js/api.js"></script>
<script src="../../assets/js/global.js"></script>

<!-- Script específico de la página -->
<script src="../../assets/js/crearVacanteAdmin.js"></script>
</body>
</html>