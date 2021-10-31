//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productarray = [];
var minPrice = undefined;
var maxPrice = undefined;
var condition = 1;
var buscar;
const $miCheckbox = document.querySelector("#Autos");
function sortArray(Array) { //funcion para ordenar el filtrado
    if (condition === 1) {
        Array.sort(function (a, b) { return a.cost - b.cost });
    } else if (condition === -1) {
        Array.sort(function (a, b) { return b.cost - a.cost });
    } else {
        Array.sort(function (a, b) { return b.soldCount - a.soldCount });
    }
}
function IDprod(id) {// funcion para modificar el ID del localStorage
    localStorage.setItem('product-id', JSON.stringify({ productId: id }));
}
function showArray(Array) {// funcion para mostrar el arreglo
    let contents = "";

    sortArray(Array);
    buscar = document.getElementById("mytext");

    for (let i = 0; i < Array.length; i++) {
        let product = Array[i];

        if (((minPrice == undefined) || (parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (parseInt(product.cost) <= maxPrice))) {

            if ((product.name.toLowerCase().includes(buscar.value.toLowerCase())) || (buscar.value === "")) {
                contents += `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card mb-3">
                            <a href="product-info.html" class="card shadow-sm custom-card" onclick="IDprod('`+ product.name + `')">
                                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">`+ product.name + `</h5>
                                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                                        <p class="card-text">` + product.description + `<p class="card-text">    
                                    </div>
                                    <div class="card-footer">
                                        <h5 class="card-text text-center">` + product.currency + "  " + product.cost + `</h5>
                                    </div>
                            </a>
                        </div>
                    </div>
                `
            }
        }

    }
    document.getElementById("cat-list-container").innerHTML = contents;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            result.data.forEach(product => {
                if (product.category == JSON.parse(localStorage.getItem('category-id')).categoryId) {
                    productarray = product.array;
                    document.querySelector("#Autos").checked = true;
                    showArray(productarray);
                    
                }
            });
        }
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "")) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "")) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showArray(productarray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        maxPrice = undefined;
        minPrice = undefined;

        showArray(productarray);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        condition = 1;
        showArray(productarray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        condition = -1;
        showArray(productarray);
    });

    document.getElementById("sortRelev").addEventListener("click", function () {
        condition = 0;
        showArray(productarray);
    });

    document.getElementById("mytext").addEventListener('input', function () {
        showArray(productarray);
    });
    
    document.getElementById("Autos").addEventListener('input', function () {
        if(document.querySelector("#Autos").checked){
        alert(1);
        } else {
            alert(2);
        }
    });
});