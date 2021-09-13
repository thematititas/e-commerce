var producto;
var comentario;


function showProduct(product, comments) {

    let content = "";
    let img = "";

    content += `<a href="product-info.html" class="list-group-item list-group-item-action" onclick="ID(` + product.id + `)">
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
`;
    document.getElementById("cat-list-container").innerHTML = content;


}



document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            comentario = result.data;
        }

        getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                resultObj.data.forEach(product => {
                    if (product.id == JSON.parse(localStorage.getItem('id')).productId) {
                        producto = product;
                        showProduct(producto, comentario);
                    }
                });
            }
        });
    });
});