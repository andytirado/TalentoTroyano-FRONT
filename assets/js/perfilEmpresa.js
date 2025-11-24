// JavaScripts/verPerfilEmpresa.js

document.addEventListener("DOMContentLoaded", async () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    // Este archivo puede ser visto por cualquier usuario autenticado

    console.log('perfilEmpresa.js: Script cargado');

    // Obtener ID de la empresa desde URL (query parameter)
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    // Si no hay ID, intentar usar el de la sesión actual
    const userData = getUserData();
    const idCompany = companyId || userData?.idCompany;

    if (idCompany) {
        await loadCompanyProfile(idCompany);
    } else {
        // Cargar datos desde localStorage como fallback
        loadFromLocalStorage();
    }

    /**
     * Carga el perfil de la empresa desde la API
     */
    async function loadCompanyProfile(id) {
        try {
            console.log('Cargando perfil de empresa:', id);

            const response = await fetchCompany(id);

            if (response.success && response.data) {
                const company = response.data.company || response.data.data || response.data;

                console.log('Datos de empresa:', company);

                renderCompanyProfile(company);
            } else {
                console.error('Error al cargar empresa:', response.message);
                loadFromLocalStorage();
            }
        } catch (error) {
            console.error('Error al cargar perfil de empresa:', error);
            loadFromLocalStorage();
        }
    }

    /**
     * Renderiza el perfil de la empresa en el HTML
     */
    function renderCompanyProfile(company) {
        // Logo
        const logoPublico = document.getElementById("logoPublico");
        const logoUrl = company.compImage || company.comp_image || company.logo || localStorage.getItem('empresaLogo');

        if (logoUrl && logoPublico) {
            logoPublico.src = logoUrl;
        }

        // Nombre de la empresa
        const nombreEmpresa = document.querySelector('.empresa-nombre') || document.querySelector('h2');
        const compName = company.compName || company.comp_name || company.name;

        if (nombreEmpresa && compName) {
            nombreEmpresa.textContent = compName;
        }

        // Descripción
        const descripcion = document.querySelector('.empresa-descripcion') || document.querySelector('.descripcion');
        const compDesc = company.compDescription || company.comp_description || company.description;

        if (descripcion && compDesc) {
            descripcion.textContent = compDesc;
        }

        // Otros campos que pueda tener la empresa
        // Email, teléfono, dirección, etc.
        const email = document.querySelector('.empresa-email');
        if (email && company.compEmail) {
            email.textContent = company.compEmail;
        }

        const telefono = document.querySelector('.empresa-telefono');
        if (telefono && company.compPhoneNumber) {
            telefono.textContent = company.compPhoneNumber;
        }

        console.log('Perfil de empresa renderizado correctamente');
    }

    /**
     * Carga datos desde localStorage como fallback
     */
    function loadFromLocalStorage() {
        console.log('Cargando datos de empresa desde localStorage');

        const logoPublico = document.getElementById("logoPublico");
        const logoGuardado = localStorage.getItem('empresaLogo') || userData?.compImage;

        if (logoGuardado && logoPublico) {
            logoPublico.src = logoGuardado;
        }

        const nombreEmpresa = document.querySelector('.empresa-nombre') || document.querySelector('h2');
        const compName = userData?.compName;

        if (nombreEmpresa && compName) {
            nombreEmpresa.textContent = compName;
        }
    }
});