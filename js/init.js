const CATEGORIES_URL = "https://raw.githubusercontent.com/thematititas/e-commerce/master/json/category.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://raw.githubusercontent.com/thematititas/e-commerce/master/json/category-info.json";
const PRODUCTS_URL = "https://raw.githubusercontent.com/thematititas/e-commerce/master/json/productos.json";
const PRODUCT_INFO_URL = "https://raw.githubusercontent.com/thematititas/e-commerce/master/json/productos-info.json";
const PRODUCT_INFO_COMMENTS_URL = "https://raw.githubusercontent.com/thematititas/e-commerce/master/json/productos-comentarios.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

function signOff() {
  localStorage.removeItem("nameUsuario");
}
function IDcate(id) { //funcion para modificar el id del localStorage
  localStorage.setItem('category-id', JSON.stringify({ categoryId: id }));
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. 
document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("urls").innerHTML += `
  <div class="dropdown">
  <a class="py-2 d-none d-md-inline-block" id="produ" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos</a>
  <div class="dropdown-menu" aria-labelledby="produ">
          <a class="dropdown-item" href="products.html" onclick="IDcate('Autos')">Autos</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Celulares')">Celulares</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Computadoras')">Computadoras</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Deporte')">Deporte</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Electrodomésticos')">Electrodomésticos</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Herramientas')">Herramientas</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Jugutes')">Juguetes</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Muebles')">Muebles</a>
          <a class="dropdown-item" href="products.html" onclick="IDcate('Vestimenta')">Vestimenta</a>
        </div>
      </div>
  <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
  `;
  var usu = localStorage.getItem('nameUsuario');
  if (usu) {
    document.getElementById("urls").innerHTML += `
      <div class="dropdown">
        <a class="py-2 d-none d-md-inline-block" id="usuario" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">` + usu + `</a>
        <div class="dropdown-menu" aria-labelledby="usuario">
          <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <a class="dropdown-item" href="index.html" onclick="signOff()">Cerrar sesión</a>
        </div>
      </div>
    `
  };
});


