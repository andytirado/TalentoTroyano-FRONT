document.addEventListener("DOMContentLoaded", () => {
    
    console.log("perfilUsuarioEditar.js: ¡Script cargado!"); // MENSAJE 1

    // 1. Encontrar los elementos en la página
    const avatarUploadInput = document.getElementById("avatar-upload-input");
    const avatarPreview = document.getElementById("avatar-preview");

    // 2. Asegurarnos de que existan antes de añadir el evento
    if (avatarUploadInput && avatarPreview) {
        
        console.log("perfilUsuarioEditar.js: ¡Elementos encontrados!"); // MENSAJE 2

        // 3. Añadir un "escuchador"
        avatarUploadInput.addEventListener("change", function(event) {
            
            console.log("perfilUsuarioEditar.js: ¡Evento 'change' detectado!"); // MENSAJE 3
            
            const file = event.target.files[0];

            if (file) {
                console.log("perfilUsuarioEditar.js: Procesando archivo..."); // MENSAJE 4
                
                const reader = new FileReader();

                reader.onload = function(e) {
                    avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
                    console.log("perfilUsuarioEditar.js: ¡Vista previa actualizada!"); // MENSAJE 5
                }

                reader.readAsDataURL(file);
            }
        });
    } else {
        // Si no encuentra los IDs, te avisará
        console.error("perfilUsuarioEditar.js: ERROR - No se pudo encontrar 'avatar-upload-input' o 'avatar-preview'.");
        console.error("Asegúrate de que los IDs en tu HTML sean correctos.");
    }
});