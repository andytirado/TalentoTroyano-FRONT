/**
 * login.js
 * Manejo del formulario de login
 */

// Si el usuario ya está autenticado, redirigir a su dashboard
redirectIfAuthenticated();

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("login-form");
    const btnLogin = document.getElementById("btn-login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Validaciones básicas
            if (!email || !password) {
                alert("Por favor, completa todos los campos");
                return;
            }

            // Deshabilitar botón durante el proceso
            btnLogin.disabled = true;
            btnLogin.textContent = "Iniciando sesión...";

            try {
                // Llamar a la función de login de auth.js
                const result = await login(email, password);

                if (result.success) {
                    // El login exitoso redirige automáticamente en auth.js
                    console.log("Login exitoso");
                } else {
                    // Mostrar error
                    alert(result.message || "Error al iniciar sesión. Verifica tus credenciales.");
                    btnLogin.disabled = false;
                    btnLogin.textContent = "Iniciar Sesión";
                }
            } catch (error) {
                console.error("Error en login:", error);
                alert("Error de conexión. Por favor, intenta de nuevo.");
                btnLogin.disabled = false;
                btnLogin.textContent = "Iniciar Sesión";
            }
        });
    }

    // Google Sign In (placeholder)
    const btnGoogle = document.getElementById("btn-google");
    if (btnGoogle) {
        btnGoogle.addEventListener("click", () => {
            alert("Login con Google - Pendiente de implementar");
            // TODO: Implementar OAuth con Google
        });
    }

});
