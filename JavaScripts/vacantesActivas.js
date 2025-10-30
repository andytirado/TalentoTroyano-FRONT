document.addEventListener("DOMContentLoaded", () => {
    
    // Selecciona todos los botones de acción de las tarjetas
    const botonesAccion = document.querySelectorAll('.btn-accion-vacante');

    botonesAccion.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtiene el título de la vacante más cercano
            const card = boton.closest('.vacante-card');
            const titulo = card.querySelector('.vacante-info h4').textContent;
            
            // Obtiene la acción del atributo 'title' del botón
            const accion = boton.getAttribute('title');

            // Muestra una alerta de ejemplo
            alert(`Acción: ${accion}\nVacante: ${titulo}`);

            // Aquí podrías redirigir a otra página, abrir un modal, etc.
            // Ejemplo:
            // if (accion === 'Editar Vacante') {
            //     window.location.href = `/editar-vacante.html?id=...`;
            // }
        });
    });

    // Puedes añadir lógica para el buscador también
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const textoBusqueda = e.target.value.toLowerCase();
            const tarjetas = document.querySelectorAll('.vacante-card');
            
            tarjetas.forEach(tarjeta => {
                const titulo = tarjeta.querySelector('.vacante-info h4').textContent.toLowerCase();
                if (titulo.includes(textoBusqueda)) {
                    tarjeta.style.display = 'grid'; // Muestra la tarjeta
                } else {
                    tarjeta.style.display = 'none'; // Oculta la tarjeta
                }
            });
        });
    }
});