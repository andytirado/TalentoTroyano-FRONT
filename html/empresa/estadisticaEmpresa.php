<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Tus Estadísticas";
$userRole = "Administrador<br>empresa";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas - Talento Troyano</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/estadisticaEmpresa.css">
</head>
<body>

    <div class="pantalla" id="estadisticasEmpresa">
        <?php include '../../components/header.php'; ?>

        <main class="pantalla-content">
            
            <div class="page-title-bar">
                <h2>Tus Estadísticas</h2>
                <div class="date-filter-container">
                    <label for="date-range">Ver:</label>
                    <select id="date-range" name="date-range" class="date-select">
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 90 días</option>
                        <option value="year">Este año</option>
                        <option value="all">Histórico</option>
                    </select>
                </div>
            </div>

            <div class="kpi-grid">
                <div class="kpi-card">
                    <img src="../../assets/icons/case1.svg" class="kpi-icon">
                    <span class="kpi-value">12</span>
                    <span class="kpi-label">Total Vacantes</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/case-check.svg" class="kpi-icon">
                    <span class="kpi-value">4</span>
                    <span class="kpi-label">Vacantes Activas</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/case-pause.svg" class="kpi-icon">
                    <span class="kpi-value">1</span>
                    <span class="kpi-label">Vacantes Pausadas</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/caseoff.svg" class="kpi-icon">
                    <span class="kpi-value">7</span>
                    <span class="kpi-label">Vacantes Cerradas</span>
                </div>

                <div class="kpi-card">
                    <img src="../../assets/icons/postulacion.svg" class="kpi-icon">
                    <span class="kpi-value">184</span>
                    <span class="kpi-label">Total Postulaciones</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/postulacion-pause.svg" class="kpi-icon">
                    <span class="kpi-value">22</span>
                    <span class="kpi-label"> Postulaciones Pendientes</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/postulacion-on.svg" class="kpi-icon">
                    <span class="kpi-value">9</span>
                    <span class="kpi-label">Aceptadas</span>
                </div>
                <div class="kpi-card">
                    <img src="../../assets/icons/postulacion-off.svg" class="kpi-icon">
                    <span class="kpi-value">153</span>
                    <span class="kpi-label">Rechazadas</span>
                </div>
            </div>

            <div class="section-title">Resumen</div>
            <div class="insights-grid">
                <div class="insight-card">
                    <h4>Vacante Más Popular</h4>
                    <div class="popular-job-card">
                        <div class="vacante-info">
                            <h5>Desarrollador Front-End (React)</h5>
                            <p>Tiempo Completo | Remoto</p>
                        </div>
                        <div class="vacante-stats">
                            <strong>87</strong>
                            <span>Postulantes</span>
                        </div>
                    </div>
                </div>
                <div class="insight-card">
                    <h4>Resumen Salarial (MXN)</h4>
                    <div class="salary-summary">
                        <div class="salary-item">
                            <span>Mínimo</span>
                            <strong>$18,000</strong>
                        </div>
                        <div class="salary-item">
                            <span>Promedio</span>
                            <strong>$32,500</strong>
                        </div>
                        <div class="salary-item">
                            <span>Máximo</span>
                            <strong>$55,000</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-title">Desglose</div>
            <div class="charts-grid">
                <div class="chart-container-large">
                    <h4>Postulaciones por Mes</h4>
                    <img src="https://placehold.co/600x300/3C5A74/ebebeb?text=Gráfico+de+Línea+(Postulaciones)" alt="Gráfico de postulaciones por mes" class="chart-placeholder">
                </div>
                <div class="charts-small-grid">
                    <div class="chart-container-small">
                        <h4>Por Modalidad</h4>
                        <img src="https://placehold.co/250x250/3C5A74/ebebeb?text=Gráfico+Dona" alt="Gráfico de modalidad" class="chart-placeholder">
                    </div>
                    <div class="chart-container-small">
                        <h4>Por Tipo de Contrato</h4>
                        <img src="https://placehold.co/250x250/3C5A74/ebebeb?text=Gráfico+Dona" alt="Gráfico de contrato" class="chart-placeholder">
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
    <script src="../../assets/js/estadisticaEmpresa.js"></script>
</body>
</html>