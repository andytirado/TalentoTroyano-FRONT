// JavaScripts/editarVacante.js

document.addEventListener("DOMContentLoaded", () => {

    // Verificar autenticación al cargar la página
    checkAuth();
    requireRole([USER_ROLES.ADMIN, USER_ROLES.COMPANY]);

    const btnGuardar = document.getElementById("btnGuardarCambios");
    const btnVolverLista = document.getElementById("btnVolverLista");
    
    const pantallaEdicion = document.getElementById("pantallaEditarVacante");
    const pantallaExito = document.getElementById("success");

    // Lista de IDs de inputs obligatorios
    const camposObligatorios = [
        "edit-titulo", 
        "edit-modalidad", 
        "edit-horario", 
        "edit-contratacion", 
        "edit-ubicacion", 
        "edit-salario",
        "edit-descripcion",
        "edit-requisitos"
    ];

    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            
            let esValido = true;

            // Validación simple
            camposObligatorios.forEach(id => {
                const input = document.getElementById(id);
                if (input && input.value.trim() === "") {
                    input.style.borderColor = "#f87171"; // Rojo error
                    esValido = false;
                } else if (input) {
                    input.style.borderColor = "#4A7A9F"; // Azul normal
                }
            });

            if (!esValido) {
                alert("Por favor, no dejes campos vacíos.");
                return;
            }

            // Simular guardado y mostrar éxito
            console.log("Guardando cambios...");
            pantallaEdicion.style.display = "none";
            pantallaExito.style.display = "block";
        });
    }

    if (btnVolverLista) {
        btnVolverLista.addEventListener("click", () => {
            // Redirigir a la lista de vacantes activas
            window.location.href = "vacantesActivas.html";
        });
    }

});