document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.COMPANY);

    console.log('vacantesFinalizadas.js: Script cargado');

    // Variables globales
    let allVacancies = [];
    const userData = getUserData();
    const idCompany = userData?.idCompany;

    // Contenedor de vacantes
    const vacantesContainer = document.querySelector('.vacantes-lista');
    const searchInput = document.querySelector('.search-input');

    // Cargar vacantes al iniciar
    await loadVacancies();

    // Event listener para búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', filtrarVacantes);
    }

    /**
     * Carga las vacantes finalizadas de la empresa desde la API
     */
    async function loadVacancies() {
        try {
            console.log('Cargando vacantes finalizadas de la empresa:', idCompany);

            if (!idCompany) {
                showErrorMessage('No se pudo obtener el ID de la empresa');
                return;
            }

            const response = await fetchVacancies();

            if (response.success && response.data) {
                let vacanciesData = response.data.vacantes || response.data.data || response.data;

                if (!Array.isArray(vacanciesData)) {
                    console.error('Los datos de vacantes no son un array:', vacanciesData);
                    showErrorMessage('Error: formato de datos inesperado del servidor');
                    return;
                }

                // Filtrar solo las vacantes finalizadas de esta empresa
                allVacancies = vacanciesData.filter(v =>
                    v.company === idCompany &&
                    (v.status === 'finalizada' || v.status === 'finished' || v.status === 'closed' || v.vacStatus === 0)
                );

                console.log(`${allVacancies.length} vacantes finalizadas cargadas`);

                renderVacancies(allVacancies);
            } else {
                console.error('Error al cargar vacantes:', response.message);
                showErrorMessage('No se pudieron cargar las vacantes');
            }
        } catch (error) {
            console.error('Error al cargar vacantes:', error);
            showErrorMessage('Error de conexión al cargar las vacantes');
        }
    }

    /**
     * Renderiza las vacantes en el contenedor
     */
    function renderVacancies(vacancies) {
        if (!vacantesContainer) return;

        vacantesContainer.innerHTML = '';

        if (vacancies.length === 0) {
            vacantesContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">No hay vacantes finalizadas</p>
                    <p>Las vacantes finalizadas aparecerán aquí</p>
                </div>
            `;
            return;
        }

        vacancies.forEach(vacancy => {
            const card = createVacancyCard(vacancy);
            vacantesContainer.appendChild(card);
        });
    }

    /**
     * Crea una tarjeta HTML para una vacante
     */
    function createVacancyCard(vacancy) {
        const div = document.createElement('div');
        div.className = 'vacante-card';

        const titulo = vacancy.title || vacancy.titulo || 'Sin título';
        const empresa = vacancy.companyName || vacancy.company_name || userData?.compName || 'Empresa';

        div.innerHTML = `
            <div class="vacante-info">
                <h4>${titulo}</h4>
                <p>${empresa}</p>
            </div>
            <div class="vacante-actions">
                <button class="btn-accion-vacante" data-id="${vacancy.id}" data-action="ver" title="Ver Detalles">
                    👁️
                </button>
                <button class="btn-accion-vacante" data-id="${vacancy.id}" data-action="clonar" title="Clonar Vacante">
                    📋
                </button>
            </div>
        `;

        // Agregar event listeners a los botones
        div.querySelectorAll('.btn-accion-vacante').forEach(btn => {
            btn.addEventListener('click', () => handleVacancyAction(btn.dataset.id, btn.dataset.action));
        });

        return div;
    }

    /**
     * Maneja las acciones sobre una vacante
     */
    function handleVacancyAction(vacancyId, action) {
        console.log(`Acción: ${action}, Vacante ID: ${vacancyId}`);

        switch(action) {
            case 'ver':
                window.location.href = `verDetallesVacante.php?id=${vacancyId}`;
                break;
            case 'clonar':
                clonarVacante(vacancyId);
                break;
            default:
                console.warn('Acción no reconocida:', action);
        }
    }

    /**
     * Clona una vacante
     */
    async function clonarVacante(vacancyId) {
        const confirmar = confirm('¿Deseas crear una nueva vacante basada en esta?');
        if (!confirmar) return;

        try {
            console.log('Clonando vacante:', vacancyId);
            alert('Funcionalidad pendiente de implementar en el backend');

            // Aquí iría la lógica para clonar la vacante
            // Podría redirigir a la página de crear vacante con los datos pre-llenados
        } catch (error) {
            console.error('Error al clonar vacante:', error);
            alert('Error al clonar la vacante');
        }
    }

    /**
     * Filtra las vacantes según el texto de búsqueda
     */
    function filtrarVacantes() {
        const texto = searchInput.value.toLowerCase().trim();

        if (!texto) {
            renderVacancies(allVacancies);
            return;
        }

        const vacantesFiltradas = allVacancies.filter(vacancy => {
            const titulo = (vacancy.title || vacancy.titulo || '').toLowerCase();
            const empresa = (vacancy.companyName || vacancy.company_name || '').toLowerCase();

            return titulo.includes(texto) || empresa.includes(texto);
        });

        renderVacancies(vacantesFiltradas);
    }

    /**
     * Muestra un mensaje de error
     */
    function showErrorMessage(mensaje) {
        if (!vacantesContainer) return;

        vacantesContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #d65a5a;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">⚠️ ${mensaje}</p>
                <button class="btn" onclick="location.reload()">Recargar</button>
            </div>
        `;
    }
});