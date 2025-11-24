document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.ADMIN);

    console.log("Página de Gestión de Empresas cargada.");

    // TODO: Cargar lista de empresas desde el backend
    // Ejemplo:
    // loadCompanies();

    // async function loadCompanies() {
    //     const response = await fetchCompanies();
    //     if (response.success) {
    //         renderCompanies(response.data);
    //     }
    // }

});
