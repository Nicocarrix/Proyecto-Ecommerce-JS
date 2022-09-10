let cart = [];
let productsArray = [];
const containerProducts = document.getElementById('cards-js');
const conatinerCart = document.getElementById('cart-js');
const priceTotal = document.getElementById('total-id');
const vaciarCart = document.getElementById('vaciar');
const finalizarCompra = document.getElementById('finalizar');

// EVENTOS

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    cart = JSON.parse(localStorage.getItem('carrito'));
    total();
    renderCart();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.target.matches('#buscador'))
    document.querySelectorAll('.cards').forEach((cards) => {
      cards.textContent.toLowerCase().includes(event.target.value.toLowerCase())
        ? cards.classList.remove('filtro')
        : cards.classList.add('filtro');
    });
});

const addButton = () => {
  Toastify({
    text: 'Agregado al carrito',
    duration: 3000,
    newWindow: false,
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
};

vaciarCart.addEventListener('click', (e) => {
  Toastify({
    text: 'Carrito Vaciado',
    duration: 3000,
    newWindow: false,
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: '#ff0e0e',
    },
  }).showToast();

  item = cart.findIndex((obj) => obj.cantidad >= 1);
  cart[item].cantidad = 1;
  cart.pop();

  localStorage.setItem('carrito', JSON.stringify(cart));
  total();
  renderCart();
});

// CODIGO ESTATICO

const products = [
  {
    id: 0,
    name: 'BOTAS NIKE COURT VISION MID NBA ROJA',
    color: 'roja',
    price: 23099,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/b/o/botas-nike-court-vision-mid-nba-roja-510010dm1186600-1.jpg',
    category: 'hombre',
    category2: 'botas',
  },
  {
    id: 1,
    name: 'ZAPATILLAS NIKE SB BLZR COURT NEGRA',
    color: 'negra',
    price: 17619,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-nike-sb-blzr-court-negra-1-510010cv1658002-1.jpg',
    category: 'hombre',
    category2: 'casual',
  },
  {
    id: 2,
    name: 'ZAPATILLAS RUNNING NIKE AIR ZOOM AZUL',
    color: 'azul',
    price: 36299,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatilla-running-nike-air-zoom-pegasus-37-azul-510010bq9646400-1.jpg',
    category: 'hombre',
    category2: 'deporte',
  },
  {
    id: 3,
    name: 'ZAPATILLA ADIDAS COURT 80S ROJA',
    color: 'roja',
    price: 14399,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/1/0/100010ee9674001-1.jpg',
    category: 'hombre',
    category2: 'deporte',
  },
  {
    id: 4,
    name: 'ZAPATILLAS ADIDAS RUN 70S NEGRA',
    color: 'negra',
    price: 20999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-adidas-run-70s-negra-100010gx3090001-1.jpg',
    category: 'hombre',
    category2: 'deporte',
  },
  {
    id: 5,
    name: 'ZAPATILLAS ADIDAS RUN 70S AZUL',
    color: 'azul',
    price: 20999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-adidas-run-70s-azul-100010gx3091001-1.jpg',
    category: 'hombre',
    category2: 'deporte',
  },
  {
    id: 6,
    name: 'ZAPATILLAS PUMA SCUDERIA  MIRAGE ROJA',
    color: 'roja',
    price: 21449,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-puma-scuderia-ferrari-mirage-mox-roja-640010306769002-1.jpg',
    category: 'hombre',
    category2: 'casual',
  },
  {
    id: 7,
    name: 'ZAPATILLAS RUNNING PUMA FLYER FLEX NEGRA',
    color: 'negra',
    price: 12999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-running-puma-flyer-flex-negra-28299952-640010376491005-1.jpg',
    category: 'hombre',
    category2: 'casual',
  },
  {
    id: 8,
    name: 'ZAPATILLAS RUNNING PUMA FLYER FLEX AZUL',
    color: 'azul',
    price: 12999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-running-puma-flyer-flex-azul---640010376491006-1.jpg',
    category: 'hombre',
    category2: 'deporte',
  },
  {
    id: 9,
    name: 'ZAPATILLAS REEBOK CLASSIC BLANCA',
    color: 'blanca',
    price: 26099,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-reebok-classic-leather-blanca-46966745-111010gy0952001-1.jpg',
    category: 'hombre',
    category2: 'casual',
  },
  {
    id: 10,
    name: 'ZAPATILLA CONVERSE CHUCK TAYLOR ALL STAR CORE OX NEGRA',
    color: 'negra',
    price: 16999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/2/0/200010157196001-1.jpg',
    category: 'mujer',
    category2: 'casual',
  },
  {
    id: 11,
    name: 'ZAPATILLA CONVERSE CHUCK TAYLOR ALL STAR PLATFORM OX MUJER ROJA',
    color: 'roja',
    price: 20499,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/2/0/200010557145001-1.jpg',
    category: 'mujer',
    category2: 'botas',
  },
  {
    id: 12,
    name: 'ZAPATILLAS RUNNING PUMA COMET 2 ALT BETA MUJER GRIS',
    color: 'blanca',
    price: 14999,
    cantidad: 1,
    img: 'https://cdn.solodeportes.com.ar/media/catalog/product/cache/3cb7d75bc2a65211451e92c5381048e9/z/a/zapatillas-running-puma-comet-2-alt-beta-mujer-gris-16924690-640010195648007-1.jpg',
    category: 'mujer',
    category2: 'deporte',
  },
];

const categoryA = [
  {
    category: 'hombre',
  },

  {
    category: 'mujer',
  },

  {
    category: 'deporte',
  },

  {
    category: 'casual',
  },

  {
    category: 'botas',
  },
];

const color = [
  {
    color: 'Azul',
  },
  {
    color: 'Negro',
  },
  {
    color: 'Blanco',
  },
  {
    color: 'Rojo',
  },
];

//FUNCIONES

const renderColorFilter = () => {
  let html = '';
  for (let i = 0; i < color.length; i++) {
    html =
      html +
      `
    <li class="nav-main">
    <span class="color-filter nav-link link-dark ps-0 text-aling-center fw-normal" id="${color[i].color}"> ${color[i].color}</span>
    <ul class="nav-sub">
    <li>
    <a href="">sub1</a>
    </li>
    </ul>
    </li>
    
    
    `;
  }
  document.getElementById('color-js').innerHTML = html;
};

const renderBrowser = () => {
  let html = '';
  for (let i = 0; i < categoryA.length; i++) {
    html =
      html +
      `
    <li class="nav-main " id="filter-id">
      <span class="filter-category" id="${categoryA[i].category}"> ${categoryA[i].category}</span>
        <ul class="nav-sub">
          <li>
            <a href="">sub1</a>
          </li>
        </ul>
    </li>
    
    
    `;
  }
  document.getElementById('filter-js').innerHTML = html;
};

const renderProducts = () => {
  for (const productos of products) {
    newCard = document.getElementById('cards-js');
    card = document.createElement('div');
    card.className = 'cards';
    card.innerHTML += `
    <img class="img-container" src="${productos.img}"/>
    <div class="add" >
    <p class="name">${productos.name}</p> 
    <p id="price">$${productos.price}</p>
    <a class="button-add link-light" id="buttonAdd" onclick="addToCart(${productos.id}); addButton();">Add to Cart</a>
    </div>`;

    newCard.appendChild(card);
  }
};

const array = () => {
  let html = '';

  for (let i = 0; i < productsArray.length; i++) {
    html =
      html +
      `
    <div class="cards">
    <img class="img-container" src="${productsArray[i].img}"/>
    <div class="add" >
    <p class="name">${productsArray[i].name}</p> 
    <p id="price">$${productsArray[i].price}</p>
    <a class="button-add link-light" id="button" onclick="addToCart(${productsArray[i].id}); addButton();">Add to Cart</a>
    </div>
    </div> 
    `;
    localStorage.setItem('carrito', JSON.stringify(cart));
  }

  document.getElementById('cards-js').innerHTML = html;
};

const renderCart = () => {
  let html = '';
  for (let i = 0; i < cart.length; i++) {
    html =
      html +
      `
      <div class="filter">
      <div class="add-child">
    <img class="img-cart" src="${cart[i].img}"/>
    <div class="name-price">
    <p class="style-cart">${cart[i].name}</p> 
    <p id="price">$${cart[i].price}</p>
    </div>
    <p class="cantindad-cart" id="${cart[i].id}">${cart[i].cantidad} Und.</p> 
    <a class="cart link-light" id="remove" onclick="removeCart(${cart[i].id});">X</a>
    </div>
    </div> 
    `;

    localStorage.setItem('carrito', JSON.stringify(cart));
  }
  document.getElementById('cart-js').innerHTML = html;
};

const addToCart = (id, price) => {
  const acumularP = cart.some((item) => item.id === id);

  if (acumularP) {
    const item = cart.map((item) => {
      if (item.id === id) {
        item.cantidad++;
        renderCart();
      }
    });
  } else {
    const foundProduct = products.find((item) => item.id === id);
    cart.push(foundProduct);
  }

  total();
  renderCart();
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

  localStorage.setItem('carrito', JSON.stringify(cart));
  total();
  renderCart();
};

const total = () => {
  nPrecio = Object.values(cart).reduce((acc, { cantidad, price }) => acc + cantidad * price, 0);
  priceTotal.textContent = `Total: $${nPrecio}`;

  renderCart();
};

const filtrar = () => {
  //Categoria Hombres

  const hombreFilter = document.querySelector('#hombre');
  const hombre = products.filter((item) => item.category === 'hombre');
  hombreFilter.textContent = `Hombre (${hombre.length})`;
  hombreFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = hombre;

    array();
    console.log(productsArray);
  });

  //Categoria Mujeres

  const mujerFilter = document.querySelector('#mujer');
  const mujer = products.filter((item) => item.category === 'mujer');

  mujerFilter.textContent = `Mujer (${mujer.length})`;
  mujerFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = mujer;

    array();
    console.log(productsArray);
  });

  // Categoria Deporte

  const deporteFilter = document.querySelector('#deporte');
  const deporte = products.filter((item) => item.category2 === 'deporte');

  deporteFilter.textContent = `Deporte (${deporte.length})`;
  deporteFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = deporte;

    array();
    console.log(productsArray);
  });

  // Categoria Casual

  const casualFilter = document.querySelector('#casual');
  const casual = products.filter((item) => item.category2 === 'casual');

  casualFilter.textContent = `Casual (${casual.length})`;
  casualFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = casual;

    array();
    console.log(productsArray);
  });

  // Categoria Botas

  const botasFilter = document.querySelector('#botas');
  const botas = products.filter((item) => item.category2 === 'botas');

  botasFilter.textContent = `Botas (${botas.length})`;
  botasFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = botas;

    array();
    console.log(productsArray);
  });

  // Filtro por Colores
  // Color Azul

  const azulFilter = document.querySelector('#Azul');
  const azul = products.filter((item) => item.color === 'azul');

  azulFilter.textContent = `Azul (${azul.length})`;
  azulFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = azul;

    array();
    console.log(productsArray);
  });

  // Color Negro

  const negroFilter = document.querySelector('#Negro');
  const negro = products.filter((item) => item.color === 'negra');

  negroFilter.textContent = `Negro (${negro.length})`;
  negroFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = negro;

    array();
    console.log(productsArray);
  });

  // Color Blanco

  const blancoFilter = document.querySelector('#Blanco');
  const blanco = products.filter((item) => item.color === 'blanca');

  blancoFilter.textContent = `Blanco (${blanco.length})`;
  blancoFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = blanco;

    array();
    console.log(productsArray);
  });

  // Color Rojo

  const rojoFilter = document.querySelector('#Rojo');
  const rojo = products.filter((item) => item.color === 'roja');

  rojoFilter.textContent = `Rojo (${rojo.length})`;
  rojoFilter.addEventListener('click', (e) => {
    e.preventDefault();
    productsArray = rojo;

    array();
    console.log(productsArray);
  });

  renderCart();
};

//Llamada a Funciones

renderBrowser();
renderProducts();
renderColorFilter();
renderCart();
total();
filtrar();
