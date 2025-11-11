document.addEventListener("DOMContentLoaded", () => {
    
    // --- Referencias a los Elementos ---
    const pantallaFormulario = document.getElementById("adminPantallaCrearEmpresa");
    const pantallaExito = document.getElementById("success");
    
    const btnGuardar = document.getElementById("btn-guardar-empresa");
    const btnVolver = document.getElementById("volverInicio");

    // --- Campos del formulario ---
    const nombreEmpresaInput = document.getElementById("empresa-nombre");
    const rfcInput = document.getElementById("empresa-rfc");
    const reclutadorInput = document.getElementById("empresa-reclutador");
    const emailInput = document.getElementById("empresa-email");
    const passwordInput = document.getElementById("empresa-password");
    // (Añadimos industria por si lo necesitas, aunque no lo validamos)
    const industriaInput = document.getElementById("empresa-industria");

    // --- Spans de Error ---
    const errorNombre = document.getElementById("error-nombre");
    const errorRfc = document.getElementById("error-rfc");
    const errorReclutador = document.getElementById("error-reclutador");
    const errorEmail = document.getElementById("error-email");
    const errorPassword = document.getElementById("error-password");

    // --- Función de Validación ---
    function validarFormulario() {
        let esValido = true;
        
        // 1. Validar Nombre Empresa
        if (nombreEmpresaInput.value.trim() === "") {
            nombreEmpresaInput.classList.add("input-error");
            errorNombre.textContent = "El nombre de la empresa es obligatorio.";
            errorNombre.style.display = "block";
            esValido = false;
        } else {
            nombreEmpresaInput.classList.remove("input-error");
            errorNombre.style.display = "none";
        }

        // 2. Validar RFC
        if (rfcInput.value.trim() === "") {
            rfcInput.classList.add("input-error");
            errorRfc.textContent = "El RFC es obligatorio.";
            errorRfc.style.display = "block";
            esValido = false;
        } else {
            rfcInput.classList.remove("input-error");
            errorRfc.style.display = "none";
        }

        // 3. Validar Reclutador
        if (reclutadorInput.value.trim() === "") {
            reclutadorInput.classList.add("input-error");
            errorReclutador.textContent = "El nombre del reclutador es obligatorio.";
            errorReclutador.style.display = "block";
            esValido = false;
        } else {
            reclutadorInput.classList.remove("input-error");
            errorReclutador.style.display = "none";
        }

        // 4. Validar Email
        const emailValor = emailInput.value.trim();
        if (emailValor === "") {
            emailInput.classList.add("input-error");
            errorEmail.textContent = "El email es obligatorio.";
            errorEmail.style.display = "block";
            esValido = false;
        } else if (!emailValor.includes('@')) { // Validación simple de email
            emailInput.classList.add("input-error");
            errorEmail.textContent = "Ingresa un email válido.";
            errorEmail.style.display = "block";
            esValido = false;
        } else {
            emailInput.classList.remove("input-error");
            errorEmail.style.display = "none";
        }

        // 5. Validar Contraseña
        if (passwordInput.value.trim() === "") {
            passwordInput.classList.add("input-error");
            errorPassword.textContent = "La contraseña temporal es obligatoria.";
            errorPassword.style.display = "block";
            esValido = false;
        } else {
            passwordInput.classList.remove("input-error");
            errorPassword.style.display = "none";
        }

        return esValido;
    }

    // --- Lógica para Guardar ---
    if (btnGuardar && pantallaFormulario && pantallaExito) {
        btnGuardar.addEventListener("click", () => {
            
            // 1. Validar el formulario primero
            const formularioEsValido = validarFormulario();

            // 2. Si no es válido, detener la ejecución
            if (!formularioEsValido) {
                return;
            }

            // --- Si la validación pasa, continuamos ---
            
            // Recolectar valores (ya que son válidos)
            const datosEmpresa = {
                nombre: nombreEmpresaInput.value,
                rfc: rfcInput.value,
                industria: industriaInput.value,
                reclutador: reclutadorInput.value,
                email: emailInput.value,
                password: passwordInput.value // ¡Recuerda manejar esto con seguridad en el backend!
            };

            console.log("Guardando empresa:", datosEmpresa);
            
            // 3. Ocultar el formulario
            pantallaFormulario.style.display = "none";
            
            // 4. Mostrar la pantalla de éxito
            pantallaExito.style.display = "block"; 
        });
    }

    // --- Lógica para Volver al Inicio ---
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.location.href = "admin.html";
        });
    }
});