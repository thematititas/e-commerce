var producto;
var comentarios;


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



document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            result.data.forEach(Coment =>{
                if (coment.id == JSON.parse(localStorage.getItem('id')).productId){
                    comentarios = coment;
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
                        comentarios.forEach(comentario => {
                            showComentario(comentario);
                        });

                    }
                });
            }
        });
    });
});