//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("sudmit").addEventListener("click",function() {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let complete = true;
        let usuario = null;

        if (inputEmail.value === "") {
            inputEmail.classList.add("invalid");
            complete = false;
        } else {
            inputEmail.classList.remove("invalid");
        }

        if (inputPassword.value === "") {
            inputPassword.classList.add("invalid");
            complete = false;
        } else {
            inputPassword.classList.remove("invalid");
        }


        if(complete)  {
            usuario = localStorage.setItem('nameUsuario',document.getElementById("inputEmail").value);
            window.location = "principal.html";
        } else {
            alert("Debes ingresar los datos!")
        }
    });






});