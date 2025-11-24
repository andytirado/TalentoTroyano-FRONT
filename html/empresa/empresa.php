<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Inicio";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administrador</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/empresa.css">
</head>
<body>

    <!-- ============================================================ -->
    <!-- Dashboard (Pantalla 1)                                     -->
    <!-- ============================================================ -->
    <div class="pantalla" id="dashboard">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content dashboard-content">
            <div class="sidebar-izquierdo">
                <div class="empresa-logo-grande">
                    </div>
                <div class="empresa-nombre-dashboard">
                    <span>nombre empresa</span>
                </div>
                <div class="empresa-descripcion-dashboard">
                    <p>Descripción detallada de la empresa o sección para información adicional.</p>
                </div>
            </div>
            <div class="contenido-derecho">
                <div class="filtros-busqueda">
                    <input type="text" placeholder="Agrega filtros a tu búsqueda" class="input-filtros">
                    <button class="btn-filtro"><img src="../../assets/icons/filter.svg" alt="Filtro"></button>
                    <button class="btn-add-vacante" id="btnNuevaVacanteDesdeDashboard">
                        <img src="../../assets/icons/plus.svg" alt="Agregar Vacante">
                    </button>
                </div>
                <div class="dashboard-grid">
                    <a href="vacantesActivas.php" class="btn btn-secondary">Vacantes Activas</a>
                    <a href="vacantesFinalizadas.php" class="btn btn-secondary">Vacantes finalizadas</a>
                    <a href="../shared/postulantes.php" class="btn btn-secondary">Postulantes</a>
                    <a href="estadisticaEmpresa.php" class="btn btn-secondary">Estadísticas</a>
                </div>
            </div>
        </main>
    </div>

    <!-- ============================================================ -->
    <!-- Nueva Vacante - Paso 1                                     -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso1" style="display: none;">
        <header class="pantalla-header">
            <div class="logo-titulo">
                <!-- CAMBIO 2: Aplicar la estructura de spans -->
                <h2>
                    <span class="titulo1">Talento</span>
                    <span class="titulo2">Troyano</span>
                </h2>
                <span class="breadcrumb">Nueva vacante</span>
            </div>
            <div class="user-info">
                <span><img src="../../assets/icons/notificacion.svg" alt="notificaciones"></span>
                <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>
                <div class="profile">
                    <span>Administrador<br>empresa</span>
                    <div class="avatar"></div>
                </div>
            </div>
        </header>
        <main class="pantalla-content form-content">
            <form class="form-paso1" onsubmit="return false;"> <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Detalles</div>
                    <input type="text" id="titulo" placeholder="Título">
                    <input type="text" id="contratacion" placeholder="Contratación">
                    <input type="text" id="horario" placeholder="Horario">
                    <input type="text" id="modalidad" placeholder="Modalidad">
                </div>
                <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Sobre el empleo</div>
                    <input type="text" id="correo" placeholder="Carrera"> <input type="text" id="ubicacion" placeholder="Ubicación">
                    <input type="text" id="salario" placeholder="Salario">
                </div>
            </form>
        </main>
        <footer class="pantalla-footer split">
            <button class="btn btn-secondary" id="btnCancelar1">Regresar</button>
            
            <button class="btn" id="btnSiguiente1">Siguiente</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Nueva Vacante - Paso 2                                     -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso2" style="display: none;">
        <header class="pantalla-header">
            <div class="logo-titulo">
                <!-- CAMBIO 2: Aplicar la estructura de spans -->
                <h2>
                    <span class="titulo1">Talento</span>
                    <span class="titulo2">Troyano</span>
                </h2>
                <span class="breadcrumb">Nueva vacante</span>
            </div>
            <div class="user-info">
                 <span><img src="../../assets/icons/notificacion.svg" alt="notificaciones"></span>
                <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>
                <div class="profile">
                    <span>Administrador<br>empresa</span>
                    <div class="avatar"></div>
                </div>
            </div>
        </header>
        <main class="pantalla-content form-content form-paso2">
            <div class="form-col">
                <div class="btn btn-secondary form-section-title">Descripción</div>
                <textarea id="descripcion" placeholder="Escribir"></textarea>
            </div>
            <div class="form-col">
                <div class="btn btn-secondary form-section-title">Requisitos</div>
                <textarea id="requisitos" placeholder="Escribir"></textarea>
            </div>
        </main>
        <footer class="pantalla-footer split">
            <button class="btn btn-secondary" id="btnAnterior2">Anterior</button>
            <button class="btn" id="btnSiguiente2">Siguiente</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Nueva Vacante - Paso 3                                     -->
    <!-- ============================================================ -->
    <div class="pantalla" id="nuevaVacantePaso3" style="display: none;">
        <header class="pantalla-header">
            <div class="logo-titulo">
                <!-- CAMBIO 2: Aplicar la estructura de spans -->
                <h2>
                    <span class="titulo1">Talento</span>
                    <span class="titulo2">Troyano</span>
                </h2>
                <span class="breadcrumb">Nueva vacante</span>
            </div>
            <div class="user-info">
                 <span><img src="../../assets/icons/notificacion.svg" alt="notificaciones"></span>
                <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>
                <div class="profile">
                    <span>Administrador<br>empresa</span>
                    <div class="avatar"></div>
                </div>
            </div>
        </header>
        <main class="pantalla-content form-content">
            <div class="btn btn-secondary form-section-title">Resumen</div>
            <div class="resumen-texto" id="resumenTexto">
            </div>
        </main>
        <footer class="pantalla-footer split">
            <button class="btn btn-secondary" id="btnRegresar3">Regresar</button>
            <button class="btn" id="btnPublicar">Publicar vacante</button>
        </footer>
    </div>

    <!-- ============================================================ -->
    <!-- Pantalla de Éxito                                          -->
    <!-- ============================================================ -->
    <div class="pantalla" id="success" style="display: none;">
        <main class="pantalla-content success-content">
            <div class="checkmark">
                <div class="circle"></div>
                <div class="tick">✔</div>
            </div>
            <h2>Vacante publicada con éxito</h2>
            <button class="btn" id="volverInicio">Volver al inicio</button>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/empresa.js"></script>
</body>
</html>
