document.addEventListener('DOMContentLoaded', function() {
    
  // --- Selectores de Elementos ---
  const ofertas = document.querySelectorAll('.oferta');
  const logoPrincipal = document.getElementById('logo-principal');
  
  // Vistas del panel derecho
  const vistaInicio = document.getElementById('detalle-inicio');
  const vistaCompleta = document.getElementById('detalle-completo');
  const vistaExito = document.getElementById('detalle-exito');
  
  // Botones
  const btnAplicar = document.getElementById('btn-aplicar');
  const btnVolver = document.getElementById('btn-volver');
  
  // Filtros
  const inputBusqueda = document.getElementById('busqueda');
  const selectFiltroModalidad = document.getElementById('filtro');
  // CAMBIO: Nuevo selector de filtro
  const selectFiltroCarrera = document.getElementById('filtro-carrera');

  // --- Lógica de Navegación ---

  // Mostrar detalles al hacer clic en una oferta
  ofertas.forEach(oferta => {
    oferta.addEventListener('click', function() {
      // CAMBIO: Lógica de vistas actualizada
      vistaInicio.style.display = 'none';
      vistaExito.style.display = 'none';
      vistaCompleta.style.display = 'flex'; // 'flex' para mostrar

      // Resalta la oferta activa
      ofertas.forEach(o => o.classList.remove('active'));
      this.classList.add('active');

      // Llena los datos
      const datos = this.dataset;
      document.getElementById('detalle-titulo').textContent = datos.titulo;
      document.getElementById('detalle-empresa').textContent = datos.empresa;
      document.getElementById('detalle-modalidad').textContent = datos.modalidad;
      document.getElementById('detalle-salario').textContent = datos.salario;
      document.getElementById('detalle-descripcion').textContent = datos.descripcion;
    });
  });

  // Mostrar pantalla de éxito al aplicar
  btnAplicar.addEventListener('click', function() {
      // CAMBIO: Lógica de vistas actualizada
      vistaCompleta.style.display = 'none';
      vistaExito.style.display = 'flex'; // 'flex' para mostrar
  });

  // CAMBIO: Función para volver al inicio
  function irAlInicio() {
      vistaCompleta.style.display = 'none';
      vistaExito.style.display = 'none';
      vistaInicio.style.display = 'flex'; // 'flex' para mostrar
      
      // Quita la selección de la lista
      ofertas.forEach(o => o.classList.remove('active'));
  }

  // Volver al inicio desde éxito
  btnVolver.addEventListener('click', irAlInicio);

  // Regresar al inicio desde logo
  logoPrincipal.addEventListener('click', irAlInicio);

  // --- Lógica de Filtros ---
  
  // CAMBIO: Función de filtrado actualizada
  function filtrarOfertas() {
    const texto = inputBusqueda.value.toLowerCase();
    const modalidad = selectFiltroModalidad.value;
    const carrera = selectFiltroCarrera.value; // Nuevo valor

    ofertas.forEach(oferta => {
      const titulo = oferta.dataset.titulo.toLowerCase();
      const empresa = oferta.dataset.empresa.toLowerCase();
      const ofertaModalidad = oferta.dataset.modalidad;
      const ofertaCarrera = oferta.dataset.carrera; // Nuevo dato

      const coincideTexto = titulo.includes(texto) || empresa.includes(texto);
      const coincideModalidad = !modalidad || ofertaModalidad === modalidad;
      const coincideCarrera = !carrera || ofertaCarrera === carrera; // Nueva lógica

      // La oferta se muestra si cumple TODOS los filtros
      oferta.style.display = (coincideTexto && coincideModalidad && coincideCarrera) ? 'block' : 'none';
    });
  }

  // Asignar listeners a TODOS los filtros
  inputBusqueda.addEventListener('input', filtrarOfertas);
  selectFiltroModalidad.addEventListener('change', filtrarOfertas);
  selectFiltroCarrera.addEventListener('change', filtrarOfertas); // Nuevo listener
});