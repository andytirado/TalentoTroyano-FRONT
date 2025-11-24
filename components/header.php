<!-- Header Component - Reutilizable en todas las páginas -->
<header class="pantalla-header">
    <div class="logo-titulo">
        <img src="../../assets/icons/logo.png" alt="Logo" class="logo-icon-header" id="header-logo" style="cursor: pointer;">
        <h2><span class="titulo1">Talento</span><span class="titulo2">Troyano</span></h2>
        <span class="breadcrumb"><?php echo isset($breadcrumb) ? $breadcrumb : 'Inicio'; ?></span>
    </div>
    <div class="user-info">
        <!-- Incluir el componente de notificaciones -->
        <?php include 'notifications.php'; ?>

        <span><img src="../../assets/icons/mensaje.svg" alt="mensajes"></span>

        <!-- Profile Dropdown -->
        <div class="profile-dropdown">
            <div class="profile" id="profile-avatar-trigger">
                <span id="user-name-header">Cargando...</span>
                <div class="avatar" id="user-avatar-header"></div>
            </div>

            <div class="dropdown-menu" id="profile-menu">
                <a href="#" class="dropdown-item" id="link-mi-perfil">
                    <img src="https://api.iconify.design/mdi:account-circle-outline.svg?color=white" class="dropdown-icon">
                    Mi Perfil
                </a>

                <a href="#" class="dropdown-item">
                    <img src="https://api.iconify.design/mdi:help-circle-outline.svg?color=white" class="dropdown-icon">
                    Soporte
                </a>

                <a href="../shared/login.php" class="dropdown-item dropdown-item-danger">
                    <img src="https://api.iconify.design/mdi:logout.svg?color=#f87171" class="dropdown-icon">
                    Cerrar Sesión
                </a>
            </div>
        </div>
    </div>
</header>

<script>
// Script para cargar datos del usuario en el header desde la BD
// Esperar a que todos los scripts (api.js, auth.js) estén cargados
window.addEventListener('load', async function() {
    try {
        // Verificar que las funciones necesarias estén disponibles
        if (typeof fetchCurrentUser === 'undefined') {
            console.error('fetchCurrentUser no está disponible. Verifica que api.js esté cargado.');
            return;
        }

        // Consultar datos del usuario desde la base de datos
        const response = await fetchCurrentUser();

        if (response.success && response.data) {
            // Normalizar datos del usuario (pueden venir en diferentes formatos)
            // El backend devuelve: {data: {usName, usLastName, ...}, message: "OK", success: true}
            const rawUserData = response.data.data || response.data.user || response.data;
            const rol = rawUserData.rol || rawUserData.role || 'usuario';

            // Normalizar según el tipo de usuario
            let userData;
            if (rol === 'usuario') {
                // Usuario estudiante
                userData = {
                    nombre: rawUserData.usName || rawUserData.nombre || rawUserData.name,
                    apellido: rawUserData.usLastName || rawUserData.apellido,
                    foto: rawUserData.usProfilePicture || rawUserData.foto || rawUserData.photo,
                    ...rawUserData
                };
            } else if (rol === 'empresa' || rol === 'admin') {
                // Usuario empresa o admin
                userData = {
                    nombre: rawUserData.adName || rawUserData.nombre || rawUserData.name,
                    apellido: rawUserData.adLastName || rawUserData.apellido,
                    foto: rawUserData.adProfilePicture || rawUserData.foto || rawUserData.photo,
                    ...rawUserData
                };
            } else {
                // Fallback
                userData = {
                    nombre: rawUserData.nombre || rawUserData.name || rawUserData.usName || rawUserData.adName,
                    foto: rawUserData.foto || rawUserData.photo || rawUserData.usProfilePicture || rawUserData.adProfilePicture,
                    ...rawUserData
                };
            }

            // Actualizar el nombre del usuario
            const userNameElement = document.getElementById('user-name-header');
            if (userNameElement) {
                const nombreCompleto = userData.apellido
                    ? `${userData.nombre} ${userData.apellido}`
                    : userData.nombre || 'Usuario';
                userNameElement.textContent = nombreCompleto;
            }

            // Actualizar la foto del usuario
            const userAvatarElement = document.getElementById('user-avatar-header');
            if (userAvatarElement) {
                if (userData.foto) {
                    // Construir la URL completa de la foto
                    const fullPhotoUrl = userData.foto.startsWith('http')
                        ? userData.foto
                        : `${API_BASE_URL.replace('/api', '')}${userData.foto}`;

                    userAvatarElement.style.backgroundImage = `url('${fullPhotoUrl}')`;
                    userAvatarElement.style.backgroundSize = 'cover';
                    userAvatarElement.style.backgroundPosition = 'center';
                    userAvatarElement.textContent = ''; // Limpiar texto si hay imagen
                } else {
                    // Si no tiene foto, usar iniciales
                    const inicial = (userData.nombre || 'U').charAt(0).toUpperCase();
                    userAvatarElement.textContent = inicial;
                    userAvatarElement.style.backgroundImage = 'none';
                    userAvatarElement.style.backgroundColor = '#336699';
                    userAvatarElement.style.color = 'white';
                    userAvatarElement.style.display = 'flex';
                    userAvatarElement.style.alignItems = 'center';
                    userAvatarElement.style.justifyContent = 'center';
                    userAvatarElement.style.fontSize = '18px';
                    userAvatarElement.style.fontWeight = 'bold';
                }
            }

            // Actualizar localStorage con los datos frescos de la BD
            setUserData(userData);

            // Configurar el link "Mi Perfil" según el rol del usuario
            const linkMiPerfil = document.getElementById('link-mi-perfil');
            if (linkMiPerfil) {
                linkMiPerfil.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Obtener el rol del usuario
                    const userRole = getUserRole();
                    const normalizedRole = normalizeRole(userRole);

                    // Redirigir según el rol
                    if (normalizedRole === USER_ROLES.STUDENT) {
                        window.location.href = FRONTEND_ROUTES.student.profile;
                    } else if (normalizedRole === USER_ROLES.COMPANY) {
                        window.location.href = FRONTEND_ROUTES.company.dashboard;
                    } else if (normalizedRole === USER_ROLES.ADMIN) {
                        window.location.href = FRONTEND_ROUTES.admin.config;
                    }
                });
            }

            // Configurar el logo para redirigir al inicio según el rol del usuario
            const headerLogo = document.getElementById('header-logo');
            if (headerLogo) {
                headerLogo.addEventListener('click', function() {
                    // Obtener el rol del usuario
                    const userRole = getUserRole();
                    const normalizedRole = normalizeRole(userRole);

                    // Redirigir al dashboard según el rol
                    if (normalizedRole === USER_ROLES.STUDENT) {
                        window.location.href = FRONTEND_ROUTES.student.dashboard;
                    } else if (normalizedRole === USER_ROLES.COMPANY) {
                        window.location.href = FRONTEND_ROUTES.company.dashboard;
                    } else if (normalizedRole === USER_ROLES.ADMIN) {
                        window.location.href = FRONTEND_ROUTES.admin.dashboard;
                    } else {
                        // Fallback: redirigir a login si no hay rol
                        window.location.href = FRONTEND_ROUTES.login;
                    }
                });
            }
        } else {
            console.error('Error al obtener datos del usuario:', response.message);
        }
    } catch (error) {
        console.error('Error al cargar datos del usuario en el header:', error);
    }
});
</script>
