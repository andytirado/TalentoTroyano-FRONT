document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.ADMIN);

    console.log("Página de Configuración del Administrador cargada.");

    // Referencias a elementos del formulario
    const btnGuardarConfig = document.getElementById("btn-guardar-config");

    // Event listener para guardar configuración
    if (btnGuardarConfig) {
        btnGuardarConfig.addEventListener("click", async () => {
            console.log("Guardar configuración");

            // TODO: Implementar lógica para guardar configuración
            // Ejemplo:
            // const config = {
            //     admin_nombre: document.getElementById("admin-nombre").value,
            //     admin_email: document.getElementById("admin-email").value,
            //     // ... otros campos
            // };
            //
            // const response = await updateUser(getUserId(), config);
            // if (response.success) {
            //     alert("Configuración guardada con éxito");
            // }
        });
    }
});
