<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Inicio";
$userRole = "Daniel Ruiz";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/homeuser.css">
</head>
<body>

    <div class="pantalla" id="homeUsuario">

        <!-- CABECERA: (Idéntica a la de empresa) -->
        <?php include '../../components/header.php'; ?>

        <!-- CONTENIDO PRINCIPAL -->
        <main class="pantalla-content homeuser-layout">

            <!-- SIDEBAR IZQUIERDO: Buscador y lista -->
            <aside class="homeuser-sidebar">
                <input type="text" id="busqueda" class="search-input" placeholder="Buscar vacante...">
                
                <select id="filtro" class="filter-select">
                    <option value="">Filtrar por modalidad</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Presencial">Presencial</option>
                </select>

                <!-- CAMBIO: Nuevo filtro de Carrera -->
                <select id="filtro-carrera" class="filter-select">
                    <option value="">Filtrar por carrera</option>
                    <option value="Ingenieria de software">Ingeniería de software</option>
                    <option value="Ingenieria en computacion">Ingeniería en computación</option>
                    <option value="Ingenieria en telecomunicaciones y redes">Ingeniería en telecomunicaciones y redes</option>
                    <option value="Ingenieria en ciencia y analitica de datos">Ingeniería en ciencia y analítica de datos</option>
                    <option value="Ingenieria en tecnologias de informacion y ciberseguridad">Ingeniería en tecnologías de información y ciberseguridad</option>
                    <option value="Licenciatura en administracion de TI">Licenciatura en administración de TI</option>
                </select>

                <div class="ofertas mt-3">
                    <!-- CAMBIO: Añadido 'data-carrera' -->
                    <div class="oferta"
                        data-titulo="Becario Software" data-empresa="Empresa Ficticia" data-modalidad="Híbrido"
                        data-salario="$10,000" data-color="#336699"
                        data-carrera="Ingenieria de software"
                        data-descripcion="Apoya en desarrollo de software, resolución de incidencias y documentación técnica.">
                        <div class="oferta-header">
                            <h3>Becario Software</h3>
                            <span class="precio">$10,000</span>
                        </div>
                        <p class="oferta-sub">Empresa Ficticia</p>
                        <p class="oferta-sub">Híbrido</p>
                    </div>

                    <!-- CAMBIO: Añadido 'data-carrera' -->
                    <div class="oferta"
                        data-titulo="Analista de Datos Jr." data-empresa="DataSoluciones" data-modalidad="Remoto"
                        data-salario="$12,500" data-color="#1E3A5F"
                        data-carrera="Ingenieria en ciencia y analitica de datos"
                        data-descripcion="Buscamos un Analista de Datos Jr. con conocimientos básicos en SQL y Python.">
                        <div class="oferta-header">
                            <h3>Analista de Datos Jr.</h3>
                            <span class="precio">$12,500</span>
                        </div>
                        <p class="oferta-sub">DataSoluciones</p>
                        <p class="oferta-sub">Remoto</p>
                    </div>

                    <!-- CAMBIO: Añadido 'data-carrera' -->
                    <div class="oferta"
                        data-titulo="Admin de Redes" data-empresa="CyberCorp" data-modalidad="Presencial"
                        data-salario="$15,000" data-color="#1E3A5F"
                        data-carrera="Ingenieria en telecomunicaciones y redes"
                        data-descripcion="Mantenimiento de infraestructura de red y seguridad.">
                        <div class="oferta-header">
                            <h3>Admin de Redes</h3>
                            <span class="precio">$15,000</span>
                        </div>
                        <p class="oferta-sub">CyberCorp</p>
                        <p class="oferta-sub">Presencial</p>
                    </div>
                </div>
            </aside>

            <!-- DETALLE DERECHA: Contenido dinámico -->
            <section class="homeuser-detail">

                <!-- Vista inicial (Se mantiene el ID) -->
                <div id="detalle-inicio" class="detalle-inicio">
                    <h2>Selecciona una oferta<br>para ver todos los detalles</h2>
                    <img src="../../assets/icons/logo.png" alt="Logo" style="width: 100px; opacity: 0.5; margin-top: 2rem;">
                </div>

                <!-- Vista detalle (Se mantiene el ID) -->
                <div id="detalle-completo" class="detalle-completo">
                    <div class="detalle-header">
                        <div>
                            <h2 id="detalle-titulo"></h2>
                            <p id="detalle-empresa"></p>
                            <p id="detalle-modalidad"></p>
                            <p id="detalle-salario"></p>
                        </div>
                        <div class="detalle-logo"></div>
                    </div>
                    <div class="detalle-descripcion-wrapper">
                        <h4>Descripción del Puesto</h4>
                        <p id="detalle-descripcion"></p>
                    </div>
                    <button id="btn-aplicar" class="btn">Aplicar</button>
                </div>

                <!-- Pantalla de éxito (Se mantiene el ID) -->
                <div id="detalle-exito" class="detalle-exito">
                    <!-- Misma animación de checkmark que empresa.html -->
                    <div class="checkmark">
                        <div class="circle"></div>
                        <div class="tick">✔</div>
                    </div>
                    <h2>¡Postulación exitosa!</h2>
                    <p>Tu solicitud ha sido enviada correctamente.</p>
                    <button id="btn-volver" class="btn btn-secondary">Volver al inicio</button>
                </div>

            </section>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/homeuser.js"></script>
</body>
</html>