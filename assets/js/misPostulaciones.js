document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.STUDENT);

    console.log('misPostulaciones.js: Script cargado');

    // --- Variables Globales ---
    let currentUserId = null;
    let allApplications = []; // Todas las postulaciones del usuario

    // --- Selectores de Elementos ---
    const postulacionesContainer = document.querySelector('.postulacion-lista');
    const inputBusqueda = document.querySelector('.input-filtros');

    // --- Cargar Usuario y Postulaciones al Iniciar ---
    await loadCurrentUser();
    if (currentUserId) {
        await loadApplications();
    }

    // --- Event Listeners ---

    // Búsqueda en tiempo real
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', filtrarPostulaciones);
    }

    // --- Funciones Principales ---

    /**
     * Carga los datos del usuario actual
     */
    async function loadCurrentUser() {
        try {
            console.log('Cargando datos del usuario actual...');
            const response = await fetchCurrentUser();

            if (response.success && response.data) {
                const userData = response.data.data || response.data.user || response.data;
                currentUserId = userData.idUser || userData.usId || userData.id;
                console.log('Usuario cargado. ID:', currentUserId);
            } else {
                console.error('Error al cargar usuario:', response.message);
                showErrorMessage('No se pudo obtener la información del usuario');
            }
        } catch (error) {
            console.error('Error al cargar usuario:', error);
            showErrorMessage('Error de conexión al cargar el usuario');
        }
    }

    /**
     * Carga las postulaciones del usuario
     */
    async function loadApplications() {
        try {
            console.log('Cargando postulaciones del usuario:', currentUserId);

            const response = await fetchUserApplications(currentUserId);

            console.log('Respuesta completa de fetchUserApplications:', response);

            if (response.success) {
                // El backend devuelve: { success: true, postulations: [...], total: 2 }
                // Intentar múltiples estructuras posibles
                allApplications = response.data?.postulations ||
                                 response.data?.data ||
                                 response.data ||
                                 response.postulations ||
                                 [];

                console.log('Postulaciones cargadas:', allApplications);

                if (!Array.isArray(allApplications)) {
                    console.error('Las postulaciones no son un array:', response);
                    showErrorMessage('Error: formato de datos inesperado del servidor');
                    return;
                }

                console.log(`${allApplications.length} postulaciones cargadas`);

                renderApplications(allApplications);
            } else {
                console.error('Error al cargar postulaciones:', response.message);
                showErrorMessage('No se pudieron cargar las postulaciones');
            }
        } catch (error) {
            console.error('Error al cargar postulaciones:', error);
            showErrorMessage('Error de conexión al cargar las postulaciones');
        }
    }

    /**
     * Renderiza las postulaciones en el contenedor
     * @param {Array} applications - Array de postulaciones
     */
    function renderApplications(applications) {
        // Limpiar el contenedor
        postulacionesContainer.innerHTML = '';

        if (applications.length === 0) {
            postulacionesContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">No tienes postulaciones aún</p>
                    <p>Explora las vacantes disponibles y aplica a las que te interesen</p>
                    <a href="homeuser.php" class="btn" style="margin-top: 1.5rem; display: inline-block;">Ver Vacantes</a>
                </div>
            `;
            return;
        }

        // Crear una tarjeta para cada postulación
        applications.forEach(application => {
            const card = createApplicationCard(application);
            postulacionesContainer.appendChild(card);
        });
    }

    /**
     * Crea una tarjeta HTML para una postulación
     * @param {Object} application - Objeto de postulación
     * @returns {HTMLElement} Elemento div de la tarjeta
     */
    function createApplicationCard(application) {
        const div = document.createElement('div');

        // Mapear el estado del backend a las clases CSS
        const statusMap = {
            'pendiente': { class: 'pending', icon: '🕒', text: 'Pendiente' },
            'aceptado': { class: 'accepted', icon: '✔', text: 'Aceptado' },
            'rechazado': { class: 'rejected', icon: '✕', text: 'No Seleccionado' },
            'visto': { class: 'viewed', icon: '👁', text: 'CV Visto' },
        };

        // El backend devuelve "status" directamente (ej: "Pendiente", "Aceptado")
        const estado = application.status ? application.status.toLowerCase() :
                      application.estado ? application.estado.toLowerCase() :
                      'pendiente';
        const statusInfo = statusMap[estado] || statusMap['pendiente'];

        div.className = `postulacion-card status-${statusInfo.class}-bar`;

        // Extraer datos de la vacante
        // El backend devuelve vacanteTitle directamente, no un objeto vacante
        const titulo = application.vacanteTitle ||
                      application.vacante?.titulo ||
                      application.vacante?.title ||
                      'Sin título';

        // El backend ahora devuelve companyName en las postulaciones
        const empresa = application.companyName ||
                       application.company_name ||
                       application.vacante?.empresa ||
                       application.vacante?.companyName ||
                       'Empresa no especificada';

        // Formatear fecha - el backend usa "postDate"
        const fechaPostulacion = application.postDate ||
                                application.created_at ||
                                application.createdAt;
        const fecha = fechaPostulacion ? new Date(fechaPostulacion).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : 'Fecha desconocida';

        // Generar color aleatorio para el avatar
        const colors = ['#336699', '#888', '#cca', '#d65a5a', '#4a7a9f', '#5a8f7b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        div.innerHTML = `
            <div class="job-info">
                <div class="job-avatar" style="background-color: ${randomColor};"></div>
                <div class="job-text">
                    <h4>${titulo}</h4>
                    <p>${empresa}</p>
                    <span>Postulado: ${fecha}</span>
                </div>
            </div>
            <div class="job-status status-${statusInfo.class}">
                <span>${statusInfo.icon}</span> ${statusInfo.text}
            </div>
            <div class="job-actions">
                <a href="verDetallesVacante.php?id=${application.vacante || application.vacante_id}" class="btn btn-secondary btn-accion-card">Ver Detalles</a>
                <button class="btn-user-action" data-id="${application.id}" title="Retirar postulación">✕</button>
            </div>
        `;

        // Agregar event listener al botón de retirar
        const btnRetirar = div.querySelector('.btn-user-action');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => retirarPostulacion(application.id));
        }

        return div;
    }

    /**
     * Filtra las postulaciones según el texto de búsqueda
     */
    function filtrarPostulaciones() {
        const texto = inputBusqueda.value.toLowerCase().trim();

        if (!texto) {
            // Si no hay texto, mostrar todas
            renderApplications(allApplications);
            return;
        }

        // Filtrar por título de vacante o empresa
        const postulacionesFiltradas = allApplications.filter(application => {
            // El backend devuelve vacanteTitle directamente
            const titulo = (application.vacanteTitle ||
                          application.vacante?.titulo ||
                          application.vacante?.title || '').toLowerCase();

            const empresa = (application.companyName ||
                           application.vacante?.empresa ||
                           application.vacante?.companyName || '').toLowerCase();

            return titulo.includes(texto) || empresa.includes(texto);
        });

        console.log(`Filtro aplicado: ${postulacionesFiltradas.length} postulaciones de ${allApplications.length}`);

        renderApplications(postulacionesFiltradas);
    }

    /**
     * Retira/elimina una postulación
     * @param {number} applicationId - ID de la postulación
     */
    async function retirarPostulacion(applicationId) {
        if (!applicationId) {
            alert('No se pudo obtener el ID de la postulación');
            return;
        }

        const confirmar = confirm('¿Estás seguro de que deseas retirar esta postulación?');
        if (!confirmar) return;

        try {
            console.log('Retirando postulación ID:', applicationId);
            console.log('Usuario actual ID:', currentUserId);

            const response = await withdrawApplication(applicationId);

            console.log('Respuesta completa de withdrawApplication:', response);

            if (response.success) {
                alert(response.message || 'Postulación retirada exitosamente');

                // Eliminar del array local
                allApplications = allApplications.filter(app => app.id !== applicationId);

                // Re-renderizar
                renderApplications(allApplications);
            } else {
                console.error('Error al retirar postulación:', response);

                // Mostrar detalles del error si existen
                let errorMsg = response.message || 'Error desconocido';
                if (response.errors && Object.keys(response.errors).length > 0) {
                    console.error('Errores detallados:', response.errors);
                    errorMsg += '\n\nDetalles: ' + JSON.stringify(response.errors);
                }

                alert('Error al retirar la postulación:\n' + errorMsg + '\n\nStatus: ' + response.status);
            }
        } catch (error) {
            console.error('Error al retirar postulación:', error);
            alert('Error de conexión al retirar la postulación: ' + error.message);
        }
    }

    /**
     * Muestra un mensaje de error en el contenedor
     * @param {string} mensaje - Mensaje de error a mostrar
     */
    function showErrorMessage(mensaje) {
        postulacionesContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #d65a5a;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">⚠️ ${mensaje}</p>
                <button class="btn" onclick="location.reload()">Recargar</button>
            </div>
        `;
    }

});
