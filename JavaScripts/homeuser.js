document.addEventListener('DOMContentLoaded', function() {
    const ofertas = document.querySelectorAll('.oferta');
    const detallePanel = document.querySelector('.detalle');
    const logoPrincipal = document.getElementById('logo-principal');
    const vistaInicio = document.getElementById('detalle-inicio');
    const vistaCompleta = document.getElementById('detalle-completo');
    const btnAplicar = document.getElementById('btn-aplicar');
    
    ofertas.forEach(oferta => {
        oferta.addEventListener('click', function() {
            vistaInicio.style.display = 'none';
            vistaCompleta.style.display = 'flex';

            ofertas.forEach(o => o.classList.remove('active'));
            this.classList.add('active');

            const datos = this.dataset;
            
            document.getElementById('detalle-titulo').textContent = datos.titulo;
            document.getElementById('detalle-empresa').textContent = datos.empresa;
            document.getElementById('detalle-modalidad').textContent = datos.modalidad;
            document.getElementById('detalle-salario').textContent = datos.salario;
            document.getElementById('detalle-descripcion').textContent = datos.descripcion;
            detallePanel.style.backgroundColor = datos.color;

            btnAplicar.style.display = 'block';
        });
    });

    btnAplicar.addEventListener('click', function() {
        const puestoAplicado = document.getElementById('detalle-titulo').textContent;
        alert(`¡Postulación exitosa para el puesto de ${puestoAplicado}!`);
    });

    logoPrincipal.addEventListener('click', function() {
        vistaCompleta.style.display = 'none';
        vistaInicio.style.display = 'block';
        detallePanel.style.backgroundColor = '#1E2F45';
        ofertas.forEach(o => o.classList.remove('active'));
        btnAplicar.style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const ofertas = document.querySelectorAll('.oferta');
    const detallePanel = document.querySelector('.detalle');
    const logoPrincipal = document.getElementById('logo-principal');
    const vistaInicio = document.getElementById('detalle-inicio');
    const vistaCompleta = document.getElementById('detalle-completo');
    const btnAplicar = document.getElementById('btn-aplicar');
    
    ofertas.forEach(oferta => {
        oferta.addEventListener('click', function() {
            vistaInicio.style.display = 'none';
            vistaCompleta.style.display = 'flex';

            ofertas.forEach(o => o.classList.remove('active'));
            this.classList.add('active');

            const datos = this.dataset;
            
            document.getElementById('detalle-titulo').textContent = datos.titulo;
            document.getElementById('detalle-empresa').textContent = datos.empresa;
            document.getElementById('detalle-modalidad').textContent = datos.modalidad;
            document.getElementById('detalle-salario').textContent = datos.salario;
            document.getElementById('detalle-descripcion').textContent = datos.descripcion;
            detallePanel.style.backgroundColor = datos.color;

            btnAplicar.style.display = 'block';
        });
    });

    btnAplicar.addEventListener('click', function() {
        const puestoAplicado = document.getElementById('detalle-titulo').textContent;
        alert(`¡Postulación exitosa para el puesto de ${puestoAplicado}!`);
    });

    logoPrincipal.addEventListener('click', function() {
        vistaCompleta.style.display = 'none';
        vistaInicio.style.display = 'block';
        detallePanel.style.backgroundColor = '#1E2F45';
        ofertas.forEach(o => o.classList.remove('active'));
        btnAplicar.style.display = 'none';
    });
});
