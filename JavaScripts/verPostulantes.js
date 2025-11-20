// JavaScripts/postulantes.js

document.addEventListener("DOMContentLoaded", () => {

    const tituloVacanteElem = document.getElementById("tituloVacante");
    const contenedorLista = document.getElementById("listaPostulantesContainer");
    const inputBuscador = document.getElementById("buscadorPostulantes");

    // Simulación de Datos
    const nombreVacanteActual = "Desarrollador Front-End (React)";
    
    const postulantesDB = [
        {
            id: 1,
            nombre: "Ana Torres",
            carrera: "Ingeniería de Software",
            foto: "https://placehold.co/100x100/3C5A74/ebebeb?text=AT",
            cvUrl: "#"
        },
        {
            id: 2,
            nombre: "Carlos Mendoza",
            carrera: "Ingeniería en Computación",
            foto: "https://placehold.co/100x100/3C5A74/ebebeb?text=CM",
            cvUrl: "#"
        },
        {
            id: 3,
            nombre: "Lucía Fernández",
            carrera: "Lic. en Administración de TI",
            foto: "https://placehold.co/100x100/3C5A74/ebebeb?text=LF",
            cvUrl: "#"
        },
        {
            id: 4,
            nombre: "Miguel Ángel Ruiz",
            carrera: "Ingeniería de Software",
            foto: "https://placehold.co/100x100/3C5A74/ebebeb?text=MR",
            cvUrl: "#"
        }
    ];

    // CAMBIO: Formato de título en una sola línea
    tituloVacanteElem.textContent = `Postulantes: ${nombreVacanteActual}`;
    
    renderizarPostulantes(postulantesDB);

    function renderizarPostulantes(lista) {
        contenedorLista.innerHTML = ""; 

        if (lista.length === 0) {
            contenedorLista.innerHTML = `
                <div class="mensaje-vacio">
                    No se encontraron postulantes que coincidan con la búsqueda.
                </div>
            `;
            return;
        }

        lista.forEach(postulante => {
            const tarjetaHTML = `
                <div class="postulante-card">
                    <div class="postulante-avatar" style="background-image: url('${postulante.foto}')"></div>
                    
                    <div class="postulante-info">
                        <h4>${postulante.nombre}</h4>
                        <p>${postulante.carrera}</p>
                    </div>

                    <div class="postulante-acciones">
                        <a href="${postulante.cvUrl}" target="_blank" class="btn-ver-cv" title="Ver Currículum">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Ver CV
                        </a>
                    </div>
                </div>
            `;
            contenedorLista.insertAdjacentHTML('beforeend', tarjetaHTML);
        });
    }

    if (inputBuscador) {
        inputBuscador.addEventListener("input", (e) => {
            const termino = e.target.value.toLowerCase();
            const filtrados = postulantesDB.filter(postulante => 
                postulante.nombre.toLowerCase().includes(termino) || 
                postulante.carrera.toLowerCase().includes(termino)
            );
            renderizarPostulantes(filtrados);
        });
    }
});