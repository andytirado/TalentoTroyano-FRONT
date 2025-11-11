document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Seleccionar todas las pantallas
    const paso1 = document.getElementById("nuevaVacantePaso1");
    const paso2 = document.getElementById("nuevaVacantePaso2");
    const paso3 = document.getElementById("nuevaVacantePaso3");
    const success = document.getElementById("success");
    
    // (Asegúrate de que 'pantallas' contenga todas las IDs)
    const pantallas = [paso1, paso2, paso3, success];

    // 2. Seleccionar todos los botones de navegación
    const btnSiguiente1 = document.getElementById("btnSiguiente1");
    const btnAnterior2 = document.getElementById("btnAnterior2");
    const btnSiguiente2 = document.getElementById("btnSiguiente2");
    const btnRegresar3 = document.getElementById("btnRegresar3");
    const btnPublicar = document.getElementById("btnPublicar");
    const btnVolverInicio = document.getElementById("volverInicio");

    /**
     * Función para mostrar una pantalla y ocultar las demás
     * @param {string} idPantallaAMostrar - El ID de la pantalla a mostrar
     */
    function mostrarPantalla(idPantallaAMostrar) {
        pantallas.forEach(pantalla => {
            if (pantalla) { // Verifica que la pantalla exista
                pantalla.style.display = (pantalla.id === idPantallaAMostrar) ? "flex" : "none";
            }
        });
        window.scrollTo(0, 0);
    }

    /**
     * Valida los campos requeridos en un formulario.
     * Muestra/oculta bordes y mensajes de error.
     * @param {string[]} ids - Un array de IDs de los inputs a validar.
     * @returns {boolean} - true si todos son válidos, false si alguno falla.
     */
    function validarCampos(ids) {
        let camposValidos = true;
        
        // Limpiar errores antiguos (mensajes y bordes)
        document.querySelectorAll('.error-msg').forEach(msg => msg.remove());
        ids.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.classList.remove('input-error');
            }
        });

        // Validar
        ids.forEach(id => {
            const input = document.getElementById(id);
            if (input && input.value.trim() === '') {
                camposValidos = false;
                input.classList.add('input-error');

                // --- ¡CAMBIO! Crear y añadir mensaje de error ---
                const error = document.createElement('div');
                error.className = 'error-msg';
                error.textContent = 'Este campo es obligatorio';
                // Inserta el mensaje justo después del input
                input.insertAdjacentElement('afterend', error);
            }
        });

        return camposValidos;
    }

    // --- Listener para quitar error al escribir ---
    document.addEventListener('input', (e) => {
        // Si el input tiene la clase de error y el usuario escribe...
        if (e.target.classList.contains('input-error') && e.target.value.trim() !== '') {
            // Quita el borde rojo
            e.target.classList.remove('input-error');

            // --- ¡CAMBIO! Eliminar mensaje de error ---
            const errorMsg = e.target.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
                errorMsg.remove();
            }
        }
    });

    // 4. Añadir Event Listeners a los botones
    
    // (Paso 1 -> Paso 2)
    if (btnSiguiente1) {
        btnSiguiente1.addEventListener('click', () => {
            const camposPaso1 = ['titulo', 'contratacion', 'horario', 'modalidad', 'ubicacion', 'salario'];
            if (validarCampos(camposPaso1)) {
                mostrarPantalla('nuevaVacantePaso2');
            } else {
                console.error("Campos obligatorios faltantes en el Paso 1.");
            }
        });
    }

    // (Paso 2 -> Paso 1)
    if (btnAnterior2) {
        btnAnterior2.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso1'));
    }
    
    // (Paso 2 -> Paso 3)
    // (Paso 2 -> Paso 3)
    if (btnSiguiente2) {
        btnSiguiente2.addEventListener('click', () => {
            const camposPaso2 = ['descripcion', 'requisitos'];
            if (validarCampos(camposPaso2)) {
                
                // Si es válido, construir el Resumen
                const descripcion = document.getElementById('descripcion').value.trim();
                const requisitos = document.getElementById('requisitos').value.trim();
                
                // --- DATOS DEL PASO 1 ---
                // (Se leen los valores de los inputs aunque estén ocultos)
                const titulo = document.getElementById('titulo').value.trim();
                const empresaAsignada = document.getElementById('empresa-asignada').value.trim();
                const contratacion = document.getElementById('contratacion').value.trim();
                const horario = document.getElementById('horario').value.trim();
                const modalidad = document.getElementById('modalidad').value.trim();
                const ubicacion = document.getElementById('ubicacion').value.trim();
                const salario = document.getElementById('salario').value.trim();
                
                // --- ¡CAMPO CORREGIDO/AÑADIDO! ---
                const carreras = document.getElementById('carreras').value.trim();
                
                // --- CONSTRUIR EL HTML ---
                const resumenHTML = `
                    <p><strong>${titulo}</strong></p>
                    
                    ${empresaAsignada ? `<p><strong>Empresa:</strong> ${empresaAsignada}</p>` : ''}

                    <p>
                    Contratación: ${contratacion}<br>
                    Horario: ${horario}<br>
                    Modalidad: ${modalidad}<br>
                    Ubicación: ${ubicacion}<br>
                    Salario: ${salario}<br>
                    
                    ${carreras ? `Carreras: ${carreras}` : ''}
                    </p>
                    
                    <p><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, '<br>')}</p>
                    <p><strong>Requisitos:</strong><br>${requisitos.replace(/\n/g, '<br>')}</p>
                `;

                document.getElementById('resumenTexto').innerHTML = resumenHTML;
                mostrarPantalla('nuevaVacantePaso3');
            } else {
                console.error("Descripción y requisitos son obligatorios.");
            }
        });
    }

    // (Paso 3 -> Paso 2)
    if (btnRegresar3) {
        btnRegresar3.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso2'));
    }

    // (Paso 3 -> Éxito)
    if (btnPublicar) {
        btnPublicar.addEventListener("click", () => {
            // (Aquí iría la llamada a la API para guardar la vacante)
            mostrarPantalla("success");
        });
    }

    // (Éxito -> Dashboard de Admin)
    if (btnVolverInicio) {
        btnVolverInicio.addEventListener("click", () => {
            window.location.href = "admin.html";
        });
    }

    // Estado inicial: Mostrar solo el Paso 1
    mostrarPantalla("nuevaVacantePaso1");
});