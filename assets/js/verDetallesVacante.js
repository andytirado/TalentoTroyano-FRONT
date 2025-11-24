document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.STUDENT);

    console.log("Página de Detalles de Vacante cargada.");

    // Obtener ID de la vacante desde URL (query parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const vacancyId = urlParams.get('id');

    // Contenedor de detalles
    const detallesContainer = document.getElementById('detalles-vacante');

    if (vacancyId) {
        await loadVacancyDetails(vacancyId);
    } else {
        console.error("No se proporcionó ID de vacante");
        showError("No se proporcionó el ID de la vacante");
    }

    /**
     * Carga los detalles de la vacante desde el backend
     * @param {number|string} id - ID de la vacante
     */
    async function loadVacancyDetails(id) {
        try {
            console.log('Cargando detalles de vacante:', id);

            // Mostrar estado de carga
            detallesContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Cargando detalles de la vacante...</p>';

            const response = await fetchVacancy(id);

            console.log('Respuesta completa de fetchVacancy:', response);

            if (response.success && response.data) {
                // El backend puede devolver: { vacante: {...} } o directamente el objeto
                const vacancy = response.data.vacante || response.data.data || response.data;

                console.log('Detalles de vacante:', vacancy);

                renderVacancyDetails(vacancy);
            } else {
                console.error('Error al cargar detalles:', response.message);
                showError('No se pudieron cargar los detalles de la vacante');
            }
        } catch (error) {
            console.error('Error al cargar detalles de vacante:', error);
            showError('Error de conexión al cargar los detalles de la vacante');
        }
    }

    /**
     * Renderiza los detalles de la vacante en el HTML
     * @param {Object} vacancy - Objeto con los datos de la vacante
     */
    function renderVacancyDetails(vacancy) {
        console.log('Renderizando detalles de vacante:', vacancy);

        // Extraer datos según los nombres de campos del backend
        const titulo = vacancy.title || vacancy.titulo || 'Sin título';

        // El backend ahora devuelve companyName además del ID
        const empresa = vacancy.companyName || vacancy.company_name || vacancy.empresa || 'Empresa no especificada';

        const descripcion = vacancy.description || vacancy.descripcion || 'Sin descripción disponible';

        // Tipo de contratación - el backend usa 'typeContract'
        const tipo = vacancy.typeContract || vacancy.type || vacancy.tipo || 'No especificado';

        // Horario
        const horario = vacancy.schedule || vacancy.horario || 'No especificado';

        // Ubicación - el backend usa 'location' (string)
        const ubicacion = vacancy.location || vacancy.ubicacion || 'No especificado';

        // Modalidad - el backend devuelve 'modality' como número
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

        // Programa/Carrera - el backend devuelve 'program' como número
        const programaMap = {
            1: 'Ingeniería de Software',
            2: 'Ingeniería en Computación',
            3: 'Ciencias de la Computación',
            4: 'Sistemas Computacionales',
            5: 'Tecnologías de la Información'
        };
        const programa = vacancy.program ? programaMap[vacancy.program] || `Programa ${vacancy.program}` : 'No especificado';

        // Requisitos - el backend devuelve requirements como string con saltos de línea
        let requisitosHTML = '';
        const requisitos = vacancy.requirements || vacancy.requisitos;
        if (requisitos) {
            if (typeof requisitos === 'string') {
                // Convertir saltos de línea a <br> y mantener el formato
                requisitosHTML = requisitos.replace(/\n/g, '<br>');
            } else if (Array.isArray(requisitos)) {
                requisitosHTML = requisitos.map(req => `• ${req}`).join('<br>');
            }
        }

        // Fecha límite - el backend usa 'vacDate' en formato DD-MM-YY
        let fechaLimiteTexto = '';
        const vacDate = vacancy.vacDate || vacancy.fecha_limite || vacancy.deadline;
        if (vacDate) {
            // Intentar parsear el formato DD-MM-YY
            let fecha;
            if (vacDate.includes('-')) {
                const parts = vacDate.split('-');
                if (parts.length === 3) {
                    // Formato DD-MM-YY
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
                fechaLimiteTexto = `
                    <p>
                        <strong>Fecha límite:</strong> ${fecha.toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                `;
            }
        }

        // Renderizar el HTML
        detallesContainer.innerHTML = `
            <h3>${titulo}</h3>
            <p><strong>Empresa:</strong> ${empresa}</p>

            <p>
                <strong>Contratación:</strong> ${tipo}<br>
                ${horario !== 'No especificado' ? `<strong>Horario:</strong> ${horario}<br>` : ''}
                <strong>Modalidad:</strong> ${modalidad}<br>
                <strong>Ubicación:</strong> ${ubicacion}<br>
                <strong>Salario:</strong> ${salarioTexto}<br>
                <strong>Programa:</strong> ${programa}
            </p>

            <p>
                <strong>Descripción:</strong><br>
                ${descripcion}
            </p>

            ${requisitosHTML ? `
                <p>
                    <strong>Requisitos:</strong><br>
                    ${requisitosHTML}
                </p>
            ` : ''}

            ${fechaLimiteTexto}
        `;

        console.log('Detalles de vacante renderizados correctamente');
    }

    /**
     * Muestra un mensaje de error en el contenedor
     * @param {string} mensaje - Mensaje de error
     */
    function showError(mensaje) {
        detallesContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #d65a5a;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">⚠️ ${mensaje}</p>
                <button class="btn" onclick="location.reload()">Recargar</button>
            </div>
        `;
    }

});
