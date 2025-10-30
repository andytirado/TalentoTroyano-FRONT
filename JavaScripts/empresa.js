document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Seleccionar todas las pantallas
    const dashboard = document.getElementById("dashboard");
    const paso1 = document.getElementById("nuevaVacantePaso1");
    const paso2 = document.getElementById("nuevaVacantePaso2");
    const paso3 = document.getElementById("nuevaVacantePaso3");
    const success = document.getElementById("success");
    
    const pantallas = [dashboard, paso1, paso2, paso3, success];

    // 2. Seleccionar todos los botones de navegación
    const btnNuevaVacante = document.getElementById("btnNuevaVacanteDesdeDashboard");
    const btnSiguiente1 = document.getElementById("btnSiguiente1"); // (toStep2)
    const btnAnterior2 = document.getElementById("btnAnterior2");   // (backToStep1)
    const btnSiguiente2 = document.getElementById("btnSiguiente2"); // (toStep3)
    const btnRegresar3 = document.getElementById("btnRegresar3");  // (backToStep2)
    const btnPublicar = document.getElementById("btnPublicar");
    const btnVolverInicio = document.getElementById("volverInicio");

    // 3. Función para mostrar una pantalla (reemplaza tu 'showScreen')
    function mostrarPantalla(idPantallaAMostrar) {
        pantallas.forEach(pantalla => {
            if (pantalla.id === idPantallaAMostrar) {
                pantalla.style.display = "block";
            } else {
                pantalla.style.display = "none";
            }
        });
        window.scrollTo(0, 0);
    }

    // 4. Añadir Event Listeners a los botones (CON TU LÓGICA DE VALIDACIÓN)
    
    // Del Dashboard (1) -> al Paso 1 (2)
    if (btnNuevaVacante) {
        btnNuevaVacante.addEventListener("click", () => mostrarPantalla("nuevaVacantePaso1"));
    }

    // 🔹 VALIDACIÓN DE CAMPOS DEL PRIMER FORMULARIO (Tu código)
    if (btnSiguiente1) {
        btnSiguiente1.addEventListener('click', () => {
            // Ajusta este array si cambiaste el ID 'correo' por 'carrera'
            const required = ['titulo', 'contratacion', 'horario', 'modalidad', 'correo', 'ubicacion', 'salario'];
          
            // Verifica que todos los campos estén llenos
            for (let id of required) {
                if (document.getElementById(id).value.trim() === '') {
                    alert('Por favor llena todos los campos antes de continuar.');
                    return; // Detiene el avance
                }
            }
            mostrarPantalla('nuevaVacantePaso2'); // Si todo está lleno, avanza
        });
    }

    // Del Paso 2 (3) -> al Paso 1 (2) (Anterior)
    if (btnAnterior2) {
        btnAnterior2.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso1'));
    }
    
    // 🔹 VALIDACIÓN DE CAMPOS DEL SEGUNDO FORMULARIO (Tu código)
    if (btnSiguiente2) {
        btnSiguiente2.addEventListener('click', () => {
            const descripcion = document.getElementById('descripcion').value.trim();
            const requisitos = document.getElementById('requisitos').value.trim();

            if (descripcion === '' || requisitos === '') {
                alert('Completa todos los campos antes de continuar.');
                return; // Si hay vacíos, no avanza
            }

            // Si todo está completo, genera el resumen
            const resumen = `
                <p><strong>${document.getElementById('titulo').value}</strong></p>
                <p>
                Contratación: ${document.getElementById('contratacion').value}<br>
                Horario: ${document.getElementById('horario').value}<br>
                Modalidad: ${document.getElementById('modalidad').value}<br>
                Ubicación: ${document.getElementById('ubicacion').value}<br>
                Salario: ${document.getElementById('salario').value}
                </p>
                <p><strong>Descripción:</strong><br>${descripcion.replace(/\n/g, '<br>')}</p>
                <p><strong>Requisitos:</strong><br>${requisitos.replace(/\n/g, '<br>')}</p>
            `;
            // (Añadí .replace(/\n/g, '<br>') para respetar los saltos de línea del textarea)

            document.getElementById('resumenTexto').innerHTML = resumen;
            mostrarPantalla('nuevaVacantePaso3');
        });
    }

    // Del Paso 3 (4) -> al Paso 2 (3) (Regresar)
    if (btnRegresar3) {
        btnRegresar3.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso2'));
    }

    // Del Paso 3 (4) -> a Éxito (5) (Publicar)
    if (btnPublicar) {
        btnPublicar.addEventListener("click", () => {
            // Aquí podrías enviar los datos a un servidor
            mostrarPantalla("success");
        });
    }

    // De Éxito (5) -> al Dashboard (1)
    if (btnVolverInicio) {
        btnVolverInicio.addEventListener("click", () => {
            // Opcional: podrías querer limpiar los campos del formulario aquí
            mostrarPantalla("dashboard");
        });
    }

    // 5. Estado inicial: Mostrar solo el dashboard al cargar
    mostrarPantalla("dashboard");
});