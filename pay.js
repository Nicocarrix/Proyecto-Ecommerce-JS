const tarjeta = document.querySelector('#tarjeta'),
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

const nombreDatos = document.querySelector('#grupo__nombreDatos'),
  emailDatos = document.querySelector('#grupo__emailDatos'),
  telefonoDatos = document.querySelector('#grupo__telefonoDatos'),
  cuotas = document.querySelector('#inputCuotas');

const cancelar = document.getElementById('cancelar');

// * Recuperacion de carrito

cart = JSON.parse(localStorage.getItem('carrito'));

// * Input nombre Datos

formulario.inputNombreDatos.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formulario.inputNombreDatos.value = valorInput.replace(/[0-9]/g, '');
});

// * Input telefono Datos

formulario.telefonoDatos.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  formulario.telefonoDatos.value = valorInput.replace(/\s/g, '').replace(/\D/g, '');
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
    //Form Tarjeta
    numeroTarjeta: false,
    nombreTarjeta: false,
    mesTarjeta: false,
    yearTarjeta: false,
    ccvTarjeta: false,
    //Form Datos
    nombreDatos: false,
    emailDatos: false,
    telefonoDatos: false,
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
  emailDatos: /\w+@\w+\.com/,
  telefonoDatos: /^\d{11}$/,
};

let datos = {
  //Form Tarjeta
  numeroTarjeta: false,
  nombreTarjeta: false,
  mesTarjeta: false,
  yearTarjeta: false,
  ccvTarjeta: false,
  //Form Datos
  nombreDatos: false,
  emailDatos: false,
  telefonoDatos: false,
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
    case 'nombreDatos':
      validarCampo(expresiones.nombreDatos, e.target, 'nombreDatos');
      break;
    case 'emailDatos':
      validarCampo(expresiones.emailDatos, e.target, 'emailDatos');
      break;
    case 'telefonoDatos':
      validarCampo(expresiones.telefonoDatos, e.target, 'telefonoDatos');
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
  if (
    datos.nombreDatos
    /* 
    datos.nombreTarjeta &&
    datos.numeroTarjeta &&
    datos.ccvTarjeta &&
    datos.mesTarjeta &&
    datos.yearTarjeta &&
    datos.emailDatos &&
    datos.telefonoDatos */
  ) {
    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
    });

    let precios = nPrecio / cuotas.value;

    swal({
      title: 'Compra exitosa!',
      text: `     Total abonado: ${cuotas.value} Cuot. de $${Math.trunc(precios)},
      Confirmacion de compra enviado a su correo electronico`,
      icon: 'success',
      buttons: {
        catch: {
          text: 'OK',
          value: 'catch',
        },
      },
    }).then((value) => {
      switch (value) {
        case 'catch':
          window.location.href = '/index.html';
          break;

        default:
          window.location.href = '/index.html';
      }
    });

    cart.length = 0;

    total();
    renderCart();
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

const cancel = () => {
  cancelar.addEventListener('click', (e) => {
    item = cart.findIndex((obj) => obj.cantidad >= 1);
    cart[item].cantidad = 1;
    cart.splice(0);

    localStorage.setItem('carrito', JSON.stringify(cart));

    total();
    renderCart();
  });
};

console.log(cart);

const total = () => {
  let priceTotal = document.getElementById('total-id');

  nPrecio = Object.values(cart).reduce((acc, { cantidad, price }) => acc + cantidad * price, 0);
  priceTotal.textContent = `Total: $${nPrecio}`;

  renderCart();
};

const renderCart = () => {
  let html = '';
  for (let i = 0; i < cart.length; i++) {
    html =
      html +
      `
    <div class="cart__add-child">
    <img class="img__cart-checkout" src="${cart[i].img}"/>
    <div class="name__price-checkout">
    <p class="style-cart">${cart[i].name}</p> 
    <p id="price">$${cart[i].price}</p>
    </div>
    <p class="cantindad__cart-checkout" id="${cart[i].id}">${cart[i].cantidad} Und.</p> 
    <a class="cart link-light" id="remove" onclick="removeCart(${cart[i].id});">X</a>
    </div>
    `;
  }
  document.getElementById('cart-js').innerHTML = html;
  localStorage.setItem('carrito', JSON.stringify(cart));
};

const removeCart = (cartId) => {
  const item = cart.find((cart) => cart.id === cartId);
  const indice = cart.indexOf(item);

  if (item) {
    const restar = cart.map((carts) => {
      if (carts.id === cartId) {
        carts.cantidad--;

        if (carts.cantidad === 0) {
          cart.splice(indice, 1);
          carts.cantidad = 1;
        }
        renderCart();
      }
    });
  }

  location.reload();

  localStorage.setItem('carrito', JSON.stringify(cart));
  total();
  renderCart();
};

if (cart.length === 0) {
  window.location.href = '/index.html';
}

// * Cuotas
const cuotasFunction = () => {
  for (let i = 1; i <= 3; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    let precios = nPrecio / opcion.value;
    opcion.textContent = i + ` Cuot. de $${Math.trunc(precios)}`;

    formulario.inputCuotas.appendChild(opcion);
  }
};

cancel();
total();
renderCart();
cuotasFunction();
