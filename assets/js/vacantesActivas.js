document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.COMPANY);

    console.log('vacantesActivas.js: Script cargado');

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
     * Carga las vacantes activas de la empresa desde la API
     */
    async function loadVacancies() {
        try {
            console.log('Cargando vacantes activas de la empresa:', idCompany);

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

                // Filtrar solo las vacantes activas de esta empresa
                allVacancies = vacanciesData.filter(v =>
                    v.company === idCompany &&
                    (v.status === 'activa' || v.status === 'active' || v.vacStatus === 1)
                );

                console.log(`${allVacancies.length} vacantes activas cargadas`);

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
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">No hay vacantes activas</p>
                    <p>Crea una nueva vacante desde el dashboard</p>
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
                <button class="btn-accion-vacante" data-id="${vacancy.id}" data-action="editar" title="Editar Vacante">
                    ✏️
                </button>
                <button class="btn-accion-vacante" data-id="${vacancy.id}" data-action="ver" title="Ver Detalles">
                    👁️
                </button>
                <button class="btn-accion-vacante" data-id="${vacancy.id}" data-action="finalizar" title="Finalizar Vacante">
                    ✔️
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
            case 'editar':
                window.location.href = `editarVacante.php?id=${vacancyId}`;
                break;
            case 'ver':
                window.location.href = `verDetallesVacante.php?id=${vacancyId}`;
                break;
            case 'finalizar':
                finalizarVacante(vacancyId);
                break;
            default:
                console.warn('Acción no reconocida:', action);
        }
    }

    /**
     * Finaliza una vacante
     */
    async function finalizarVacante(vacancyId) {
        const confirmar = confirm('¿Estás seguro de que deseas finalizar esta vacante?');
        if (!confirmar) return;

        try {
            // Aquí iría la llamada a la API para cambiar el estado de la vacante
            console.log('Finalizando vacante:', vacancyId);
            alert('Funcionalidad pendiente de implementar en el backend');

            // Recargar vacantes
            await loadVacancies();
        } catch (error) {
            console.error('Error al finalizar vacante:', error);
            alert('Error al finalizar la vacante');
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