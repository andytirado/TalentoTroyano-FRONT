document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.STUDENT);

    // Cargar información del perfil del estudiante desde el backend
    await loadStudentProfile();

    async function loadStudentProfile() {
        try {
            // Consultar datos del usuario desde /api/me
            const response = await fetchCurrentUser();

            if (response.success && response.data) {
                // El backend devuelve: {data: {usName, usLastName, ...}, message: "OK", success: true}
                const userData = response.data.data || response.data.user || response.data;

                // Actualizar foto de perfil
                const perfilFoto = document.getElementById('perfil-foto');
                if (perfilFoto) {
                    if (userData.usProfilePicture) {
                        const fullPhotoUrl = userData.usProfilePicture.startsWith('http')
                            ? userData.usProfilePicture
                            : `${API_BASE_URL.replace('/api', '')}${userData.usProfilePicture}`;
                        perfilFoto.style.backgroundImage = `url('${fullPhotoUrl}')`;
                        perfilFoto.style.backgroundSize = 'cover';
                        perfilFoto.style.backgroundPosition = 'center';
                    } else {
                        // Si no tiene foto, usar iniciales
                        const inicial = (userData.usName || 'U').charAt(0).toUpperCase();
                        perfilFoto.textContent = inicial;
                        perfilFoto.style.backgroundImage = 'none';
                        perfilFoto.style.backgroundColor = '#336699';
                        perfilFoto.style.color = 'white';
                        perfilFoto.style.display = 'flex';
                        perfilFoto.style.alignItems = 'center';
                        perfilFoto.style.justifyContent = 'center';
                        perfilFoto.style.fontSize = '40px';
                        perfilFoto.style.fontWeight = 'bold';
                    }
                }

                // Actualizar nombre en el encabezado del perfil
                const perfilNombre = document.getElementById('perfil-nombre');
                if (perfilNombre) {
                    const nombreCompleto = userData.usLastName
                        ? `${userData.usName} ${userData.usLastName}`
                        : userData.usName || 'Usuario';
                    perfilNombre.textContent = nombreCompleto;
                }

                // Actualizar descripción
                const perfilDescripcion = document.getElementById('perfil-descripcion');
                if (perfilDescripcion) {
                    perfilDescripcion.textContent = userData.usDescription || 'Sin descripción';
                }

                // Actualizar datos personales
                const datoNombreCompleto = document.getElementById('dato-nombre-completo');
                if (datoNombreCompleto) {
                    const nombreCompleto = userData.usLastName
                        ? `${userData.usName} ${userData.usLastName}`
                        : userData.usName || 'No disponible';
                    datoNombreCompleto.textContent = nombreCompleto;
                }

                const datoEmail = document.getElementById('dato-email');
                if (datoEmail) {
                    datoEmail.textContent = userData.usEmail || 'No disponible';
                }

                const datoTelefono = document.getElementById('dato-telefono');
                if (datoTelefono) {
                    datoTelefono.textContent = userData.usPhoneNumber || 'No disponible';
                }

                const datoMatricula = document.getElementById('dato-matricula');
                if (datoMatricula) {
                    datoMatricula.textContent = userData.expedient || 'No disponible';
                }

                const datoFechaNacimiento = document.getElementById('dato-fecha-nacimiento');
                if (datoFechaNacimiento) {
                    if (userData.usBirthday) {
                        // Formatear la fecha de nacimiento
                        const fecha = new Date(userData.usBirthday);
                        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
                        datoFechaNacimiento.textContent = fecha.toLocaleDateString('es-MX', opciones);
                    } else {
                        datoFechaNacimiento.textContent = 'No disponible';
                    }
                }

                // Cargar documentos del usuario (vienen incluidos en /api/me)
                const documentos = userData.documentos || userData.documents || [];
                renderDocuments(documentos);

            } else {
                console.error('Error al cargar el perfil:', response.message);
                alert('Error al cargar los datos del perfil');
            }
        } catch (error) {
            console.error('Error al cargar el perfil del estudiante:', error);
            alert('Error de conexión al cargar el perfil');
        }
    }

    function renderDocuments(documentos) {
        const listaDocumentos = document.getElementById('lista-documentos');
        const mensajeSinDocumentos = document.getElementById('mensaje-sin-documentos');

        if (!listaDocumentos) return;

        // Limpiar el mensaje de carga
        if (mensajeSinDocumentos) {
            mensajeSinDocumentos.remove();
        }

        // Limpiar la lista
        listaDocumentos.innerHTML = '';

        // Verificar si hay documentos
        if (!Array.isArray(documentos) || documentos.length === 0) {
            // Mostrar mensaje y botón para cargar documento
            listaDocumentos.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p style="color: #666; font-style: italic; margin-bottom: 1rem;">No tienes documentos subidos</p>
                    <label for="file-upload-input" class="btn btn-primary" style="cursor: pointer;">
                        <img src="https://api.iconify.design/mdi:upload.svg?color=white" style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;">
                        Cargar CV
                    </label>
                    <input type="file" id="file-upload-input" accept=".pdf,.doc,.docx" style="display: none;">
                    <p id="upload-status" style="margin-top: 1rem; color: #666; font-size: 0.9rem;"></p>
                </div>
            `;

            // Agregar event listener al input de archivo
            const fileInput = document.getElementById('file-upload-input');
            if (fileInput) {
                fileInput.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        await handleDocumentUpload(file);
                    }
                });
            }
            return;
        }

        // Agregar cada documento a la lista
        documentos.forEach(doc => {
            const documentoItem = document.createElement('div');
            documentoItem.className = 'documento-item';

            // Icono del documento
            const icono = document.createElement('img');
            icono.src = 'https://api.iconify.design/mdi:file-pdf-box.svg?color=white';
            icono.className = 'doc-icon';
            icono.alt = 'PDF';

            // Nombre del documento
            const nombre = document.createElement('span');
            nombre.className = 'doc-nombre';
            nombre.textContent = doc.docRoute || doc.original_name || doc.file_name || 'Documento.pdf';

            // Acciones
            const acciones = document.createElement('div');
            acciones.className = 'doc-acciones';

            // Botón de descargar
            const btnDescargar = document.createElement('a');
            btnDescargar.href = '#';
            btnDescargar.className = 'btn-user-action';
            btnDescargar.title = 'Descargar';
            btnDescargar.innerHTML = '<img src="https://api.iconify.design/mdi:download-outline.svg?color=white">';
            btnDescargar.addEventListener('click', async (e) => {
                e.preventDefault();
                await downloadDocument(doc.idDocument);
            });

            // Botón de eliminar (opcional)
            const btnEliminar = document.createElement('a');
            btnEliminar.href = '#';
            btnEliminar.className = 'btn-user-action';
            btnEliminar.title = 'Eliminar';
            btnEliminar.innerHTML = '<img src="https://api.iconify.design/mdi:delete-outline.svg?color=white">';
            btnEliminar.addEventListener('click', async (e) => {
                e.preventDefault();
                if (confirm('¿Estás seguro de que deseas eliminar este documento?')) {
                    await removeDocument(doc.idDocument);
                }
            });

            acciones.appendChild(btnDescargar);
            acciones.appendChild(btnEliminar);

            documentoItem.appendChild(icono);
            documentoItem.appendChild(nombre);
            documentoItem.appendChild(acciones);

            listaDocumentos.appendChild(documentoItem);
        });

        // VALIDACIÓN: Solo mostrar mensaje informativo si ya hay un documento
        // No permitir cargar más de un CV
        const infoContainer = document.createElement('div');
        infoContainer.style.cssText = 'text-align: center; padding: 1rem; margin-top: 1rem;';
        infoContainer.innerHTML = `
            <p style="color: #666; font-size: 0.9rem; font-style: italic;">
                Ya tienes un CV cargado. Si deseas actualizar tu CV, primero elimina el actual.
            </p>
        `;
        listaDocumentos.appendChild(infoContainer);
    }

    async function handleDocumentUpload(file, statusElementId = 'upload-status') {
        const statusElement = document.getElementById(statusElementId);

        if (!file) {
            if (statusElement) statusElement.textContent = 'No se seleccionó ningún archivo';
            return;
        }

        // Validar tipo de archivo
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            if (statusElement) {
                statusElement.style.color = '#f44336';
                statusElement.textContent = 'Solo se permiten archivos PDF, DOC o DOCX';
            }
            return;
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            if (statusElement) {
                statusElement.style.color = '#f44336';
                statusElement.textContent = 'El archivo es demasiado grande. Máximo 5MB';
            }
            return;
        }

        try {
            if (statusElement) {
                statusElement.style.color = '#666';
                statusElement.textContent = 'Subiendo documento...';
            }

            // Llamar a la función uploadDocument() de api.js (ámbito global)
            const response = await window.uploadDocument(file);

            console.log('Respuesta de uploadDocument:', response);

            if (!response) {
                throw new Error('No se recibió respuesta del servidor');
            }

            if (response.success) {
                if (statusElement) {
                    statusElement.style.color = '#4CAF50';
                    statusElement.textContent = 'Documento subido exitosamente';
                }

                // Recargar el perfil para mostrar el nuevo documento
                setTimeout(async () => {
                    await loadStudentProfile();
                }, 1000);
            } else {
                if (statusElement) {
                    statusElement.style.color = '#f44336';
                    statusElement.textContent = 'Error al subir el documento: ' + (response.message || 'Error desconocido');
                }
            }
        } catch (error) {
            console.error('Error al subir documento:', error);
            if (statusElement) {
                statusElement.style.color = '#f44336';
                statusElement.textContent = 'Error de conexión al subir el documento';
            }
        }
    }

    async function loadStudentDocuments() {
        try {
            // DEPRECADO: Ya no se usa, los documentos vienen en /api/me
            // Consultar documentos del usuario desde /api/documents
            const response = await fetchMyDocuments();

            const listaDocumentos = document.getElementById('lista-documentos');
            const mensajeSinDocumentos = document.getElementById('mensaje-sin-documentos');

            if (!listaDocumentos) return;

            if (response.success && response.data) {
                // El backend puede devolver los documentos en diferentes estructuras
                const documentos = response.data.data || response.data.documents || response.data || [];

                // Limpiar el mensaje de carga
                if (mensajeSinDocumentos) {
                    mensajeSinDocumentos.remove();
                }

                // Verificar si hay documentos
                if (!Array.isArray(documentos) || documentos.length === 0) {
                    listaDocumentos.innerHTML = '<p style="color: #666; font-style: italic;">No tienes documentos subidos</p>';
                    return;
                }

                // Limpiar la lista
                listaDocumentos.innerHTML = '';

                // Agregar cada documento a la lista
                documentos.forEach(doc => {
                    const documentoItem = document.createElement('div');
                    documentoItem.className = 'documento-item';

                    // Icono del documento
                    const icono = document.createElement('img');
                    icono.src = 'https://api.iconify.design/mdi:file-pdf-box.svg?color=white';
                    icono.className = 'doc-icon';
                    icono.alt = 'PDF';

                    // Nombre del documento
                    const nombre = document.createElement('span');
                    nombre.className = 'doc-nombre';
                    nombre.textContent = doc.original_name || doc.originalName || doc.file_name || 'Documento.pdf';

                    // Acciones
                    const acciones = document.createElement('div');
                    acciones.className = 'doc-acciones';

                    // Botón de descargar
                    const btnDescargar = document.createElement('a');
                    btnDescargar.href = '#';
                    btnDescargar.className = 'btn-user-action';
                    btnDescargar.title = 'Descargar';
                    btnDescargar.innerHTML = '<img src="https://api.iconify.design/mdi:download-outline.svg?color=white">';
                    btnDescargar.addEventListener('click', async (e) => {
                        e.preventDefault();
                        await downloadDocument(doc.idDocument);
                    });

                    // Botón de eliminar (opcional)
                    const btnEliminar = document.createElement('a');
                    btnEliminar.href = '#';
                    btnEliminar.className = 'btn-user-action';
                    btnEliminar.title = 'Eliminar';
                    btnEliminar.innerHTML = '<img src="https://api.iconify.design/mdi:delete-outline.svg?color=white">';
                    btnEliminar.addEventListener('click', async (e) => {
                        e.preventDefault();
                        if (confirm('¿Estás seguro de que deseas eliminar este documento?')) {
                            await removeDocument( doc.idDocument);
                        }
                    });

                    acciones.appendChild(btnDescargar);
                    acciones.appendChild(btnEliminar);

                    documentoItem.appendChild(icono);
                    documentoItem.appendChild(nombre);
                    documentoItem.appendChild(acciones);

                    listaDocumentos.appendChild(documentoItem);
                });

            } else {
                console.error('Error al cargar documentos:', response.message);
                if (mensajeSinDocumentos) {
                    mensajeSinDocumentos.textContent = 'Error al cargar documentos';
                    mensajeSinDocumentos.style.color = '#f44336';
                }
            }
        } catch (error) {
            console.error('Error al cargar documentos:', error);
            const mensajeSinDocumentos = document.getElementById('mensaje-sin-documentos');
            if (mensajeSinDocumentos) {
                mensajeSinDocumentos.textContent = 'Error de conexión al cargar documentos';
                mensajeSinDocumentos.style.color = '#f44336';
            }
        }
    }

async function downloadDocument(documentId) {
    if (!documentId) {
        console.error("documentId inválido:", documentId);
        alert("No se pudo obtener el ID del documento.");
        return;
    }

    try {
        console.log('Obteniendo URL de descarga firmada para documento:', documentId);

        // Paso 1: Obtener URL firmada del backend (requiere autenticación)
        const urlResponse = await getDocumentDownloadUrl(documentId);

        console.log('Respuesta de download-url:', urlResponse);

        if (urlResponse.success && urlResponse.data) {
            // El backend puede devolver la URL en diferentes estructuras
            // Intentar: data.data.url, data.url, o data.download_url
            const signedUrl =
                urlResponse.data.data?.url ||
                urlResponse.data.url ||
                urlResponse.data.download_url ||
                urlResponse.data.downloadUrl;

            if (signedUrl) {
                console.log('URL firmada obtenida:', signedUrl);
                console.log('Iniciando descarga...');

                // Paso 2: Usar la URL firmada para descargar (NO requiere autenticación)
                // La URL firmada ya incluye signature y expires, y es válida por 5 minutos
                window.open(signedUrl, '_blank');

                console.log('Documento descargado exitosamente');
            } else {
                console.error('No se encontró la URL en la respuesta:', urlResponse);
                alert('Error: No se pudo obtener el enlace de descarga.\n\n' +
                      'La respuesta del servidor no contiene una URL válida.');
            }
        } else {
            console.error('No se recibió URL de descarga del servidor:', urlResponse);
            alert('Error: No se pudo obtener el enlace de descarga.\n\n' +
                  'Detalles: ' + (urlResponse.message || 'Respuesta inválida del servidor'));
        }

    } catch (error) {
        console.error('Error al descargar documento:', error);
        alert('Error al descargar el documento. Por favor, intenta nuevamente.');
    }
}

    async function removeDocument(documentId) {
        if (!documentId) {
            console.error("documentId inválido:", documentId);
            alert("No se pudo obtener el ID del documento.");
            return;
        }

        try {
            const response = await deleteDocument(documentId);

            if (response.success) {
                alert('Documento eliminado exitosamente');
                // Recargar el perfil completo para actualizar los documentos
                await loadStudentProfile();
            } else {
                console.error('Error al eliminar documento:', response);

                // Si el error es porque el método DELETE no está soportado
                if (response.message && response.message.includes('DELETE method is not supported')) {
                    alert('Error: El backend no tiene configurado el endpoint para eliminar documentos.\n\n' +
                          'Por favor, verifica que tu backend Laravel tenga la ruta DELETE configurada en api.php:\n' +
                          'Route::delete(\'/documents/{id}\', [DocumentController::class, \'destroy\']);');
                } else {
                    alert('Error al eliminar el documento: ' + (response.message || 'Error desconocido'));
                }
            }
        } catch (error) {
            console.error('Error al eliminar documento:', error);
            alert('Error de conexión al eliminar el documento');
        }
    }

});
