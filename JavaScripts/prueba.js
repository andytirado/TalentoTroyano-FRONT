const screens = document.querySelectorAll('.screen');
const nuevaVacanteBtn = document.getElementById('nuevaVacanteBtn');
const toStep2 = document.getElementById('toStep2');
const toStep3 = document.getElementById('toStep3');
const publicarBtn = document.getElementById('publicarBtn');
const volverInicio = document.getElementById('volverInicio');
const backToStep1 = document.getElementById('backToStep1');
const backToStep2 = document.getElementById('backToStep2');

function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

nuevaVacanteBtn.addEventListener('click', () => showScreen('step1'));

toStep2.addEventListener('click', () => {
  const required = ['titulo','contratacion','horario','modalidad','correo','ubicacion','salario'];
  for (let id of required) {
    if (document.getElementById(id).value.trim() === '') {
      alert('Por favor llena todos los campos antes de continuar.');
      return;
    }
  }
  showScreen('step2');
});

backToStep1.addEventListener('click', () => showScreen('step1'));

toStep3.addEventListener('click', () => {
  if (document.getElementById('descripcion').value.trim() === '' || 
      document.getElementById('requisitos').value.trim() === '') {
    alert('Completa todos los campos antes de continuar.');
    return;
  }

  // Mostrar resumen
  const resumen = `
    <strong>${document.getElementById('titulo').value}</strong><br>
    Contratación: ${document.getElementById('contratacion').value}<br>
    Horario: ${document.getElementById('horario').value}<br>
    Modalidad: ${document.getElementById('modalidad').value}<br>
    Ubicación: ${document.getElementById('ubicacion').value}<br>
    Salario: ${document.getElementById('salario').value}<br><br>
    Descripción: ${document.getElementById('descripcion').value}<br>
    Requisitos: ${document.getElementById('requisitos').value}
  `;
  document.getElementById('resumenTexto').innerHTML = resumen;
  showScreen('step3');
});

backToStep2.addEventListener('click', () => showScreen('step2'));

publicarBtn.addEventListener('click', () => {
  showScreen('success');
});

volverInicio.addEventListener('click', () => {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById('admin').classList.add('active');
});
