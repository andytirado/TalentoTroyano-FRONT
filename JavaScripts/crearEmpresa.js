document.addEventListener("DOMContentLoaded", () => {
    
    // --- Referencias a los Elementos ---
    const pantallaFormulario = document.getElementById("adminPantallaCrearEmpresa");
    const pantallaExito = document.getElementById("success");
    
    const btnGuardar = document.getElementById("btn-guardar-empresa");
    const btnVolver = document.getElementById("volverInicio");
    
    // Nuevos Botones de Éxito
    const btnVerCredenciales = document.getElementById("btnVerCredenciales");
    const btnEnviarEmail = document.getElementById("btnEnviarEmail");

    // --- Campos del formulario ---
    const nombreEmpresaInput = document.getElementById("empresa-nombre");
    const rfcInput = document.getElementById("empresa-rfc");
    const reclutadorInput = document.getElementById("empresa-reclutador");
    const emailInput = document.getElementById("empresa-email");
    const industriaInput = document.getElementById("empresa-industria");

    // --- Spans de Error ---
    const errorNombre = document.getElementById("error-nombre");
    const errorRfc = document.getElementById("error-rfc");
    const errorReclutador = document.getElementById("error-reclutador");
    const errorEmail = document.getElementById("error-email");

    // Variable para guardar la contraseña generada temporalmente
    let contrasenaGenerada = "";

    // --- Función auxiliar para generar contraseña ---
    function generarContrasenaAleatoria() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
        for (let i = 0; i < 8; i++) {
            resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return resultado;
    }

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
        } else if (!emailValor.includes('@')) { 
            emailInput.classList.add("input-error");
            errorEmail.textContent = "Ingresa un email válido.";
            errorEmail.style.display = "block";
            esValido = false;
        } else {
            emailInput.classList.remove("input-error");
            errorEmail.style.display = "none";
        }

        // NOTA: Ya no validamos contraseña manual porque se genera automática

        return esValido;
    }

    // --- Lógica para Guardar ---
    if (btnGuardar && pantallaFormulario && pantallaExito) {
        btnGuardar.addEventListener("click", () => {
            
            // 1. Validar el formulario
            if (!validarFormulario()) {
                return;
            }

            // 2. Generar la contraseña automática
            contrasenaGenerada = generarContrasenaAleatoria();

            // Recolectar valores
            const datosEmpresa = {
                nombre: nombreEmpresaInput.value,
                rfc: rfcInput.value,
                industria: industriaInput.value,
                reclutador: reclutadorInput.value,
                email: emailInput.value,
                passwordTemp: contrasenaGenerada // Guardamos la generada
            };

            console.log("Guardando empresa:", datosEmpresa);
            
            // 3. Cambiar de pantalla
            pantallaFormulario.style.display = "none";
            pantallaExito.style.display = "block"; 
        });
    }

    // --- Lógica Botón: Ver Credenciales ---
    if (btnVerCredenciales) {
        btnVerCredenciales.addEventListener("click", () => {
            const mensaje = `
                Credenciales Temporales:
                ------------------------
                Usuario: ${emailInput.value}
                Contraseña: ${contrasenaGenerada}
            `;
            alert(mensaje); // Puedes cambiar esto por un modal más bonito si prefieres
        });
    }

    // --- Lógica Botón: Enviar por Email ---
    if (btnEnviarEmail) {
        btnEnviarEmail.addEventListener("click", () => {
            // Aquí iría la llamada a tu Backend para enviar el correo real
            alert(`Se han enviado las credenciales a: ${emailInput.value}`);
        });
    }

    // --- Lógica para Volver al Inicio ---
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.location.href = "admin.html";
        });
    }
});