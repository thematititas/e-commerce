function aumentar(cant, pre) {
    let cantPro = parseInt(document.getElementById(`producto${cant}`).innerText);
    document.getElementById(`producto${cant}`).innerHTML = cantPro + 1;
    let precio = parseInt(document.getElementById(`precio${cant}`).innerText);
    document.getElementById(`precio${cant}`).innerHTML = precio + pre;
    let cantTot = parseInt(document.getElementById('cantidadTotal').innerText);
    document.getElementById('cantidadTotal').innerHTML = cantTot + 1;
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerHTML = total + pre;
}
function restar(cant, pre) {
    let cantPro = parseInt(document.getElementById(`producto${cant}`).innerText);
    document.getElementById(`producto${cant}`).innerHTML = cantPro - 1;
    let precio = parseInt(document.getElementById(`precio${cant}`).innerText);
    document.getElementById(`precio${cant}`).innerHTML = precio - pre;
    let cantTotal = parseInt(document.getElementById('cantidadTotal').innerText);
    document.getElementById('cantidadTotal').innerHTML = cantTotal - 1;
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerHTML = total - pre;
}

function showCuotas(){
    let precio = parseInt(document.getElementById('total').innerText);
    let content = `<option> 1 x $ ${Math.round(precio)}</option>
    <option> 2 x $ ${Math.round(precio/2)}</option>
    <option> 3 x $ ${Math.round(precio/3)}</option>`
    document.getElementById('cuotas').innerHTML = content;
}


function showArray(productos) {

    let cantTotal = 0;
    let total = 0;
    let contador = 0;
    for (let i = 0; i < productos.length; i++) {
        let product = productos[i];
        contador++;
        let monto = product.unitCost;
        if (product.currency == "USD") {
            monto = monto * 40;
        }
        let precio = monto * product.count;
        cantTotal += product.count;
        total += precio;
        let content = `<tr> 
                <th scope="col">${contador}</th>
                <td scope="col"><img style="width:40px;height:40px;"  src="${product.src}"></td>
                <td scope="col">${product.name}</td>
                <td scope="col" id="producto${contador}">${product.count}</td>
                <td scope="col">
                <button onclick="aumentar(${contador},${monto})"class="btn btn-info btn-sm">    +   </button>
                <button onclick="restar(${contador},${monto})" class="btn btn-danger btn-sm">    -  </button>
                <td scope="col">$ ${product.currency} ${product.unitCost}</td>
                </td>
                <td scope="col"> $ <span id="precio${contador}" > UYU ${precio}</span></td>
            </tr>`
            document.getElementById("items").innerHTML += content;
    }
    let content2 = `<tr> 
            <th scope="col"></th>
            <td scope="col"></td>
            <th scope="col" >Total productos</th>
            <td scope="col" id="cantidadTotal">${cantTotal}</td>          
            <td scope="col"><button class="btn btn-danger btn-sm" onclick="vaciarCarrito()" id="vaciar-carrito"> vaciar todo </button></td>
            <th scope="col">Precio total</th>
            <td scope="col" > $ <span id="total"> UYU ${total}</span></td>
        </tr>`
        document.getElementById("totalProductos").innerHTML = content2;

}
function vaciarCarrito(){
    let content =`<tr>
        <th scope="col">-</th>
        <td scope="col">-</td>
        <td scope="col">#Carrito Vacio</td>
        <td scope="col">-</td>
        <td scope="col">-</td>
        <td scope="col">-</td>
        <td scope="col">$ 0</td>
    </tr>`
    document.getElementById("items").innerHTML = content;

    let a = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerHTML = 0;
    let b = parseInt(document.getElementById('cantidadTotal').innerText);
    document.getElementById('cantidadTotal').innerHTML = "-";
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            showArray(result.data.articles);
        }
    });
    document.getElementById("comprass").addEventListener("click", function () {
       showCuotas();
    });

});