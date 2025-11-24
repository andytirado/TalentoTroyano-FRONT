document.addEventListener('DOMContentLoaded', async function() {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.STUDENT);

    console.log('homeuser.js: Script cargado');

    // --- Variables Globales ---
    let allVacancies = []; // Almacena todas las vacantes cargadas
    let displayedVacancies = []; // Vacantes filtradas que se deben mostrar
    let displayedCount = 0; // Contador de vacantes mostradas actualmente
    let selectedVacancyId = null; // ID de la vacante seleccionada
    let isLoadingMore = false; // Bandera para evitar múltiples cargas simultáneas
    let currentUserId = null; // ID del usuario actual

    const VACANCIES_PER_LOAD = 5; // Número de vacantes a cargar cada vez

    // --- Selectores de Elementos ---

    // Vistas del panel derecho
    const vistaInicio = document.getElementById('detalle-inicio');
    const vistaCompleta = document.getElementById('detalle-completo');
    const vistaExito = document.getElementById('detalle-exito');

    // Contenedor de ofertas
    const ofertasContainer = document.querySelector('.ofertas');

    // Botones
    const btnAplicar = document.getElementById('btn-aplicar');
    const btnVolver = document.getElementById('btn-volver');

    // Filtros
    const inputBusqueda = document.getElementById('busqueda');
    const selectFiltroModalidad = document.getElementById('filtro');
    const selectFiltroCarrera = document.getElementById('filtro-carrera');

    // --- Cargar Usuario y Vacantes al Iniciar ---
    await loadCurrentUser();
    await loadVacancies();

    // --- Event Listener para Infinite Scroll ---
    ofertasContainer.addEventListener('scroll', () => {
        // Detectar si el usuario está cerca del final del scroll (50px antes del final)
        const { scrollTop, scrollHeight, clientHeight } = ofertasContainer;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadMoreVacancies();
        }
    });

    // --- Funciones Principales ---

    /**
     * Carga los datos del usuario actual
     */
    async function loadCurrentUser() {
        try {
            console.log('Cargando datos del usuario actual...');
            const response = await fetchCurrentUser();

            console.log('Respuesta completa de fetchCurrentUser:', response);
            console.log('response.success:', response.success);
            console.log('response.data:', response.data);

            if (response.success && response.data) {
                console.log('Tipo de response.data:', typeof response.data, 'Es array:', Array.isArray(response.data));

                const userData = response.data.data || response.data.user || response.data;
                console.log('userData extraído:', userData);

                // El backend devuelve 'idUser' como nombre del campo
                currentUserId = userData.idUser || userData.usId || userData.id;
                console.log('Usuario cargado. ID:', currentUserId);

                if (!currentUserId) {
                    console.error('⚠️ ADVERTENCIA: No se pudo extraer el ID del usuario');
                    console.error('Estructura completa de userData:', JSON.stringify(userData, null, 2));
                }
            } else {
                console.error('Error al cargar usuario. response.success:', response.success);
                console.error('Error message:', response.message);
                console.error('Respuesta completa:', JSON.stringify(response, null, 2));
            }
        } catch (error) {
            console.error('Error al cargar usuario:', error);
        }
    }

    /**
     * Carga todas las vacantes desde la API
     */
    async function loadVacancies() {
        try {
            console.log('Cargando vacantes desde la API...');

            const response = await fetchVacancies();

            console.log('Respuesta completa de fetchVacancies:', response);

            if (response.success && response.data) {
                // El backend devuelve: { success: true, vacantes: [...], pagination: {...} }
                let vacanciesData = response.data.vacantes || response.data.data || response.data;

                console.log('Datos de vacantes extraídos:', vacanciesData);
                console.log('Tipo de datos:', typeof vacanciesData, 'Es array:', Array.isArray(vacanciesData));

                // Asegurarnos de que sea un array
                if (!Array.isArray(vacanciesData)) {
                    console.error('Los datos de vacantes no son un array:', vacanciesData);
                    showErrorMessage('Error: formato de datos inesperado del servidor');
                    return;
                }

                allVacancies = vacanciesData;

                console.log(`${allVacancies.length} vacantes cargadas`);

                renderVacancies(allVacancies);
            } else {
                console.error('Error al cargar vacantes:', response.message);
                showErrorMessage('No se pudieron cargar las vacantes. Por favor, intenta más tarde.');
            }
        } catch (error) {
            console.error('Error al cargar vacantes:', error);
            showErrorMessage('Error de conexión al cargar las vacantes.');
        }
    }

    /**
     * Renderiza las vacantes en el sidebar (carga inicial)
     * @param {Array} vacancies - Array de vacantes a renderizar
     */
    function renderVacancies(vacancies) {
        // Limpiar el contenedor
        ofertasContainer.innerHTML = '';
        displayedVacancies = vacancies;
        displayedCount = 0;

        if (vacancies.length === 0) {
            ofertasContainer.innerHTML = '<p style="padding: 1rem; color: #666; text-align: center;">No se encontraron vacantes</p>';
            return;
        }

        // Cargar las primeras vacantes
        loadMoreVacancies();
    }

    /**
     * Carga más vacantes al hacer scroll (carga progresiva)
     */
    function loadMoreVacancies() {
        if (isLoadingMore) return; // Evitar múltiples cargas simultáneas
        if (displayedCount >= displayedVacancies.length) return; // No hay más vacantes

        isLoadingMore = true;

        // Calcular cuántas vacantes mostrar
        const endIndex = Math.min(displayedCount + VACANCIES_PER_LOAD, displayedVacancies.length);
        const vacanciesToShow = displayedVacancies.slice(displayedCount, endIndex);

        console.log(`Mostrando vacantes ${displayedCount + 1} a ${endIndex} de ${displayedVacancies.length}`);

        // Renderizar las nuevas vacantes
        vacanciesToShow.forEach(vacancy => {
            const ofertaElement = createVacancyElement(vacancy);
            ofertasContainer.appendChild(ofertaElement);
        });

        displayedCount = endIndex;

        // Agregar event listeners a las nuevas ofertas
        attachVacancyClickListeners();

        // Mostrar indicador si hay más vacantes
        if (displayedCount < displayedVacancies.length) {
            showLoadMoreIndicator();
        } else {
            removeLoadMoreIndicator();
        }

        isLoadingMore = false;
    }

    /**
     * Muestra un indicador de que hay más vacantes
     */
    function showLoadMoreIndicator() {
        // Eliminar indicador existente si lo hay
        removeLoadMoreIndicator();

        const indicator = document.createElement('div');
        indicator.id = 'load-more-indicator';
        indicator.style.cssText = 'padding: 1rem; text-align: center; color: #666; font-size: 0.9rem;';
        indicator.textContent = `Mostrando ${displayedCount} de ${displayedVacancies.length} vacantes. Scroll para ver más...`;
        ofertasContainer.appendChild(indicator);
    }

    /**
     * Elimina el indicador de cargar más
     */
    function removeLoadMoreIndicator() {
        const indicator = document.getElementById('load-more-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    /**
     * Crea un elemento HTML para una vacante
     * @param {Object} vacancy - Objeto de vacante
     * @returns {HTMLElement} Elemento div de la oferta
     */
    function createVacancyElement(vacancy) {
        const div = document.createElement('div');
        div.className = 'oferta';
        div.dataset.id = vacancy.id;

        // El backend devuelve campos en inglés: title, companyName, salary, location, etc.
        div.dataset.titulo = vacancy.title || vacancy.titulo || '';
        div.dataset.empresa = vacancy.companyName || vacancy.empresa || '';
        div.dataset.modalidad = vacancy.location || vacancy.ubicacion || vacancy.modalidad || '';
        div.dataset.tipo = vacancy.type || vacancy.tipo || '';
        div.dataset.estado = vacancy.status || vacancy.estado || '';

        // Formatear salario si existe
        let salarioTexto = '';
        if (vacancy.salary_min && vacancy.salary_max) {
            salarioTexto = `$${vacancy.salary_min.toLocaleString()} - $${vacancy.salary_max.toLocaleString()}`;
        } else if (vacancy.salary) {
            salarioTexto = `$${parseFloat(vacancy.salary).toLocaleString()}`;
        } else if (vacancy.salario) {
            salarioTexto = `$${parseFloat(vacancy.salario).toLocaleString()}`;
        }

        div.innerHTML = `
            <div class="oferta-header">
                <h3>${vacancy.title || vacancy.titulo || 'Sin título'}</h3>
                ${salarioTexto ? `<span class="precio">${salarioTexto}</span>` : ''}
            </div>
            <p class="oferta-sub">${vacancy.companyName || vacancy.empresa || 'Empresa no especificada'}</p>
            <p class="oferta-sub">${vacancy.location || vacancy.ubicacion || vacancy.modalidad || 'No especificado'}</p>
        `;

        return div;
    }

    /**
     * Agrega event listeners a todas las ofertas
     */
    function attachVacancyClickListeners() {
        const ofertas = document.querySelectorAll('.oferta');

        ofertas.forEach(oferta => {
            oferta.addEventListener('click', async function() {
                const vacancyId = this.dataset.id;
                await showVacancyDetails(vacancyId);

                // Resalta la oferta activa
                ofertas.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    /**
     * Renderiza los detalles de una vacante en el panel lateral
     * @param {Object} vacancy - Objeto con los datos de la vacante
     */
    function renderVacancyDetailsInPanel(vacancy) {
        // Extraer datos según los nombres de campos del backend
        const titulo = vacancy.title || vacancy.titulo || 'Sin título';
        const empresa = vacancy.companyName || vacancy.company_name || vacancy.empresa || 'Empresa no especificada';
        const descripcion = vacancy.description || vacancy.descripcion || 'Sin descripción disponible';

        // Tipo de contratación
        const tipo = vacancy.typeContract || vacancy.type || vacancy.tipo || 'No especificado';

        // Horario
        const horario = vacancy.schedule || vacancy.horario || 'No especificado';

        // Ubicación
        const ubicacion = vacancy.location || vacancy.ubicacion || 'No especificado';

        // Modalidad
        const modalidadMap = {
            1: 'Presencial',
            2: 'Remoto',
            3: 'Híbrido'
        };
        const modalidad = vacancy.modality ? modalidadMap[vacancy.modality] || `Modalidad ${vacancy.modality}` : 'No especificado';

        // Salario
        let salarioTexto = 'No especificado';
        if (vacancy.salary_min && vacancy.salary_max) {
            salarioTexto = `$${vacancy.salary_min.toLocaleString()} - $${vacancy.salary_max.toLocaleString()} MXN`;
        } else if (vacancy.salary) {
            salarioTexto = `$${parseFloat(vacancy.salary).toLocaleString()} MXN`;
        } else if (vacancy.salario) {
            salarioTexto = `$${parseFloat(vacancy.salario).toLocaleString()} MXN`;
        }

        // Programa/Carrera
        const programaMap = {
            1: 'Ingeniería de Software',
            2: 'Ingeniería en Computación',
            3: 'Ciencias de la Computación',
            4: 'Sistemas Computacionales',
            5: 'Tecnologías de la Información'
        };
        const programa = vacancy.program ? programaMap[vacancy.program] || `Programa ${vacancy.program}` : 'No especificado';

        // Requisitos
        let requisitosHTML = '';
        const requisitos = vacancy.requirements || vacancy.requisitos;
        if (requisitos) {
            if (typeof requisitos === 'string') {
                requisitosHTML = requisitos.replace(/\n/g, '<br>');
            } else if (Array.isArray(requisitos)) {
                requisitosHTML = requisitos.map(req => `• ${req}`).join('<br>');
            }
        }

        // Fecha límite
        let fechaLimiteHTML = '';
        const vacDate = vacancy.vacDate || vacancy.fecha_limite || vacancy.deadline;
        if (vacDate) {
            let fecha;
            if (vacDate.includes('-')) {
                const parts = vacDate.split('-');
                if (parts.length === 3) {
                    const day = parts[0];
                    const month = parts[1];
                    const year = parts[2].length === 2 ? '20' + parts[2] : parts[2];
                    fecha = new Date(`${year}-${month}-${day}`);
                } else {
                    fecha = new Date(vacDate);
                }
            } else {
                fecha = new Date(vacDate);
            }

            if (!isNaN(fecha.getTime())) {
                fechaLimiteHTML = `<p><strong>Fecha límite:</strong> ${fecha.toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}</p>`;
            }
        }

        // Actualizar el título y empresa
        document.getElementById('detalle-titulo').textContent = titulo;
        document.getElementById('detalle-empresa').innerHTML = `<strong>Empresa:</strong> ${empresa}`;

        // Actualizar información de modalidad y ubicación
        let infoHTML = `
            <strong>Contratación:</strong> ${tipo}<br>
            ${horario !== 'No especificado' ? `<strong>Horario:</strong> ${horario}<br>` : ''}
            <strong>Modalidad:</strong> ${modalidad}<br>
            <strong>Ubicación:</strong> ${ubicacion}<br>
            <strong>Salario:</strong> ${salarioTexto}<br>
            <strong>Programa:</strong> ${programa}
        `;
        document.getElementById('detalle-modalidad').innerHTML = infoHTML;

        // Limpiar el salario (ya está en modalidad)
        const salarioElement = document.getElementById('detalle-salario');
        if (salarioElement) {
            salarioElement.innerHTML = '';
        }

        // Actualizar la descripción con formato completo
        let descripcionHTML = `
            <p><strong>Descripción:</strong><br>${descripcion}</p>
            ${requisitosHTML ? `<p style="margin-top: 1rem;"><strong>Requisitos:</strong><br>${requisitosHTML}</p>` : ''}
            ${fechaLimiteHTML ? `<div style="margin-top: 1rem;">${fechaLimiteHTML}</div>` : ''}
        `;
        document.getElementById('detalle-descripcion').innerHTML = descripcionHTML;
    }

    /**
     * Carga y muestra los detalles completos de una vacante
     * @param {number} vacancyId - ID de la vacante
     */
    async function showVacancyDetails(vacancyId) {
        try {
            console.log('Cargando detalles de vacante:', vacancyId);

            // Mostrar loading en el panel derecho
            vistaInicio.style.display = 'none';
            vistaExito.style.display = 'none';
            vistaCompleta.style.display = 'flex';
            document.getElementById('detalle-titulo').textContent = 'Cargando...';

            // Cargar detalles completos desde la API
            const response = await fetchVacancy(vacancyId);

            if (response.success && response.data) {
                // El backend puede devolver: { vacante: {...} } o directamente el objeto
                const vacancy = response.data.vacante || response.data.data || response.data;
                selectedVacancyId = vacancyId;

                console.log('Detalle de vacante:', vacancy);

                // Renderizar los detalles con el mismo formato que verDetallesVacante.js
                renderVacancyDetailsInPanel(vacancy);

                console.log('Detalles de vacante cargados correctamente');
            } else {
                console.error('Error al cargar detalles:', response.message);
                showAppNotification('Error al cargar los detalles de la vacante');
                irAlInicio();
            }
        } catch (error) {
            console.error('Error al cargar detalles de vacante:', error);
            alert('Error de conexión al cargar los detalles');
            irAlInicio();
        }
    }

    /**
     * Aplica a la vacante seleccionada
     */
    async function aplicarAVacante() {
        if (!selectedVacancyId) {
            alert('Por favor, selecciona una vacante');
            return;
        }

        if (!currentUserId) {
            alert('Error: No se pudo obtener tu información de usuario. Por favor, recarga la página.');
            return;
        }

        try {
            console.log('Aplicando a vacante:', selectedVacancyId);
            console.log('Usuario ID:', currentUserId);

            // Deshabilitar botón mientras se procesa
            btnAplicar.disabled = true;
            btnAplicar.textContent = 'Aplicando...';

            // Aplicar a la vacante usando el endpoint correcto
            const response = await applyToVacancy(selectedVacancyId, {
                idUser: currentUserId,
                // Puedes agregar carta_presentacion y documento_id aquí si lo necesitas
                // carta_presentacion: "...",
                // documento_id: 123
            });

            console.log('Respuesta de aplicación:', response);

            if (response.success) {
                console.log('Postulación exitosa');

                // Mostrar pantalla de éxito
                vistaCompleta.style.display = 'none';
                vistaExito.style.display = 'flex';
            } else {
                console.error('Error al aplicar:', response.message);
                console.error('Errores de validación:', response.errors);

                // Mostrar mensaje de error más específico
                if (response.message && response.message.includes('Ya has aplicado')) {
                    showAppNotification('Ya has aplicado a esta vacante anteriormente');
                } else {
                    // Mostrar errores de validación si existen
                    let errorMessage = 'Error al aplicar a la vacante: ' + (response.message || 'Error desconocido');
                    if (response.errors) {
                        errorMessage += '\n\nDetalles:\n';
                        for (const [field, messages] of Object.entries(response.errors)) {
                            errorMessage += `- ${field}: ${messages.join(', ')}\n`;
                        }
                    }
                    alert(errorMessage);
                }
            }
        } catch (error) {
            console.error('Error al aplicar a vacante:', error);
            alert('Error de conexión al aplicar a la vacante');
        } finally {
            // Rehabilitar botón
            btnAplicar.disabled = false;
            btnAplicar.textContent = 'Aplicar';
        }
    }

    /**
     * Vuelve a la vista inicial
     */
    function irAlInicio() {
        vistaCompleta.style.display = 'none';
        vistaExito.style.display = 'none';
        vistaInicio.style.display = 'flex';

        // Quita la selección de la lista
        const ofertas = document.querySelectorAll('.oferta');
        ofertas.forEach(o => o.classList.remove('active'));

        selectedVacancyId = null;
    }

    /**
     * Muestra un mensaje de error en el contenedor de ofertas
     * @param {string} message - Mensaje de error
     */
    function showErrorMessage(message) {
        ofertasContainer.innerHTML = `<p style="padding: 1rem; color: #d9534f; text-align: center;">${message}</p>`;
    }

    // --- Lógica de Filtros ---

    /**
     * Normaliza un texto para comparación (sin acentos, sin espacios extras, minúsculas)
     */
    function normalizeText(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
            .replace(/\s+/g, ' ') // Normalizar espacios
            .trim();
    }

    /**
     * Filtra las vacantes según los criterios seleccionados
     */
    function filtrarOfertas() {
        const texto = inputBusqueda.value.toLowerCase();
        const modalidadFiltro = selectFiltroModalidad.value;
        const carreraFiltro = normalizeText(selectFiltroCarrera.value);

        console.log('Filtros aplicados:', { texto, modalidadFiltro, carreraFiltro });
        console.log('Ejemplo de vacante del listado:', allVacancies[0]);

        // IMPORTANTE: El listado de vacantes NO incluye los campos modality y program
        // Solo vienen: id, title, company, companyName, companyImage, location, salary, vacDate
        // Por lo tanto, los filtros de modalidad y carrera NO funcionarán hasta que el backend
        // incluya estos campos en el endpoint de listado

        // Filtrar el array completo de vacantes
        const vacantesFiltradas = allVacancies.filter(vacancy => {
            const titulo = (vacancy.title || vacancy.titulo || '').toLowerCase();
            const empresa = (vacancy.companyName || vacancy.empresa || '').toLowerCase();
            const ubicacion = (vacancy.location || vacancy.ubicacion || '').toLowerCase();

            // 1. Filtro de texto (búsqueda por título, empresa o ubicación)
            const coincideTexto = !texto ||
                                  titulo.includes(texto) ||
                                  empresa.includes(texto) ||
                                  ubicacion.includes(texto);

            // 2. Filtro de modalidad
            // NOTA: El campo 'modality' NO viene en el listado, solo en el detalle
            // Por ahora, deshabilitado hasta que el backend lo incluya
            let coincideModalidad = true;
            if (modalidadFiltro && vacancy.modality !== undefined) {
                const modalidadMap = {
                    1: 'Presencial',
                    2: 'Remoto',
                    3: 'Híbrido'
                };
                const modalidadVacante = modalidadMap[vacancy.modality] || '';
                coincideModalidad = modalidadVacante === modalidadFiltro;
            } else if (modalidadFiltro) {
                // Si hay filtro pero no hay dato, mostrar advertencia
                console.warn('⚠️ El filtro de modalidad no funciona porque el campo "modality" no viene en el listado de vacantes');
            }

            // 3. Filtro de carrera/programa
            // NOTA: El campo 'program' NO viene en el listado, solo en el detalle
            // Por ahora, deshabilitado hasta que el backend lo incluya
            let coincideCarrera = true;
            if (carreraFiltro && vacancy.program !== undefined) {
                const programaMap = {
                    1: 'ingenieria de software',
                    2: 'ingenieria en computacion',
                    3: 'ciencias de la computacion',
                    4: 'sistemas computacionales',
                    5: 'tecnologias de la informacion'
                };
                const programaVacante = normalizeText(programaMap[vacancy.program] || '');
                coincideCarrera = programaVacante === carreraFiltro;
            } else if (carreraFiltro) {
                // Si hay filtro pero no hay dato, mostrar advertencia
                console.warn('⚠️ El filtro de carrera no funciona porque el campo "program" no viene en el listado de vacantes');
            }

            // La vacante se incluye si cumple TODOS los filtros
            return coincideTexto && coincideModalidad && coincideCarrera;
        });

        console.log(`Filtro aplicado: ${vacantesFiltradas.length} vacantes de ${allVacancies.length}`);

        // Si se aplicaron filtros que no tienen datos, mostrar mensaje al usuario
        if ((modalidadFiltro || carreraFiltro) && vacantesFiltradas.length === allVacancies.length) {
            console.warn('⚠️ Los filtros de modalidad y carrera están seleccionados pero no filtran porque esos campos no vienen en el listado de vacantes. Necesitas actualizar el backend para incluir "modality" y "program" en VacanteListResource.php');
        }

        // Re-renderizar con las vacantes filtradas
        renderVacancies(vacantesFiltradas);
    }

    // --- Event Listeners ---

    // Aplicar a vacante
    btnAplicar.addEventListener('click', aplicarAVacante);

    // Volver al inicio desde éxito
    btnVolver.addEventListener('click', irAlInicio);

    // Asignar listeners a los filtros
    inputBusqueda.addEventListener('input', filtrarOfertas);
    selectFiltroModalidad.addEventListener('change', filtrarOfertas);
    selectFiltroCarrera.addEventListener('change', filtrarOfertas);

    // Logo principal (si existe)
    const logoPrincipal = document.getElementById('logo-principal');
    if (logoPrincipal) {
        logoPrincipal.addEventListener('click', irAlInicio);
    }
});
