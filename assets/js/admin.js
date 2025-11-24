document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole(USER_ROLES.ADMIN);

    // --- 1. NAVEGACIÓN ENTRE PANTALLAS ---
    
    // Objeto que mapea botones a pantallas
    const pantallas = {
        "adminDashboard": document.getElementById("adminDashboard"),
        "adminPantallaEstadisticas": document.getElementById("adminPantallaEstadisticas"),
        "adminPantallaAlumnos": document.getElementById("adminPantallaAlumnos"),
        "adminPantallaCrearEmpresa": document.getElementById("adminPantallaCrearEmpresa")
        // ... (añade aquí las IDs de 'Crear Vacante' y 'Configuración' cuando las crees)
    };

    const botonesNavegacion = {
        "btn-admin-stats": "adminPantallaEstadisticas",
        "btn-admin-alumnos": "adminPantallaAlumnos",
        "btn-admin-crear-empresa": "adminPantallaCrearEmpresa"
        // ... (añade aquí los botones para 'Crear Vacante' y 'Configuración')
    };

    // Función para mostrar una pantalla y ocultar las demás
    function mostrarPantalla(idPantallaAMostrar) {
        Object.values(pantallas).forEach(pantalla => {
            if (pantalla) { // Verifica que la pantalla exista
                pantalla.style.display = (pantalla.id === idPantallaAMostrar) ? "block" : "none";
            }
        });
        window.scrollTo(0, 0);
    }

    // Asignar listeners a los botones del dashboard
    Object.keys(botonesNavegacion).forEach(idBoton => {
        const boton = document.getElementById(idBoton);
        if (boton) {
            boton.addEventListener("click", () => {
                const idPantalla = botonesNavegacion[idBoton];
                mostrarPantalla(idPantalla);
            });
        }
    });

    // Asignar listeners a TODOS los botones "Regresar"
    document.querySelectorAll('.btn-regresar').forEach(boton => {
        boton.addEventListener('click', () => {
            mostrarPantalla("adminDashboard");
        });
    });

    // Estado inicial: Mostrar solo el dashboard
    mostrarPantalla("adminDashboard");


    // --- 2. LÓGICA DE FILTROS (en la pantalla de Alumnos) ---
    
    const filtroExpediente = document.getElementById("filtro-expediente");
    const filtroCarrera = document.getElementById("filtro-carrera");
    const userListContainer = document.getElementById("user-list-container");
    
    // Solo ejecutamos esto si los elementos existen
    if (filtroExpediente && filtroCarrera && userListContainer) {
        const allUserCards = userListContainer.querySelectorAll('.admin-user-card');

        function filtrarUsuarios() {
            const textoExpediente = filtroExpediente.value.toLowerCase();
            const valorCarrera = filtroCarrera.value;

            allUserCards.forEach(card => {
                const expediente = card.dataset.expediente || "";
                const carrera = card.dataset.carrera || "";

                const coincideExpediente = expediente.includes(textoExpediente);
                const coincideCarrera = (valorCarrera === "") || (carrera === valorCarrera);

                if (coincideExpediente && coincideCarrera) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        filtroExpediente.addEventListener('input', filtrarUsuarios);
        filtroCarrera.addEventListener('change', filtrarUsuarios);
    }

    // --- 3. LÓGICA DE ACCIONES (en la pantalla de Alumnos) ---
    if (userListContainer) {
        userListContainer.addEventListener('click', (e) => {
            const boton = e.target.closest('.btn-user-action');
            if (!boton) return;

            const card = boton.closest('.admin-user-card');
            const userName = card.querySelector('h4').textContent;
            const accion = boton.getAttribute('title');

            if (accion === 'Dar de Baja') {
                // EVITAMOS el 'confirm()' y 'alert()'
                // En una app real, aquí abrirías un modal de confirmación
                console.log(`Acción: ${accion}, Usuario: ${userName}`);
                
                // (Aquí iría tu lógica de API)
                card.style.opacity = '0.5';
                card.querySelector('.user-status').textContent = 'Inactivo';
                card.querySelector('.user-status').className = 'user-status status-inactive';
            } else {
                console.log(`Acción: ${accion}, Usuario: ${userName}`);
            }
        });
    }

});