let cart = [] || localStorage.getItem('carrito');
let productsArray = [];
const containerProducts = document.getElementById('cards-js');
const conatinerCart = document.getElementById('cart-js');
const priceTotal = document.getElementById('total-id');
const vaciarCart = document.getElementById('vaciar');
const finalizarCompra = document.getElementById('finalizar');
const nav = document.querySelector('nav');

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
      cards.textContent.toLowerCase().includes(event.target.value.toLowerCase()) ? cards.classList.remove('filtro') : cards.classList.add('filtro');
    });
});

const addButton = () => {
  Toastify({
    text: 'Agregado al carrito',
    duration: 3000,
    newWindow: false,
    gravity: 'bottom', // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: '#c0e218',
    },
  }).showToast();
};

vaciarCart.addEventListener('click', (e) => {
  if (cart.length === 0) {
    Toastify({
      text: 'Nada que vaciar, agregue productos',
      duration: 3000,
      newWindow: false,
      gravity: 'bottom', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#ff0e0e',
      },
    }).showToast();
  } else {
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
  }

  item = cart.findIndex((obj) => obj.cantidad >= 1);
  cart[item].cantidad = 1;
  cart.splice(0);

  localStorage.setItem('carrito', JSON.stringify(cart));
  total();
  renderCart();
});

window.addEventListener('load', () => {
  new Glider(document.getElementById('carousel-js'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    duration: 1,
    dots: '.carousel__indicadores',
    arrows: {
      prev: '.carousel__anterior',
      next: '.carousel__siguiente',
    },
    rewind: true,
    scrollPropagate: true,
    scrollLockDelay: 250,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          duration: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          duration: 1,
        },
      },
    ],
  });

  let glider = new Glider(document.getElementById('carousel-js'), {});

  const carouselTempo = () => {
    setTimeout(() => {
      glider.scrollItem('0', true);
    }, 1000);
    setTimeout(() => {
      glider.scrollItem('1', true);
    }, 4000);
    setTimeout(() => {
      glider.scrollItem('2', true);
    }, 8000);
    setTimeout(() => {
      glider.scrollItem('3', true);
    }, 12000);
  };

  carouselTempo();

  setInterval(() => {
    carouselTempo();
  }, 15000);
});

finalizarCompra.addEventListener('click', (e) => {
  if (cart.length === 0) {
    Toastify({
      text: 'Carrito vacio, agregue productos!',
      duration: 3000,
      newWindow: false,
      gravity: 'bottom', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: '#ff0e0e',
      },
    }).showToast();
  } else {
    window.location.href = 'pay.html';
  }
});

// CODIGO ESTATICO

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

const renderCarousel = () => {
  fetch('img.json')
    .then((res) => res.json())
    .then((caro) => {
      console.log('API local en funcionamietno');
      let html = '';
      for (let i = 0; i < 4; i++) {
        html =
          html +
          `
        <div class="carousel__elemento">
          <img class="carousel__img" src="${caro[i].img}"/>
        </div>
        `;
      }

      document.getElementById('carousel-js').innerHTML = html;
    })
    .catch((e) => {
      console.log('Error');
      console.log(e);
    });
};

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
  fetch('data.json')
    .then((res) => res.json())
    .then((json) => {
      console.log('API local en funcionamietno');

      for (const productos of json) {
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
    })
    .catch((e) => {
      console.log('Error');
      console.log(e);
    });
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
  fetch('data.json')
    .then((res) => res.json())
    .then((products) => {
      console.log('API local en funcionamietno(renderCart)');
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
    })
    .catch((e) => {
      console.log('Error');
      console.log(e);
    });
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
  fetch('data.json')
    .then((res) => res.json())
    .then((products) => {
      console.log('API local en funcionamietno (Filtrar)');

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
    })
    .catch((e) => {
      console.log('Error');
      console.log(e);
    });

  renderCart();
};

//Llamada a Funciones

renderCarousel();
renderBrowser();
renderProducts();
renderColorFilter();
renderCart();
total();
filtrar();
