var producto;
var comentarios;
var contador;

function showProdRel(array) { // funcion para mostrar los productos relacionados
    let contenido = "";

    contenido += `
    <div class="col-md-4">
    <a href="categories.html" class="card mb-4 shadow-sm custom-card">
      <img class="bd-placeholder-img card-img-top"  src="`+array.images[0]+`">
      <h4 class="m-3">`+array.name+`</h4>
      <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">`+array.currency+` `+array.cost+`</h6>
      </div>
    </a>
  </div>
    `;
    document.getElementById("prodRel").innerHTML += contenido;
}

function showImages(array) { // funcion para mostrar imagenes

    let contenido = "";
    let contInd = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];
        let j = i;
        if (i == 0) { // if para activar el carrusel desde la primera imagen
            contenido += `
        <div class="carousel-item active">
      <img src="`+ images + `" class="d-block w-100 " alt="" width="" height="500">
    </div>
        `;
            contInd += `<li data-target="#carouselExampleFade" data-slide-to="0" class="active"></li>`

        } else { // luego de la primera se ira pasando el active para el resto
            contenido += `
        <div class="carousel-item ">
      <img src="`+ images + `" class="d-block w-100 " alt="" width="" height="500">
    </div>
        `;
            contInd += ` <li data-target="#carouselExampleFade" data-slide-to="` + j + `"></li>`
        }
    };
    document.getElementById("fotos").innerHTML += contenido;
    document.getElementById("indicadores").innerHTML += contInd;

}

function showStars(numero) { // funcion para mostrar estrellas
    let Stars = "";
    for (let i = 0; i < numero; i++) {
        Stars += '<span class="fa fa-star checked"></span>'
    }
    for (let i = 0; i < (5 - numero); i++) {
        Stars += '<span class="fa fa-star"></span>'
    }
    return Stars; // devuelve una variable con la cantidad(numero) de estrellas
}

function calificar(item) { //funcion para califacar estrellas en los comentarios
    contador = item.id[0];
    let nombre = item.id.substring(1);
    for (let i = 0; i < 5; i++) {
        if (i < contador) {
            document.getElementById((i + 1) + nombre).style.color = "orange";
        } else {
            document.getElementById((i + 1) + nombre).style.color = "black";
        }
    }
}

function ID(id) { //funcion para modificar el id del localStorage
    localStorage.setItem('id', JSON.stringify({ productId: id }));
}

function showComentario(coment) { //funcion para mostrar los comentarios
    let comentario = "";
    comentario += `
        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">`+ coment.user + `:</h4>
                        <small class="text-muted">` + coment.dateTime + `</small>
                    </div>
                    <p >` + coment.description + `</p>`
    comentario += showStars(coment.score) + `<hr>`;

    document.getElementById("comentarios").innerHTML += comentario;
}

function today() { // funcion para generar la hora actual del PC
    var f = new Date();
    var res = f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
    return res;
}

function newObject(txt) { // funcion para crear un objeto(nuevo comentario) con un usuario,hora actual,un texto y un score
    var obj = {
        user: localStorage.getItem('nameUsuario'),
        description: txt,
        dateTime: today(),
        score: contador
    };
    return obj;
}

function limpiar() { // funcion para limpiar la casilla de comentarios
    document.getElementById("texto").value = "";
    for (let i = 0; i < 5; i++) {
        document.getElementById((i + 1) + "estrella").style.color = "black";
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {//verificar el status de comentarios
        if (result.status === "ok") {
            result.data.forEach(coment => {
                if (coment.id == JSON.parse(localStorage.getItem('id')).productId) {
                    comentarios = coment.comentario;
                }
            });
        }

        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {//verifica el status de info
            if (resultObj.status === "ok") {
                resultObj.data.forEach(product => {
                    if (product.id == JSON.parse(localStorage.getItem('id')).productId) {
                        producto = product;

                        let nameHTML = product.name;
                        let descriptionHTML = product.description;
                        let soldCountHTML = product.soldCount;
                        let currencyHTML = product.currency;
                        let costHTML = product.cost;

                        document.getElementById("name").innerHTML = nameHTML;
                        document.getElementById("Description").innerHTML = descriptionHTML;
                        document.getElementById("Count").innerHTML = soldCountHTML;
                        document.getElementById("Cost").innerHTML = currencyHTML;
                        document.getElementById("Cost").innerHTML += " " + costHTML;

                        showImages(producto.images);

                        producto.relatedProducts.forEach(rP => {//recorre los PR y del arreglo principal muestra los productos
                            showProdRel(resultObj.data[rP - 1]);
                        });

                        comentarios.forEach(comentario => {//recorre los comentarios
                            showComentario(comentario);
                        });
                    }
                });
            }
        });
    });

    document.getElementById("boton").addEventListener("click", function () {

        if (localStorage.getItem('nameUsuario')) { // if estas logeado
            if (document.getElementById("texto").value) { // if comentaste
                if (contador) {// if calificaste
                    showComentario(newObject(document.getElementById("texto").value));
                    limpiar();
                    Swal.fire({
                        title: 'Gracias por tu comentario',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                    });
                } else {// else no calificaste
                    Swal.fire({
                        title: 'Debe poner una calificación primero',
                        icon: 'warning',
                        confirmButtonText: 'Cerrar',
                    });
                }
            } else {//no comentaste
                Swal.fire({
                    title: 'Para publicar debe hacer algun comentario',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar',
                });
            };
        } else {//no estas logeado
            Swal.fire({
                title: 'Debes estar logeado para hacer un comentario.',
                html: '<a href="index.html">Haz click aquí para logearte</a>',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    });
});