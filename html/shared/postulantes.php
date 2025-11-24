<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Gestión de Postulantes";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postulantes - Talento Troyano</title>
    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/core/global.css">
    <link rel="stylesheet" href="../assets/css/pages/empresa/postulantes.css">
</head>
<body>

    <div class="pantalla" id="gestionPostulantes">
        <?php include '../components/header.php'; ?>

        <!-- 2. CONTENIDO PRINCIPAL (El lienzo blanco) -->
        <main class="pantalla-content">
            
            <!-- Título y Buscador (Mismo estilo de 'vacantesActivas') -->
            <div class="page-title-bar">
                <h2>Gestión de Postulantes</h2>
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar por nombre, vacante, palabra clave...">
                    <img src="../../assets/icons/search.svg" class="search-icon">
                </div>
            </div>

            <!-- Contenedor del Tablero Kanban -->
            <div class="kanban-board">

                <!-- Columna 1: Nuevos -->
                <div class="kanban-columna">
                    <div class="kanban-header">
                        <h3>Nuevos</h3>
                        <span class="contador-columna">3</span>
                    </div>
                    <div class="kanban-cards-list" id="col-nuevos">
                        
                        <div class="postulante-card" draggable="true">
                            <div class="card-info">
                                <div class="avatar-postulante"></div>
                                <div class="info-texto">
                                    <h4>Ana Torres</h4>
                                    <p>Para: Front-End (React)</p>
                                </div>
                            </div>
                            <div class="card-acciones">
                                <button class="btn-accion-mini" title="Ver Perfil"><img src="../../assets/icons/observar.svg"></button>
                                <button class="btn-accion-mini" title="Rechazar"><img src="../../assets/icons/finalizar.svg"></button>
                            </div>
                        </div>

                        <div class="postulante-card" draggable="true">
                             <div class="card-info">
                                <div class="avatar-postulante"></div>
                                <div class="info-texto">
                                    <h4>Carlos Mendoza</h4>
                                    <p>Para: Back-End (Node.js)</p>
                                </div>
                            </div>
                            <div class="card-acciones">
                                <button class="btn-accion-mini" title="Ver Perfil"><img src="../../assets/icons/observar.svg"></button>
                                <button class="btn-accion-mini" title="Rechazar"><img src="../../assets/icons/finalizar.svg"></button>
                            </div>
                        </div>
                        
                        <div class="postulante-card" draggable="true">
                             <div class="card-info">
                                <div class="avatar-postulante" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=LM')"></div>
                                <div class="info-texto">
                                    <h4>Laura Martínez</h4>
                                    <p>Para: Diseñador UX/UI</p>
                                </div>
                            </div>
                            <div class="card-acciones">
                                <button class="btn-accion-mini" title="Ver Perfil"><img src="../../assets/icons/observar.svg"></button>
                                <button class="btn-accion-mini" title="Rechazar"><img src="../../assets/icons/finalizar.svg"></button>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Columna 2: En Revisión -->
                <div class="kanban-columna">
                    <div class="kanban-header">
                        <h3>En Revisión</h3>
                        <span class="contador-columna">1</span>
                    </div>
                    <div class="kanban-cards-list" id="col-revision">
                        <div class="postulante-card" draggable="true">
                            <div class="card-info">
                                <div class="avatar-postulante" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=JP')"></div>
                                <div class="info-texto">
                                    <h4>Juan Pérez</h4>
                                    <p>Para: Front-End (React)</p>
                                </div>
                            </div>
                            <div class="card-acciones">
                                <button class="btn-accion-mini" title="Ver Perfil"><img src="../../assets/icons/observar.svg"></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna 3: Entrevista -->
                <div class="kanban-columna">
                    <div class="kanban-header">
                        <h3>Entrevista</h3>
                        <span class="contador-columna">1</span>
                    </div>
                    <div class="kanban-cards-list" id="col-entrevista">
                        <div class="postulante-card" draggable="true">
                            <div class="card-info">
                                <div class="avatar-postulante" style="background-image: url('https://placehold.co/100x100/3C5A74/ebebeb?text=MG')"></div>
                                <div class="info-texto">
                                    <h4>Maria García</h4>
                                    <p>Para: Back-End (Node.js)</p>
                                </div>
                            </div>
                            <div class="card-acciones">
                                <button class="btn-accion-mini" title="Agendar"><img src="../../assets/icons/agendar.svg"></button>
                                <button class="btn-accion-mini" title="Ver Perfil"><img src="../../assets/icons/observar.svg"></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna 4: Contratados -->
                <div class="kanban-columna">
                    <div class="kanban-header">
                        <h3>Contratados</h3>
                        <span class="contador-columna">0</span>
                    </div>
                    <div class="kanban-cards-list" id="col-contratados">
                        <!-- Aquí se arrastran los contratados -->
                    </div>
                </div>

            </div> <!-- Fin .kanban-board -->
        </main>
        
        <!-- 3. PIE DE PÁGINA (Idéntico) -->
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
    <script src="../../assets/js/postulantes.js"></script>
</body>
</html>
