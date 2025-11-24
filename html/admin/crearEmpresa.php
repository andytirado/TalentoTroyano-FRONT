<?php
// Configuración del breadcrumb y rol de usuario para esta página
$breadcrumb = "Crear Empresa";
$userRole = "Administrador<br>Universidad";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Empresa - Admin</title>

    <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/global.css">
    <link rel="stylesheet" href="../../assets/css/globalAdmin.css">
    <link rel="stylesheet" href="../../assets/css/crearEmpresa.css">
</head>
<body>

    <div class="pantalla" id="adminPantallaCrearEmpresa">
        <?php include '../../components/header.php'; ?>
        <main class="pantalla-content form-content">
            <form class="form-paso1" onsubmit="return false;">
                <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Información de la Empresa</div>
                    
                    <input type="text" id="empresa-nombre" placeholder="Nombre de la Empresa">
                    <span class="error-msg" id="error-nombre" style="display: none;"></span>
        
                    <input type="text" id="empresa-rfc" placeholder="RFC">
                    <span class="error-msg" id="error-rfc" style="display: none;"></span>
        
                    <input type="text" id="empresa-industria" placeholder="Industria (Ej. Tecnología)">
                </div>
                <div class="form-col">
                    <div class="btn btn-secondary form-section-title">Datos del Reclutador</div>
                    
                    <input type="text" id="empresa-reclutador" placeholder="Nombre del Reclutador">
                    <span class="error-msg" id="error-reclutador" style="display: none;"></span>
        
                    <input type="email" id="empresa-email" placeholder="Email de Contacto">
                    <span class="error-msg" id="error-email" style="display: none;"></span>
                    
                    </div>
            </form>
        </main>
        <footer class="pantalla-footer split">
            <a href="admin.php" class="btn btn-secondary">Regresar</a>
            <button class="btn" id="btn-guardar-empresa">Guardar Empresa</button>
        </footer>
    </div>

    <div class="pantalla" id="success" style="display: none;">
        <main class="pantalla-content success-content">
            <div class="checkmark">
                <div class="circle"></div>
                <div class="tick">✔</div>
            </div>
            <h2>Empresa guardada con éxito</h2>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <button class="btn" id="btnVerCredenciales">Ver credenciales temporales</button>
                <button class="btn" id="btnEnviarEmail">Enviar por email</button>
            </div>

            <button class="btn btn-secondary" id="volverInicio">Volver al inicio</button>
        </main>
    </div>

    <!-- Scripts de autenticación y API -->
    <script src="../../assets/js/config.js"></script>
    <script src="../../assets/js/auth.js"></script>
    <script src="../../assets/js/api.js"></script>
    <script src="../../assets/js/global.js"></script>

    <!-- Script específico de la página -->
    <script src="../../assets/js/crearEmpresa.js"></script>
</body>
</html>