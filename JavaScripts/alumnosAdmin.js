document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DE FILTROS ---
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

    // --- LÓGICA DE ACCIONES ---
    if (userListContainer) {
        userListContainer.addEventListener('click', (e) => {
            const boton = e.target.closest('.btn-user-action');
            if (!boton) return;

            const card = boton.closest('.admin-user-card');
            const userName = card.querySelector('h4').textContent;
            const accion = boton.getAttribute('title');

            if (accion === 'Dar de Baja') {
                console.log(`Acción: ${accion}, Usuario: ${userName}`);
                // (Aquí iría tu lógica de API)
                
                // Simulación visual
                card.style.opacity = '0.5';
                card.querySelector('.user-status').textContent = 'Inactivo';
                card.querySelector('.user-status').className = 'user-status status-inactive';
                card.classList.remove('status-active-bar');
                card.classList.add('status-inactive-bar');
                // Cambia el botón a "Reactivar"
                boton.innerHTML = `<img src="https://api.iconify.design/mdi:account-check-outline.svg?color=#4ade80">`;
                boton.setAttribute('title', 'Reactivar');

            } else if (accion === 'Reactivar') {
                console.log(`Acción: ${accion}, Usuario: ${userName}`);
                
                // Simulación visual
                card.style.opacity = '1';
                card.querySelector('.user-status').textContent = 'Activo';
                card.querySelector('.user-status').className = 'user-status status-active';
                card.classList.remove('status-inactive-bar');
                card.classList.add('status-active-bar');
                // Cambia el botón a "Dar de Baja"
                boton.innerHTML = `<img src="https://api.iconify.design/mdi:account-off-outline.svg?color=#f87171">`;
                boton.setAttribute('title', 'Dar de Baja');

            } else {
                // Para "Ver CV" o "Ver Perfil"
                console.log(`Acción: ${accion}, Usuario: ${userName}`);
                // Aquí podrías abrir un modal o una nueva pestaña
            }
        });
    }
});