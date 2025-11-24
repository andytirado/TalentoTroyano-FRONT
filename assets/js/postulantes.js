document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole([USER_ROLES.ADMIN, USER_ROLES.COMPANY]);

    // --- Lógica de Arrastrar y Soltar (Drag & Drop) ---

    const tarjetas = document.querySelectorAll('.postulante-card');
    const columnas = document.querySelectorAll('.kanban-cards-list');
    let tarjetaArrastrada = null;

    // 1. Inicia el arrastre
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('dragstart', () => {
            tarjetaArrastrada = tarjeta;
            // Añade clase 'dragging' para feedback visual
            setTimeout(() => tarjeta.classList.add('dragging'), 0); 
        });

        // 2. Termina el arrastre
        tarjeta.addEventListener('dragend', () => {
            tarjeta.classList.remove('dragging');
            tarjetaArrastrada = null;
        });
    });

    // 3. Eventos sobre las columnas
    columnas.forEach(columna => {
        // 3a. Al entrar en una columna válida
        columna.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permite soltar
            columna.classList.add('drag-over');
        });

        // 3b. Al salir de la columna
        columna.addEventListener('dragleave', () => {
            columna.classList.remove('drag-over');
        });

        // 3c. Al soltar la tarjeta
        columna.addEventListener('drop', (e) => {
            e.preventDefault();
            columna.classList.remove('drag-over');
            if (tarjetaArrastrada) {
                columna.appendChild(tarjetaArrastrada);
                // Aquí podrías llamar a una API para guardar el cambio de estado
                // ej: actualizarEstadoPostulante(tarjetaArrastrada.id, columna.id);
            }
        });
    });

    // --- Lógica de Búsqueda (Similar a la que ya tenías) ---
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const textoBusqueda = e.target.value.toLowerCase();
            
            document.querySelectorAll('.postulante-card').forEach(tarjeta => {
                const nombre = tarjeta.querySelector('h4').textContent.toLowerCase();
                const vacante = tarjeta.querySelector('p').textContent.toLowerCase();
                
                if (nombre.includes(textoBusqueda) || vacante.includes(textoBusqueda)) {
                    tarjeta.style.display = 'flex'; // Muestra la tarjeta
                } else {
                    tarjeta.style.display = 'none'; // Oculta la tarjeta
                }
            });
        });
    }

    // --- Lógica de botones de acción (Ejemplo) ---
    document.querySelectorAll('.btn-accion-mini').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const accion = boton.getAttribute('title');
            const tarjeta = boton.closest('.postulante-card');
            const nombre = tarjeta.querySelector('h4').textContent;
            
            alert(`Acción: ${accion}\nPostulante: ${nombre}`);
            
            // Prevenir que el click active el 'drag' (buena práctica)
            e.stopPropagation(); 
        });
    });
});
