//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productarray = [];
var minPrice = undefined;
var maxPrice = undefined;
var condition = 1;
var buscar;

function sortArray(Array) {
    if (condition === 1) {
        Array.sort(function (a, b) { return a.cost - b.cost });
    } else if (condition === -1) {
        Array.sort(function (a, b) { return b.cost - a.cost });
    } else {
        Array.sort(function (a, b) { return b.soldCount - a.soldCount });
    }
}
function ID(id) {
   localStorage.setItem('id',JSON.stringify({productId : id}));
}
function showArray(Array) {
    let contents = "";

    sortArray(Array);
    buscar = document.getElementById("mytext");

    for (let i = 0; i < Array.length; i++) {
        let product = Array[i];

        if (((minPrice == undefined) || (parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (parseInt(product.cost) <= maxPrice))) {

            if ((product.name.toLowerCase().includes(buscar.value.toLowerCase())) || (buscar.value === "")) {
                contents += `
        <a href="product-info.html" class="list-group-item list-group-item-action" onclick="ID(`+ product.id +`)">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p> 
                    <br>
                    <h5 class="mb-1">` + product.currency + "  " + product.cost + `</h5>
                </div>  
            </div>
        </a>
        `
            }
        }

    }
    document.getElementById("cat-list-container").innerHTML = contents;
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            productarray = result.data;

            showArray(productarray);
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
});