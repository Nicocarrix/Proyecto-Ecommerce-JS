const tarjeta = document.querySelector('#tarjeta'),
  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
  formulario = document.querySelector('#formulario-tarjeta'),
  numeroTarjeta = document.querySelector('#tarjeta .numero'),
  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
  logoMarca = document.querySelector('#logo-marca'),
  firma = document.querySelector('#tarjeta .firma p'),
  mesExpiracion = document.querySelector('#tarjeta .mes'),
  yearExpiracion = document.querySelector('#tarjeta .year'),
  ccv = document.querySelector('#tarjeta .ccv'),
  inputs = document.querySelectorAll('#formulario-tarjeta input'),
  btnEnviar = document.getElementById('btnEnviar');

const formDatos = document.querySelector('#formulario-datos'),
  nombreDatos = document.querySelector('#grupo__nombre'),
  emailDatos = document.querySelector('#grupo__email'),
  telefonoDatos = document.querySelector('#grupo__telefono'),
  cuotasDatos = document.querySelector('#grupo__cuotas');

const limpiarHtml = () => {
  firma.textContent = '';
  numeroTarjeta.textContent = '#### #### #### ####';
  nombreTarjeta.textContent = '';
  mesExpiracion.innerHTML = `MM`;
  yearExpiracion.innerHTML = `AA`;
  ccv.textContent = '';
};

// * Input nombre Datos

formDatos.inputNombreDatos.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formDatos.inputNombreDatos.value = valorInput.replace(/[0-9]/g, '');
});

// * Input telefono Datos

formDatos.inputTelefono.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formDatos.inputTelefono.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');
});

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
  if (tarjeta.classList.contains('active')) {
    tarjeta.classList.remove('active');
  }
};

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
  tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
  btnAbrirFormulario.classList.toggle('active');
  formulario.classList.toggle('active');
});

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '')
    // Ponemos espacio cada cuatro numeros
    .replace(/([0-9]{4})/g, '$1 ')
    // Elimina el ultimo espaciado
    .trim();

  numeroTarjeta.textContent = valorInput;

  if (valorInput == '') {
    numeroTarjeta.textContent = '#### #### #### ####';

    logoMarca.innerHTML = '';
  }

  if (valorInput[0] === 4) {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = 'img/logos/visa.png';
    logoMarca.appendChild(imagen);
  } else if (valorInput[0] === 5) {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = 'img/logos/mastercard.png';
    logoMarca.appendChild(imagen);
  }

  // Volteamos la tarjeta para que el usuario vea el frente.
  mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;

  if (valorInput == '') {
    nombreTarjeta.textContent = 'Jhon Doe';
  }

  mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
  mesExpiracion.textContent = e.target.value;
  mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
  mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
  if (!tarjeta.classList.contains('active')) {
    tarjeta.classList.toggle('active');
  }

  formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, '')
    // Eliminar las letras
    .replace(/\D/g, '');

  ccv.textContent = formulario.inputCCV.value;
});

// * Validacion de datos

const date = () => {
  datos = {
    numeroTarjeta: false,
    nombreTarjeta: false,
    mesTarjeta: false,
    yearTarjeta: false,
    ccvTarjeta: false,
  };
};

const expresiones = {
  // Form Tarjeta
  numeroTarjeta: /\d{4}\s\d{4}\s\d{4}\s\d{4}/, // numeros
  nombreTarjeta: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // letras
  mesTarjeta: /\d\d/,
  yearTarjeta: /^\d{4}$/,
  ccvTarjeta: /^\d{3}$/,
  // Form Datos
  nombreDatos: /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
  // emailDatos:
};

let datos = {
  numeroTarjeta: false,
  nombreTarjeta: false,
  mesTarjeta: false,
  yearTarjeta: false,
  ccvTarjeta: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case 'numeroTarjeta':
      validarCampo(expresiones.numeroTarjeta, e.target, 'numeroTarjeta');
      break;
    case 'nombreTarjeta':
      validarCampo(expresiones.nombreTarjeta, e.target, 'nombreTarjeta');

      break;
    case 'ccvTarjeta':
      validarCCV(expresiones.ccvTarjeta, e.target, 'ccvTarjeta');
      break;
    case 'mesTarjeta':
      validarCCV(expresiones.mesTarjeta, e.target, 'mesTarjeta');
      break;
    case 'yearTarjeta':
      validarCCV(expresiones.yearTarjeta, e.target, 'yearTarjeta');
      break;
  }
};

const validarCCV = (expresion, input, elemento) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${elemento}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${elemento}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${elemento} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${elemento} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${elemento} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    datos[elemento] = true;
  } else {
    document.getElementById(`grupo__${elemento}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${elemento}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${elemento} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${elemento} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${elemento} .formulario__input-error`).classList.add('formulario__input-error-activo');
    datos[elemento] = false;
  }
};

const validarCampo = (expresion, input, elemento) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${elemento}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${elemento}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${elemento} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${elemento} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__${elemento} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    datos[elemento] = true;

    console.log(datos);
  } else {
    document.getElementById(`grupo__${elemento}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${elemento}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${elemento} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${elemento} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__${elemento} .formulario__input-error`).classList.add('formulario__input-error-activo');
    datos[elemento] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  if (datos.numeroTarjeta && datos.nombreTarjeta && datos.ccvTarjeta && datos.mesTarjeta && datos.yearTarjeta) {
    formulario.reset();

    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
    });

    limpiarHtml();
    date();
  } else {
    Toastify({
      text: 'Llene los campos requeridos',
      duration: 2000,
      newWindow: false,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#ff0e0e',
      },
    }).showToast();
    document.querySelectorAll('.formulario__input-error, input').forEach((item) => {
      item.classList.add('formulario__input-error-activo');
    });
  }
});
