var precioEnvio = 15;
let cantTotal = 0;
let total = 0;
let contador = 0;
let formu = document.getElementById("formulario1FB");
function cambiar(num) {
    if (num == 1) {
        document.getElementById("formulario1").removeAttribute("disabled");
        document.getElementById("formulario2").setAttribute("disabled", "");
        formu.classList.remove('was-validated')
        formu = document.getElementById("formulario1FB");

    } else {
        document.getElementById("formulario2").removeAttribute("disabled");
        document.getElementById("formulario1").setAttribute("disabled", "");
        formu.classList.remove('was-validated')
        formu = document.getElementById("formulario2");
    }
}

function envio(num) {
    precioEnvio = num;
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById("envio").innerHTML = Math.round((total * num) / 100)
    preciofinal();
}
function preciofinal() {
    let total = parseInt(document.getElementById('total').innerText);
    let envio = parseInt(document.getElementById('envio').innerText);
    document.getElementById("boleta").innerHTML = total + envio;
}

function aumentar(cant, pre) {
    let cantPro = parseInt(document.getElementById(`producto${cant}`).innerText);
    document.getElementById(`producto${cant}`).innerHTML = cantPro + 1;
    let precio = parseInt(document.getElementById(`precio${cant}`).innerText);
    document.getElementById(`precio${cant}`).innerHTML = precio + pre;
    let cantTot = parseInt(document.getElementById('cantidadTotal').innerText);
    document.getElementById('cantidadTotal').innerHTML = cantTot + 1;
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerHTML = total + pre;
    document.getElementById('final').innerHTML = total + pre;
    envio(precioEnvio);
}
function restar(cant, pre) {
    let cantPro = parseInt(document.getElementById(`producto${cant}`).innerText);
    if (cantPro != 0) {
        document.getElementById(`producto${cant}`).innerHTML = cantPro - 1;
        let precio = parseInt(document.getElementById(`precio${cant}`).innerText);
        document.getElementById(`precio${cant}`).innerHTML = precio - pre;
        let cantTotal = parseInt(document.getElementById('cantidadTotal').innerText);
        document.getElementById('cantidadTotal').innerHTML = cantTotal - 1;
        let total = parseInt(document.getElementById('total').innerText);
        document.getElementById('total').innerHTML = total - pre;
        document.getElementById('final').innerHTML = total - pre;
        envio(precioEnvio);
    }
}


function showCuotas() {
    let precio = parseInt(document.getElementById('boleta').innerText);
    let content = `<option> 1 x $ ${Math.round(precio)}</option>
    <option> 2 x $ ${Math.round(precio / 2)}</option>
    <option> 3 x $ ${Math.round(precio / 3)}</option>`
    let content2 = "$ " + precio;
    document.getElementById('cuotas').innerHTML = content;
    document.getElementById('monto_TB').value = content2;

}

function eliminar(cant) {
    let cantPro = parseInt(document.getElementById(`producto${cant}`).innerText);
    let precio = parseInt(document.getElementById(`precio${cant}`).innerText);
    let cantTotal = parseInt(document.getElementById('cantidadTotal').innerText);
    document.getElementById('cantidadTotal').innerHTML = cantTotal - cantPro;
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerHTML = total - precio;
    document.getElementById("final").innerHTML = total - precio;
    document.getElementById(`tr${cant}`).innerHTML = "";
    envio(precioEnvio);
}

function showArray(productos) {
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

        let content = `<tr id="tr${contador}"> 
                <th scope="col">${contador}</th>
                <td scope="col"><img style="width:40px;height:40px;"  src="${product.src}"></td>
                <td scope="col" >${product.name}</td>
                <td scope="col" id="producto${contador}">${product.count}</td>
                <td scope="col">
                <button onclick="aumentar(${contador},${monto})"class="btn btn-info btn-sm">    +   </button>
                <button onclick="restar(${contador},${monto})" class="btn btn-danger btn-sm">    -  </button></td>
                <td scope="col">$ ${product.currency} ${product.unitCost}</td>
                </td>
                <td scope="col"> $  UYU <span id="precio${contador}">${precio}</span></td>
                <td scope="col">
                <button onclick="eliminar(${contador})" class="btn btn-danger btn-sm"> x  </button></td>
            </tr>`
        document.getElementById("items").innerHTML += content;
    }
}
function showTotal() {
    let content = `<tr> 
            <th scope="col"></th>
            <td scope="col"></td>
            <th scope="col" >Total productos</th>
            <td scope="col" id="cantidadTotal">${cantTotal}</td>          
            <td scope="col"><button class="btn btn-danger btn-sm" onclick="vaciarCarrito()" id="vaciar-carrito"> vaciar todo </button></td>
            <th scope="col">Precio total</th>
            <td scope="col" > $ UYU <span id="total">${total}</span></td>
        </tr>`
    document.getElementById("totalProductos").innerHTML = content;
    document.getElementById("final").innerHTML = total;


}
function vaciarCarrito() {
    let content = `<tr>
        <th scope="col">-</th>
        <td scope="col">-</td>
        <td scope="col">#Carrito Vacio</td>
        <td scope="col">-</td>
        <td scope="col">-</td>
        <td scope="col">-</td>
        <td scope="col">$ 0</td>
    </tr>`
    document.getElementById("items").innerHTML = content;
    document.getElementById("final").innerHTML = 0;
    document.getElementById('total').innerHTML = 0;
    document.getElementById('cantidadTotal').innerHTML = "-";
    envio(precioEnvio);
}
(function () {
    'use strict'
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        var bandera = false

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                    var formA1 = document.getElementById('calle').value;
                    var formA2 = document.getElementById('numero').value;
                    var formA3 = document.getElementById('esq').value;
                    if (formA1 != "" && formA2 != "" && formA3 != "") {
                        bandera = true;
                    }
                if (form.checkValidity() === false || bandera==false) {
                    
                  
                    event.preventDefault();
                    event.stopPropagation();
                    if(bandera == false){
                        Swal.fire({
                            title:"Error",
                            icon: 'error',
                            text:"Completa los campos de afuera antes de enviar.",
                        });
                    }
                
                }
                formu.classList.add('was-validated');
                document.getElementById('formularioAFuera').classList.add('was-validated')
            }, false);
        });
    }, false);
})();

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            showArray(result.data.articles);
            if (JSON.parse(localStorage.getItem('carrito'))) {
                showArray(JSON.parse(localStorage.getItem('carrito')))
            }
            showTotal();
            envio(precioEnvio);
        }
    });

});