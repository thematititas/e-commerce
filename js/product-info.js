var producto;
var comentarios;
var contador;
var prodRel;

function showProdRel(array){
    let contenido = "";

        contenido += `
        <a href="product-info.html" class="list-group-item list-group-item-action" onclick="ID(`+ array.id +`)">
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + array.images[0] + `" alt="">
            </div>
        </div>
        `

        document.getElementById("prodRel").innerHTML = contenido;
}



function showImages(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        contenido += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("Imagen").innerHTML = contenido;
    }
}

function showStars(numero) {
    let Stars = "";
    for (let i = 0; i < numero; i++) {
        Stars += '<span class="fa fa-star checked"></span>'
    }
    for (let i = 0; i < (5 - numero); i++) {
        Stars += '<span class="fa fa-star"></span>'
    }
    return Stars;
}

function calificar(item) {
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

function ID(id) {
    localStorage.setItem('id',JSON.stringify({productId : id}));
 }

function showComentario(coment) {

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

function today() {
    var f = new Date();
    var res = f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
    return res;
}



function newObject(txt) {
    var obj = {
        user: localStorage.getItem('nameUsuario'),
        description: txt,
        dateTime: today(),
        score: contador
    };
    return obj;
}

function limpiar() {
    document.getElementById("texto").value = "";
    for (let i = 0; i < 5; i++) {
        document.getElementById((i + 1) + "estrella").style.color = "black";
    }
}


document.addEventListener("DOMContentLoaded", function (e) {



    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            result.data.forEach(coment => {
                if (coment.id == JSON.parse(localStorage.getItem('id')).productId) {
                    comentarios = coment.comentario;
                }
            });
        }

        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
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

                        resultObj.data.forEach(productos => {
                            producto.relatedProducts.forEach(rP => {
                                if (productos.id == rP) {
                                    showProdRel(productos);
                                }
                            });
                        });

                        comentarios.forEach(comentario => {
                            showComentario(comentario);
                        });

                        var usu = localStorage.getItem('nameUsuario');
                        if (usu) {
                            showTucomentario()
                        }
                    }
                });
            }
        });
    });
    document.getElementById("boton").addEventListener("click", function () {

        if (localStorage.getItem('nameUsuario')) {
            if (document.getElementById("texto").value) {
                if (contador) {
                    showComentario(newObject(document.getElementById("texto").value));
                    limpiar();
                    Swal.fire({
                        title: 'Gracias por tu comentario',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                    });
                } else {
                    Swal.fire({
                        title: 'Debe poner una calificación primero',
                        icon: 'warning',
                        confirmButtonText: 'Cerrar',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Para publicar debe hacer algun comentario',
                    icon: 'warning',
                    confirmButtonText: 'Cerrar',
                });
            };
        } else {
            Swal.fire({
                title: 'Debes estar logeado para hacer un comentario.',
                html: '<a href="index.html">Haz click aquí para logearte</a>',
                icon: 'error',
                confirmButtonText: 'Cerrar',
            });
        }
    });
});