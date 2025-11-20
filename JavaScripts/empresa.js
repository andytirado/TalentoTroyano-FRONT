document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // 1. CARGAR FOTO DE PERFIL (Lógica previa)
    // ============================================================
    const logoGuardado = localStorage.getItem('empresaLogo');
    const contenedorLogo = document.querySelector('.empresa-logo-grande');

    if (logoGuardado && contenedorLogo) {
        contenedorLogo.innerHTML = `<img src="${logoGuardado}" alt="Logo Empresa" style="width:100%; height:100%; object-fit:cover; border-radius: 50%;">`;
    }

    // ============================================================
    // 2. SELECTORES
    // ============================================================
    
    // Pantallas
    const dashboard = document.getElementById("dashboard");
    const paso1 = document.getElementById("nuevaVacantePaso1");
    const paso2 = document.getElementById("nuevaVacantePaso2");
    const paso3 = document.getElementById("nuevaVacantePaso3");
    const success = document.getElementById("success");
    
    const pantallas = [dashboard, paso1, paso2, paso3, success];

    // Botones
    const btnNuevaVacante = document.getElementById("btnNuevaVacanteDesdeDashboard");
    
    // --- Botones Paso 1 ---
    const btnCancelar1 = document.getElementById("btnCancelar1"); // <--- NUEVO SELECTOR
    const btnSiguiente1 = document.getElementById("btnSiguiente1"); 
    
    // --- Botones Paso 2 ---
    const btnAnterior2 = document.getElementById("btnAnterior2");
    const btnSiguiente2 = document.getElementById("btnSiguiente2");
    
    // --- Botones Paso 3 ---
    const btnRegresar3 = document.getElementById("btnRegresar3");
    const btnPublicar = document.getElementById("btnPublicar");
    
    // --- Botones Éxito ---
    const btnVolverInicio = document.getElementById("volverInicio");

    // ============================================================
    // 3. FUNCIONES Y LOGICA
    // ============================================================

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

    // --- Event Listeners ---

    // 1. Ir del Dashboard al Paso 1
    if (btnNuevaVacante) {
        btnNuevaVacante.addEventListener("click", () => mostrarPantalla("nuevaVacantePaso1"));
    }

    // 2. NUEVO: Botón "Regresar" en el Paso 1 (Vuelve al Dashboard)
    if (btnCancelar1) {
        btnCancelar1.addEventListener("click", () => mostrarPantalla("dashboard"));
    }

    // 3. Validación Paso 1 -> Ir al Paso 2
    if (btnSiguiente1) {
        btnSiguiente1.addEventListener('click', () => {
            const required = ['titulo', 'contratacion', 'horario', 'modalidad', 'correo', 'ubicacion', 'salario'];
            
            for (let id of required) {
                const input = document.getElementById(id);
                if (input && input.value.trim() === '') {
                    alert('Por favor llena todos los campos antes de continuar.');
                    return; 
                }
            }
            mostrarPantalla('nuevaVacantePaso2');
        });
    }

    // 4. Paso 2 -> Regresar al Paso 1
    if (btnAnterior2) {
        btnAnterior2.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso1'));
    }
    
    // 5. Validación Paso 2 -> Ir al Paso 3 (Resumen)
    if (btnSiguiente2) {
        btnSiguiente2.addEventListener('click', () => {
            const descripcion = document.getElementById('descripcion').value.trim();
            const requisitos = document.getElementById('requisitos').value.trim();

            if (descripcion === '' || requisitos === '') {
                alert('Completa todos los campos antes de continuar.');
                return;
            }

            // Generar HTML del resumen
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

            const divResumen = document.getElementById('resumenTexto');
            if(divResumen) divResumen.innerHTML = resumen;
            
            mostrarPantalla('nuevaVacantePaso3');
        });
    }

    // 6. Paso 3 -> Regresar al Paso 2
    if (btnRegresar3) {
        btnRegresar3.addEventListener('click', () => mostrarPantalla('nuevaVacantePaso2'));
    }

    // 7. Paso 3 -> Publicar (Ir a Éxito)
    if (btnPublicar) {
        btnPublicar.addEventListener("click", () => {
            console.log("Vacante publicada"); // Aquí iría la conexión al Backend
            mostrarPantalla("success");
        });
    }

    // 8. Éxito -> Volver al Dashboard
    if (btnVolverInicio) {
        btnVolverInicio.addEventListener("click", () => {
            mostrarPantalla("dashboard");
            // Opcional: Aquí podrías limpiar los inputs del formulario:
            // document.querySelector('form').reset();
        });
    }

    // Inicialización
    mostrarPantalla("dashboard");
});