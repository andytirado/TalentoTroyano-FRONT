/**
 * signup.js
 * Manejo del formulario de registro
 */

// Si el usuario ya está autenticado, redirigir a su dashboard
redirectIfAuthenticated();

document.addEventListener("DOMContentLoaded", () => {

    const signupForm = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const password2 = password2Input.value;

            // Validaciones básicas
            if (!email || !password || !password2) {
                alert("Por favor, completa todos los campos");
                return;
            }

            if (password !== password2) {
                alert("Las contraseñas no coinciden");
                return;
            }

            if (password.length < 8) {
                alert("La contraseña debe tener al menos 8 caracteres");
                return;
            }

            // Deshabilitar botón durante el proceso
            const btnSubmit = signupForm.querySelector('button[type="submit"]');
            btnSubmit.disabled = true;
            btnSubmit.textContent = "Creando cuenta...";

            try {
                // Llamar al endpoint de registro
                const response = await fetch(API_ENDPOINTS.auth.register, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        usEmail: email,
                        password: password,
                    }),
                });

                const data = await response.json();

                if (response.ok && data.message === "User registered") {
                    // Guardar indicador temporal para permitir acceso a la página de completar perfil
                    // IMPORTANTE: También guardar las credenciales para que pueda hacer login después
                    try {
                        localStorage.setItem('pending_profile', JSON.stringify({ 
                            email: email,
                            password: password  // Guardamos la contraseña temporalmente
                        }));
                    } catch (e) {
                        console.error('Error al guardar pending_profile:', e);
                        // no crítico – continuar con la redirección
                    }
                    // Redirigir a la página de completar perfil para que el usuario termine su registro
                    window.location.href = FRONTEND_ROUTES.student.completeProfile || '/html/estudiante/perfilCompleto.php';
                } else if (response.ok && data.token) {
                    // Normalizar datos del usuario (backend devuelve 'name' pero frontend usa 'nombre')
                    const normalizedUser = {
                        id: data.user.id,
                        nombre: data.user.name || data.user.nombre,
                        email: data.user.email,
                        rol: data.user.rol || data.user.role || 'estudiante', // Asignar rol por defecto
                        ...data.user
                    };

                    // Guardar token y datos del usuario
                    setToken(data.token);
                    setUserData(normalizedUser);

                    alert("Cuenta creada exitosamente");

                    // Redirigir según el rol
                    redirectToRoleDashboard(normalizedUser.rol);
                } else {
                    // Mostrar error
                    const errorMessage = data.message || "Error al crear la cuenta";
                    alert(errorMessage);
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = "Crear cuenta";
                }
            } catch (error) {
                console.error("Error en signup:", error);
                alert("Error de conexión. Por favor, intenta de nuevo.");
                btnSubmit.disabled = false;
                btnSubmit.textContent = "Crear cuenta";
            }
        });
    }

});
