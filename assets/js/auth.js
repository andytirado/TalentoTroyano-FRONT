/**
 * auth.js
 * Sistema de autenticación basado en tokens
 * Manejo de localStorage, verificación de sesión y redirección
 */

// ============================================
// CONSTANTES
// ============================================

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const TOKEN_TIMESTAMP_KEY = 'token_timestamp';

// ============================================
// FUNCIONES DE MANEJO DE TOKENS
// ============================================

/**
 * Guarda el token de autenticación en localStorage
 * @param {string} token - Token JWT del backend
 */
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
}

/**
 * Obtiene el token de autenticación desde localStorage
 * @returns {string|null} Token o null si no existe
 */
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Elimina el token de autenticación
 */
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_TIMESTAMP_KEY);
}

/**
 * Verifica si el token ha expirado
 * @returns {boolean} true si el token ha expirado
 */
function isTokenExpired() {
    const timestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
    if (!timestamp) return true;

    const tokenAge = Date.now() - parseInt(timestamp);
    return tokenAge > APP_CONFIG.tokenExpirationTime;
}

// ============================================
// FUNCIONES DE MANEJO DE USUARIO
// ============================================

/**
 * Guarda los datos del usuario en localStorage
 * @param {Object} userData - Datos del usuario (id, nombre, email, rol, etc.)
 */
function setUserData(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

/**
 * Obtiene los datos del usuario desde localStorage
 * @returns {Object|null} Datos del usuario o null si no existe
 */
function getUserData() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
}

/**
 * Obtiene el rol del usuario actual
 * @returns {string|null} Rol del usuario ('admin', 'empresa', 'estudiante') o null
 */
function getUserRole() {
    const userData = getUserData();
    return userData ? userData.rol : null;
}

/**
 * Obtiene el ID del usuario actual
 * @returns {number|null} ID del usuario o null
 */
function getUserId() {
    const userData = getUserData();
    return userData ? userData.id : null;
}

/**
 * Elimina los datos del usuario
 */
function removeUserData() {
    localStorage.removeItem(USER_KEY);
}

// ============================================
// FUNCIONES DE VERIFICACIÓN
// ============================================

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} true si hay un token válido
 */
function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    if (isTokenExpired()) {
        logout();
        return false;
    }
    return true;
}

/**
 * Verifica la autenticación y redirige al login si no está autenticado
 * Debe llamarse al inicio de cada página protegida
 * También previene que la página se cargue desde caché después del logout
 */
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = FRONTEND_ROUTES.login;
        return;
    }

    // Automáticamente prevenir caché después de logout
    preventCacheAfterLogout();
}

/**
 * Previene que la página se cargue desde caché después del logout
 * Se llama automáticamente desde checkAuth()
 */
function preventCacheAfterLogout() {
    // Detectar cuando la página se carga desde el caché (botón atrás)
    window.addEventListener('pageshow', function(event) {
        // Si la página se carga desde el cache (bfcache)
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            console.log('Página cargada desde caché, verificando autenticación...');
            // Verificar autenticación nuevamente
            if (!isAuthenticated()) {
                console.log('Usuario no autenticado, redirigiendo a login...');
                // Usar replace para no crear nueva entrada en historial
                window.location.replace(FRONTEND_ROUTES.login);
            }
        }
    });
}

/**
 * Verifica que el usuario tenga el rol requerido
 * Redirige a la página de error si no tiene el rol correcto
 * @param {string|Array<string>} requiredRoles - Rol o roles permitidos
 */
function requireRole(requiredRoles) {
    // Verificar autenticación primero
    if (!isAuthenticated()) {
        window.location.href = FRONTEND_ROUTES.login;
        return;
    }

    const userRole = getUserRole();

    // Convertir a array si es un solo rol
    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Normalizar el rol del usuario y los roles requeridos
    const normalizedUserRole = normalizeRole(userRole);
    const normalizedRequiredRoles = rolesArray.map(r => normalizeRole(r));

    // Verificar si el usuario tiene alguno de los roles requeridos
    if (!normalizedRequiredRoles.includes(normalizedUserRole)) {
        console.warn(`Acceso denegado. Rol requerido: ${rolesArray.join(' o ')}, Rol actual: ${userRole}`);

        // Redirigir a la página correspondiente según su rol
        redirectToRoleDashboard(userRole);
    }
}

// ============================================
// FUNCIONES DE LOGIN/LOGOUT
// ============================================

/**
 * Procesa el login del usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function login(email, password) {
    try {
        const response = await fetch(API_ENDPOINTS.auth.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ usEmail: email, password }),
        });

        const data = await response.json();

        // Normalizar payload que puede venir anidado en `data` o en la raíz
        const payload = data.data || data;
        const token = payload.token || data.token || null;
        const user = payload.user || data.user || null;

        if (response.ok && token && user) {
            // Normalizar datos según el tipo de usuario
            const rol = user.rol || user.role || user.usRol || 'usuario';

            let normalizedUser;

            if (rol === 'usuario') {
                // Usuario estudiante
                normalizedUser = {
                    id: user.idUser || user.id,
                    nombre: user.usName || user.name || user.nombre,
                    apellido: user.usLastName || user.lastName,
                    email: user.usEmail || user.email,
                    telefono: user.usPhoneNumber || user.phone,
                    foto: user.usProfilePicture || user.photo || user.profilePicture,
                    expediente: user.expedient,
                    descripcion: user.usDescription,
                    fechaNacimiento: user.usBirthday,
                    rol: 'usuario',
                    idCompany: null,
                    ...user,
                };
            } else if (rol === 'empresa' || rol === 'admin') {
                // Usuario empresa o admin
                normalizedUser = {
                    id: user.idAdmin || user.id,
                    nombre: user.adName || user.name || user.nombre,
                    apellido: user.adLastName || user.lastName,
                    email: user.adEmail || user.email,
                    telefono: user.adPhoneNumber || user.phone,
                    foto: user.adProfilePicture || user.photo || user.profilePicture,
                    rol: rol,
                    idCompany: user.idCompany || user.id_company || user.company_id || null,
                    compName: user.compName || user.comp_name || user.company_name || null,
                    compImage: user.compImage || user.comp_image || user.company_image || null,
                    ...user,
                };
            } else {
                // Fallback genérico
                normalizedUser = {
                    id: user.id || user.idUser || user.idAdmin,
                    nombre: user.name || user.nombre || user.usName || user.adName,
                    email: user.email || user.usEmail || user.adEmail,
                    foto: user.photo || user.usProfilePicture || user.adProfilePicture,
                    rol: rol,
                    idCompany: user.idCompany || null,
                    compName: user.compName || user.comp_name || user.company_name || null,
                    compImage: user.compImage || user.comp_image || user.company_image || null,
                    ...user,
                };
            }

            setToken(token);
            setUserData(normalizedUser);

            // Redirigir según rol (método simple)
            redirectToRoleDashboard(normalizedUser.rol);

            return { success: true, data };
        }

        return { success: false, message: data.message || 'Error en el login' };
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
}

/**
 * Cierra la sesión del usuario
 */
async function logout() {
    const token = getToken();

    // Intentar notificar al backend (opcional, no bloqueante)
    if (token) {
        try {
            await fetch(API_ENDPOINTS.auth.logout, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
        } catch (error) {
            console.warn('No se pudo notificar logout al servidor:', error);
        }
    }

    // Limpiar datos locales
    removeToken();
    removeUserData();

    // Prevenir que el navegador guarde la página en caché
    // Esto evita que al presionar "atrás" se cargue la página anterior
    if (window.history && window.history.replaceState) {
        // Reemplazar la entrada actual del historial
        window.history.replaceState(null, '', FRONTEND_ROUTES.login);
    }

    // Redirigir al login (usar replace para no crear nueva entrada en historial)
    window.location.replace(FRONTEND_ROUTES.login);
}

// ============================================
// FUNCIONES DE REDIRECCIÓN
// ============================================

/**
 * Redirige al dashboard según el rol del usuario
 * @param {string} role - Rol del usuario ('admin', 'empresa', 'estudiante')
 */
/**
 * Normaliza el rol que viene del backend a uno de `USER_ROLES`
 * @param {string} rawRole
 * @returns {string}
 */
function normalizeRole(rawRole) {
    if (!rawRole) return USER_ROLES.STUDENT;
    const r = String(rawRole).toLowerCase();
    if (r === 'admin' || r === 'administrator' || r === 'administrador') return USER_ROLES.ADMIN;
    if (r === 'empresa' || r === 'company' || r === 'business') return USER_ROLES.COMPANY;
    if (r === 'usuario' || r === 'user' || r === 'estudiante' || r === 'student') return USER_ROLES.STUDENT;
    return USER_ROLES.STUDENT;
}

function redirectToRoleDashboard(role) {
    const userData = getUserData();
    const idCompany = userData?.idCompany || userData?.id_company;

    // Normalizar el rol primero
    const normalizedRole = normalizeRole(role);

    let target = null;

    // PRIORIZAR EL ROL sobre idCompany
    if (normalizedRole === USER_ROLES.ADMIN) {
        target = FRONTEND_ROUTES.admin.dashboard;
    } else if (normalizedRole === USER_ROLES.COMPANY) {
        target = FRONTEND_ROUTES.company.dashboard;
    } else if (normalizedRole === USER_ROLES.STUDENT) {
        target = FRONTEND_ROUTES.student.dashboard;
    } else {
        // Fallback: Si el rol no es reconocido, usar idCompany
        if (idCompany) {
            if (idCompany === 1 || idCompany === '1') {
                target = FRONTEND_ROUTES.admin.dashboard;
            } else {
                target = FRONTEND_ROUTES.company.dashboard;
            }
        } else {
            // Por defecto, estudiante
            target = FRONTEND_ROUTES.student.dashboard;
        }
    }

    // Evitar redirigir si ya estamos en la misma ruta (evita bucles de recarga)
    try {
        const targetPath = new URL(target, window.location.origin).pathname;
        const currentPath = window.location.pathname;
        if (currentPath !== targetPath) {
            window.location.href = target;
        }
    } catch (err) {
        // Fallback simple
        if (window.location.href !== target) window.location.href = target;
    }
}

/**
 * Si el usuario ya está autenticado, redirige a su dashboard
 * Útil para la página de login
 */
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        const role = getUserRole();
        if (role) {
            redirectToRoleDashboard(role);
        }
    }
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Obtiene los headers de autenticación para peticiones fetch
 * @returns {Object} Headers con Authorization y Content-Type
 */
function getAuthHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
}

/**
 * Verifica si hay una sesión activa y muestra información en consola (debug)
 */
function debugAuth() {
    console.log('=== DEBUG AUTH ===');
    console.log('Token:', getToken());
    console.log('User Data:', getUserData());
    console.log('Is Authenticated:', isAuthenticated());
    console.log('User Role:', getUserRole());
    console.log('Token Expired:', isTokenExpired());
    console.log('==================');
}
