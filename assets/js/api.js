/**
 * api.js
 * Capa de abstracción para todas las peticiones HTTP al backend
 * Funciones reutilizables para GET, POST, PUT, DELETE con manejo de errores
 */

// ============================================
// FUNCIONES BASE DE HTTP
// ============================================

/**
 * Realiza una petición GET al backend
 * @param {string} url - URL completa del endpoint
 * @param {Object} options - Opciones adicionales (headers, etc.)
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function apiGet(url, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
        });

        return await handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Realiza una petición POST al backend
 * @param {string} url - URL completa del endpoint
 * @param {Object} data - Datos a enviar en el body
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function apiPost(url, data = {}, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
            body: JSON.stringify(data),
        });

        return await handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Realiza una petición PUT al backend
 * @param {string} url - URL completa del endpoint
 * @param {Object} data - Datos a actualizar
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function apiPut(url, data = {}, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
            body: JSON.stringify(data),
        });

        return await handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Realiza una petición DELETE al backend
 * @param {string} url - URL completa del endpoint
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function apiDelete(url, options = {}) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
        });

        return await handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

/**
 * Sube un archivo al backend (FormData)
 * @param {string} url - URL completa del endpoint
 * @param {FormData} formData - FormData con el archivo
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function apiUploadFile(url, formData) {
    try {
        const token = getToken();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                // NO incluir Content-Type para FormData (se añade automáticamente)
            },
            body: formData,
        });

        return await handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

// ============================================
// MANEJO DE RESPUESTAS Y ERRORES
// ============================================

/**
 * Procesa la respuesta del servidor
 * @param {Response} response - Objeto Response de fetch
 * @returns {Promise<Object>} Datos procesados
 */
async function handleResponse(response) {
    // Si es 401 (no autorizado), hacer logout automático
    if (response.status === 401) {
        console.warn('Sesión expirada o no autorizada');
        logout();
        return { success: false, message: 'Sesión expirada', status: 401 };
    }

    // Si es 403 (prohibido), el usuario no tiene permisos
    if (response.status === 403) {
        return { success: false, message: 'No tienes permisos para esta acción', status: 403 };
    }

    // Intentar parsear JSON
    let data;
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    // Si la respuesta es exitosa (2xx)
    if (response.ok) {
        return { success: true, data, status: response.status };
    }

    // Si hay error (4xx, 5xx)
    return {
        success: false,
        message: data.message || 'Error en la petición',
        errors: data.errors || {},
        status: response.status,
    };
}

/**
 * Maneja errores de red o fetch
 * @param {Error} error - Error capturado
 * @returns {Object} Objeto de error estandarizado
 */
function handleError(error) {
    console.error('Error en petición API:', error);
    return {
        success: false,
        message: 'Error de conexión con el servidor',
        error: error.message,
    };
}

// ============================================
// FUNCIONES ESPECÍFICAS DE LA API
// ============================================

// --------- AUTENTICACIÓN ---------

/**
 * Obtiene información del usuario autenticado
 * @returns {Promise<Object>} Datos del usuario
 */
async function fetchCurrentUser() {
    return await apiGet(API_ENDPOINTS.auth.me);
}

/**
 * Envía la petición para restablecer la contraseña
 * @param {string} email - Correo del usuario
 * @returns {Promise<Object>} Confirmación
 */
async function forgotPassword(email) {
    return await apiPost(API_ENDPOINTS.auth.forgotPassword, { email });
}

/**
 * Restablece la contraseña con el token
 * @param {Object} data - Datos { token, email, password, password_confirmation }
 * @returns {Promise<Object>} Confirmación
 */
async function resetPassword(data) {
    return await apiPost(API_ENDPOINTS.auth.resetPassword, data);
}

// --------- USUARIOS ---------

/**
 * Obtiene lista de usuarios
 * @returns {Promise<Object>} Lista de usuarios
 */
async function fetchUsers() {
    return await apiGet(API_ENDPOINTS.users.index);
}

/**
 * Obtiene un usuario por ID
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Datos del usuario
 */
async function fetchUser(userId) {
    return await apiGet(API_ENDPOINTS.users.show(userId));
}

/**
 * Actualiza un usuario
 * @param {number} userId - ID del usuario
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
async function updateUser(userId, data) {
    return await apiPut(API_ENDPOINTS.users.update(userId), data);
}

/**
 * Elimina un usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Confirmación
 */
async function deleteUser(userId) {
    return await apiDelete(API_ENDPOINTS.users.delete(userId));
}

// --------- ESTUDIANTES ---------

/**
 * Obtiene lista de estudiantes
 * @returns {Promise<Object>} Lista de estudiantes
 */
async function fetchStudents() {
    return await apiGet(API_ENDPOINTS.students.index);
}

/**
 * Obtiene perfil de un estudiante
 * @param {number} studentId - ID del estudiante
 * @returns {Promise<Object>} Datos del estudiante
 */
async function fetchStudent(studentId) {
    return await apiGet(API_ENDPOINTS.students.show(studentId));
}

/**
 * Actualiza perfil de estudiante
 * @param {number} studentId - ID del estudiante
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Estudiante actualizado
 */
async function updateStudent(studentId, data) {
    return await apiPut(API_ENDPOINTS.students.update(studentId), data);
}

/**
 * Obtiene el perfil del estudiante autenticado
 * @returns {Promise<Object>} Perfil del estudiante
 */
async function fetchMyStudentProfile() {
    return await apiGet(API_ENDPOINTS.students.profile);
}

// --------- EMPRESAS ---------

/**
 * Obtiene lista de empresas
 * @returns {Promise<Object>} Lista de empresas
 */
async function fetchCompanies() {
    return await apiGet(API_ENDPOINTS.companies.index);
}

/**
 * Obtiene una empresa por ID
 * @param {number} companyId - ID de la empresa
 * @returns {Promise<Object>} Datos de la empresa
 */
async function fetchCompany(companyId) {
    return await apiGet(API_ENDPOINTS.companies.show(companyId));
}

/**
 * Crea una nueva empresa
 * @param {Object} data - Datos de la empresa
 * @returns {Promise<Object>} Empresa creada
 */
async function createCompany(data) {
    return await apiPost(API_ENDPOINTS.companies.create, data);
}

/**
 * Actualiza una empresa
 * @param {number} companyId - ID de la empresa
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Empresa actualizada
 */
async function updateCompany(companyId, data) {
    return await apiPut(API_ENDPOINTS.companies.update(companyId), data);
}

/**
 * Elimina una empresa
 * @param {number} companyId - ID de la empresa
 * @returns {Promise<Object>} Confirmación
 */
async function deleteCompany(companyId) {
    return await apiDelete(API_ENDPOINTS.companies.delete(companyId));
}

/**
 * Obtiene el perfil de la empresa autenticada
 * @returns {Promise<Object>} Perfil de la empresa
 */
async function fetchMyCompanyProfile() {
    return await apiGet(API_ENDPOINTS.companies.profile);
}

// --------- VACANTES ---------

/**
 * Obtiene lista de vacantes
 * @returns {Promise<Object>} Lista de vacantes
 */
async function fetchVacancies() {
    return await apiGet(API_ENDPOINTS.vacancies.index);
}

/**
 * Obtiene una vacante por ID
 * @param {number} vacancyId - ID de la vacante
 * @returns {Promise<Object>} Datos de la vacante
 */
async function fetchVacancy(vacancyId) {
    return await apiGet(API_ENDPOINTS.vacancies.show(vacancyId));
}

/**
 * Crea una nueva vacante
 * @param {Object} data - Datos de la vacante
 * @returns {Promise<Object>} Vacante creada
 */
async function createVacancy(data) {
    return await apiPost(API_ENDPOINTS.vacancies.create, data);
}

/**
 * Actualiza una vacante
 * @param {number} vacancyId - ID de la vacante
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Vacante actualizada
 */
async function updateVacancy(vacancyId, data) {
    return await apiPut(API_ENDPOINTS.vacancies.update(vacancyId), data);
}

/**
 * Elimina una vacante
 * @param {number} vacancyId - ID de la vacante
 * @returns {Promise<Object>} Confirmación
 */
async function deleteVacancy(vacancyId) {
    return await apiDelete(API_ENDPOINTS.vacancies.delete(vacancyId));
}

/**
 * Obtiene vacantes activas
 * @returns {Promise<Object>} Lista de vacantes activas
 */
async function fetchActiveVacancies() {
    return await apiGet(API_ENDPOINTS.vacancies.active);
}

/**
 * Obtiene vacantes finalizadas
 * @returns {Promise<Object>} Lista de vacantes finalizadas
 */
async function fetchFinishedVacancies() {
    return await apiGet(API_ENDPOINTS.vacancies.finished);
}

/**
 * Aplica a una vacante específica
 * @param {number} vacancyId - ID de la vacante
 * @param {Object} data - Datos de la aplicación (carta_presentacion, documento_id)
 * @returns {Promise<Object>} Respuesta de la aplicación
 */
async function applyToVacancy(vacancyId, data = {}) {
    return await apiPost(API_ENDPOINTS.vacancies.apply(vacancyId), data);
}

// --------- POSTULACIONES ---------

/**
 * Obtiene lista de postulaciones
 * @returns {Promise<Object>} Lista de postulaciones
 */
async function fetchApplications() {
    return await apiGet(API_ENDPOINTS.applications.index);
}

/**
 * Obtiene las postulaciones de un usuario específico
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Lista de postulaciones del usuario
 */
async function fetchUserApplications(userId) {
    return await apiGet(API_ENDPOINTS.applications.byUser(userId));
}

/**
 * Obtiene una postulación por ID
 * @param {number} applicationId - ID de la postulación
 * @returns {Promise<Object>} Datos de la postulación
 */
async function fetchApplication(applicationId) {
    return await apiGet(API_ENDPOINTS.applications.show(applicationId));
}

/**
 * Crea una nueva postulación
 * @param {Object} data - Datos de la postulación (vacancy_id, etc.)
 * @returns {Promise<Object>} Postulación creada
 */
async function createApplication(data) {
    return await apiPost(API_ENDPOINTS.applications.create, data);
}

/**
 * Actualiza una postulación (cambiar estado, etc.)
 * @param {number} applicationId - ID de la postulación
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Postulación actualizada
 */
async function updateApplication(applicationId, data) {
    return await apiPut(API_ENDPOINTS.applications.update(applicationId), data);
}

/**
 * Obtiene las postulaciones del usuario autenticado
 * @returns {Promise<Object>} Lista de mis postulaciones
 */
async function fetchMyApplications() {
    return await apiGet(API_ENDPOINTS.applications.myApplications);
}

/**
 * Obtiene postulaciones de una vacante específica
 * @param {number} vacancyId - ID de la vacante
 * @returns {Promise<Object>} Lista de postulantes
 */
async function fetchApplicationsByVacancy(vacancyId) {
    return await apiGet(API_ENDPOINTS.applications.byVacancy(vacancyId));
}

/**
 * Retira una postulación
 * @param {number} applicationId - ID de la postulación
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function withdrawApplication(applicationId) {
    return await apiPost(API_ENDPOINTS.applications.withdraw(applicationId));
}

// --------- ESTADÍSTICAS ---------

/**
 * Obtiene estadísticas de administrador
 * @returns {Promise<Object>} Estadísticas generales
 */
async function fetchAdminStatistics() {
    return await apiGet(API_ENDPOINTS.statistics.admin);
}

/**
 * Obtiene estadísticas de empresa
 * @returns {Promise<Object>} Estadísticas de la empresa
 */
async function fetchCompanyStatistics() {
    return await apiGet(API_ENDPOINTS.statistics.company);
}

/**
 * Obtiene estadísticas de estudiante
 * @returns {Promise<Object>} Estadísticas del estudiante
 */
async function fetchStudentStatistics() {
    return await apiGet(API_ENDPOINTS.statistics.student);
}

// --------- DOCUMENTOS ---------

/**
 * Sube un documento PDF
 * @param {File} file - Archivo PDF a subir
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function uploadDocument(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await apiUploadFile(API_ENDPOINTS.documents.upload, formData);
}

/**
 * Obtiene lista de documentos del usuario autenticado
 * @returns {Promise<Object>} Lista de documentos
 */
async function fetchMyDocuments() {
    return await apiGet(API_ENDPOINTS.documents.index);
}

/**
 * Elimina un documento
 * @param {number} documentId - ID del documento
 * @returns {Promise<Object>} Confirmación
 */
async function deleteDocument(documentId) {
    return await apiDelete(API_ENDPOINTS.documents.delete(documentId));
}

/**
 * Obtiene información de un documento específico
 * @param {number} documentId - ID del documento
 * @returns {Promise<Object>} Información del documento
 */
async function fetchDocument(documentId) {
    return await apiGet(API_ENDPOINTS.documents.show(documentId));
}

/**
 * Obtiene URL de descarga firmada para un documento (válida por 5 minutos)
 * @param {number} documentId - ID del documento
 * @returns {Promise<Object>} URL de descarga firmada
 */
async function getDocumentDownloadUrl(documentId) {
    return await apiGet(API_ENDPOINTS.documents.downloadUrl(documentId));
}
