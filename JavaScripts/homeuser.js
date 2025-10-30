document.addEventListener('DOMContentLoaded', function() {
    const ofertas = document.querySelectorAll('.oferta');
    const detallePanel = document.querySelector('.detalle');
    const logoPrincipal = document.getElementById('logo-principal');
    const vistaInicio = document.getElementById('detalle-inicio');
    const vistaCompleta = document.getElementById('detalle-completo');
    const vistaExito = document.getElementById('detalle-exito');
    const btnAplicar = document.getElementById('btn-aplicar');
    const btnVolver = document.getElementById('btn-volver');
    const inputBusqueda = document.getElementById('busqueda');
    const selectFiltro = document.getElementById('filtro');
  
    // Mostrar detalles al hacer clic
    ofertas.forEach(oferta => {
      oferta.addEventListener('click', function() {
        vistaInicio.style.display = 'none';
        vistaExito.hidden = true;
        vistaCompleta.hidden = false;
  
        ofertas.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
  
        const datos = this.dataset;
        document.getElementById('detalle-titulo').textContent = datos.titulo;
        document.getElementById('detalle-empresa').textContent = datos.empresa;
        document.getElementById('detalle-modalidad').textContent = datos.modalidad;
        document.getElementById('detalle-salario').textContent = datos.salario;
        document.getElementById('detalle-descripcion').textContent = datos.descripcion;
        detallePanel.style.backgroundColor = datos.color;
      });
    });
  
    // Mostrar pantalla de éxito
    btnAplicar.addEventListener('click', function() {
      vistaCompleta.hidden = true;
      vistaExito.hidden = false;
    });
  
    // Volver al inicio desde éxito
    btnVolver.addEventListener('click', function() {
      vistaExito.hidden = true;
      vistaInicio.style.display = 'flex';
      detallePanel.style.backgroundColor = '#283747';
      ofertas.forEach(o => o.classList.remove('active'));
    });
  
    // Regresar al inicio desde logo
    logoPrincipal.addEventListener('click', function() {
      vistaCompleta.hidden = true;
      vistaExito.hidden = true;
      vistaInicio.style.display = 'flex';
      detallePanel.style.backgroundColor = '#283747';
      ofertas.forEach(o => o.classList.remove('active'));
    });
  
    // 🔍 Filtro de búsqueda
    function filtrarOfertas() {
      const texto = inputBusqueda.value.toLowerCase();
      const filtro = selectFiltro.value;
  
      ofertas.forEach(oferta => {
        const titulo = oferta.dataset.titulo.toLowerCase();
        const empresa = oferta.dataset.empresa.toLowerCase();
        const modalidad = oferta.dataset.modalidad;
  
        const coincideTexto = titulo.includes(texto) || empresa.includes(texto);
        const coincideFiltro = !filtro || modalidad === filtro;
  
        oferta.style.display = (coincideTexto && coincideFiltro) ? 'block' : 'none';
      });
    }
  
    inputBusqueda.addEventListener('input', filtrarOfertas);
    selectFiltro.addEventListener('change', filtrarOfertas);
  });
  