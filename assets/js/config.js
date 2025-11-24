/**
 * config.js
 * Configuración global de la aplicación
 * URLs del backend y constantes de la aplicación
 */

// ============================================
// CONFIGURACIÓN DEL BACKEND
// ============================================

// URL base del backend Laravel (CAMBIA ESTO según tu entorno)
// En desarrollo, el frontend y backend corren en puertos diferentes
const API_BASE_URL = (function () {
    // IMPORTANTE: Cuando frontend y backend están en puertos diferentes,
    // usar una URL fija para el backend

    // Desarrollo local: Backend en puerto 8001
    if (typeof window !== 'undefined' && window.location) {
        const hostname = window.location.hostname;

        // Si estamos en localhost o 127.0.0.1, usar el puerto del backend (8001)
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8001/api';
        }

        // En producción, el backend estaría en /api del mismo dominio
        const protocol = window.location.protocol;
        return `${protocol}//${hostname}/api`;
    }

    // Fallback
    return 'http://localhost:8001/api';
})();
// const API_BASE_URL = 'https://tu-backend.com/api'; // Producción

// ============================================
// ENDPOINTS DE LA API
// ============================================

const API_ENDPOINTS = {
    // Autenticación
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        logout: `${API_BASE_URL}/auth/logout`,
        register: `${API_BASE_URL}/auth/register`,
        me: `${API_BASE_URL}/me`,
        refresh: `${API_BASE_URL}/auth/refresh`,
        forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
        resetPassword: `${API_BASE_URL}/auth/reset-password`,
    },

    // Usuarios
    users: {
        index: `${API_BASE_URL}/users`,
        show: (id) => `${API_BASE_URL}/users/${id}`,
        update: (id) => `${API_BASE_URL}/users/${id}`,
        delete: (id) => `${API_BASE_URL}/users/${id}`,
    },

    // Estudiantes
    students: {
        index: `${API_BASE_URL}/students`,
        show: (id) => `${API_BASE_URL}/students/${id}`,
        update: (id) => `${API_BASE_URL}/students/${id}`,
        profile: `${API_BASE_URL}/students/profile`,
        updateProfile: `${API_BASE_URL}/me`,
    },

    // Empresas
    companies: {
        index: `${API_BASE_URL}/companies`,
        show: (id) => `${API_BASE_URL}/companies/${id}`,
        create: `${API_BASE_URL}/companies`,
        update: (id) => `${API_BASE_URL}/companies/${id}`,
        delete: (id) => `${API_BASE_URL}/companies/${id}`,
        profile: `${API_BASE_URL}/companies/profile`,
    },

    // Vacantes
    vacancies: {
        index: `${API_BASE_URL}/vacantes`,
        show: (id) => `${API_BASE_URL}/vacantes/${id}`,
        create: `${API_BASE_URL}/vacantes`,
        update: (id) => `${API_BASE_URL}/vacantes/${id}`,
        delete: (id) => `${API_BASE_URL}/vacantes/${id}`,
        active: `${API_BASE_URL}/vacantes/active`,
        finished: `${API_BASE_URL}/vacantes/finished`,
        apply: (id) => `${API_BASE_URL}/vacantes/${id}/solicitar`, // Aplicar a vacante
    },

    // Postulaciones
    applications: {
        index: `${API_BASE_URL}/applications`,
        show: (id) => `${API_BASE_URL}/applications/${id}`,
        create: `${API_BASE_URL}/applications`,
        update: (id) => `${API_BASE_URL}/applications/${id}`,
        myApplications: `${API_BASE_URL}/applications/my`,
        byVacancy: (vacancyId) => `${API_BASE_URL}/applications/vacancy/${vacancyId}`,
        byUser: (userId) => `${API_BASE_URL}/postulations/user/${userId}`, // Obtener postulaciones de un usuario
        withdraw: (id) => `${API_BASE_URL}/postulations/${id}/withdraw`, // Retirar postulación
    },

    // Estadísticas
    statistics: {
        admin: `${API_BASE_URL}/statistics/admin`,
        company: `${API_BASE_URL}/statistics/company`,
        student: `${API_BASE_URL}/statistics/student`,
    },

    // Documentos
    documents: {
        upload: `${API_BASE_URL}/documents`,
        index: `${API_BASE_URL}/documents`,
        show: (id) => `${API_BASE_URL}/documents/${id}`,
        delete: (id) => `${API_BASE_URL}/documents/${id}`,
        downloadUrl: (id) => `${API_BASE_URL}/documents/${id}/download-url`,
        download: (id) => `${API_BASE_URL}/documents/${id}/download`,
    },
};

// ============================================
// RUTAS DEL FRONTEND
// ============================================

const FRONTEND_ROUTES = {
    // Páginas públicas
    login: '/html/shared/login.php',
    signup: '/html/shared/signup.php',
    error: '/html/shared/error.php',

    // Admin
    admin: {
        dashboard: '/html/admin/Admin.php',
        students: '/html/admin/alumnosAdmin.php',
        companies: '/html/admin/empresasAdmin.php',
        statistics: '/html/admin/estadisticaAdmin.php',
        createCompany: '/html/admin/crearEmpresa.php',
        createVacancy: '/html/shared/crearVacanteAdmin.php',
        config: '/html/admin/adminConfiguracion.php',
    },

    // Empresa
    company: {
        dashboard: '/html/empresa/empresa.php',
        completeProfile: '/html/empresa/empresaCompletarPerfil.php',
        activeVacancies: '/html/empresa/vacantesActivas.php',
        finishedVacancies: '/html/empresa/vacantesFinalizadas.php',
        applicants: '/html/empresa/verPostulantes.php',
        statistics: '/html/empresa/estadisticaEmpresa.php',
    },

    // Estudiante
    student: {
        dashboard: '/html/estudiante/homeuser.php',
        profile: '/html/estudiante/perfilUsuario.php',
        editProfile: '/html/estudiante/perfilUsuarioEditar.php',
        completeProfile: '/html/estudiante/perfilCompleto.php',
        applications: '/html/estudiante/misPostulaciones.php',
        vacancyDetails: '/html/estudiante/verDetallesVacante.php',
    },

    // Shared
    shared: {
        companyProfile: '/html/shared/perfilEmpresa.php',
        applicants: '/html/shared/postulantes.php',
    },
};

// ============================================
// ROLES DE USUARIO
// ============================================

const USER_ROLES = {
    ADMIN: 'admin',
    COMPANY: 'empresa',
    STUDENT: 'estudiante',
};

// ============================================
// CONSTANTES DE LA APLICACIÓN
// ============================================

const APP_CONFIG = {
    // Nombre de la aplicación
    appName: 'Talento Troyano',

    // Tiempo de expiración del token (en milisegundos)
    tokenExpirationTime: 24 * 60 * 60 * 1000, // 24 horas

    // Límite de intentos de login
    maxLoginAttempts: 5,

    // Tiempo de bloqueo después de exceder intentos (en milisegundos)
    lockoutTime: 15 * 60 * 1000, // 15 minutos

    // Tamaño máximo de archivo (en bytes)
    maxFileSize: 5 * 1024 * 1024, // 5 MB

    // Tipos de archivo permitidos
    allowedFileTypes: ['pdf', 'doc', 'docx'],

    // Tipos de imagen permitidos
    allowedImageTypes: ['jpg', 'jpeg', 'png', 'gif'],
};

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================

// Hacer disponible globalmente
window.APP_CONFIG = APP_CONFIG;
window.API_ENDPOINTS = API_ENDPOINTS;
window.FRONTEND_ROUTES = FRONTEND_ROUTES;
window.USER_ROLES = USER_ROLES;
window.API_BASE_URL = API_BASE_URL;
