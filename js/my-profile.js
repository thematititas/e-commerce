var nombre = document.getElementById("nombre");
var edad = document.getElementById("edad");
var email = document.getElementById("email");
var telefono = document.getElementById("telefono");
var foto = document.getElementById('marco');

function showData(elemento) {
  nombre.value = elemento.nombre
  edad.value = elemento.edad
  email.value = elemento.email
  telefono.value = elemento.tel
  foto.src = element.foto;
  document.getElementById('pieDeFoto').innerText = elemento.nombre;
}
function saveLS() {
  let local = {
    nombre: nombre.value,
    edad: edad.value,
    email: email.value,
    tel: telefono.value,
    foto: foto.src
  };
  localStorage.setItem("datos", JSON.stringify(local));
}


function previewFile() {
  let preview = document.getElementById('marco');
  let file = document.getElementById("foto").files[0];
  let fotoActual = document.getElementById('marco').src;
  let reader = new FileReader();

  reader.onload = function () {
    preview.src = reader.result;
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = fotoActual;
  }
}
function editarClases() {
  nombre.classList.replace("form-control-plaintext", "form-control");
  edad.classList.replace("form-control-plaintext", "form-control");
  email.classList.replace("form-control-plaintext", "form-control");
  telefono.classList.replace("form-control-plaintext", "form-control");

  document.getElementById('desplegable').classList.replace("d-none", "d-block");

  nombre.removeAttribute("readonly");
  edad.removeAttribute("readonly");
  email.removeAttribute("readonly");
  telefono.removeAttribute("readonly");
}

function guardarClases() {
  nombre.classList.replace("form-control", "form-control-plaintext");
  edad.classList.replace("form-control", "form-control-plaintext");
  email.classList.replace("form-control", "form-control-plaintext");
  telefono.classList.replace("form-control", "form-control-plaintext");

  document.getElementById('desplegable').classList.replace("d-block", "d-none");

  nombre.setAttribute("readonly", "");
  edad.setAttribute("readonly", "");
  email.setAttribute("readonly", "");
  telefono.setAttribute("readonly", "");
}


document.addEventListener("DOMContentLoaded", function (e) {

  if (localStorage.getItem('datos')) {
    element = JSON.parse(localStorage.getItem('datos'));
    showData(element);
  }

  document.getElementById("editar").addEventListener("click", function () {
    editarClases();
  });
  document.getElementById("botonCancel").addEventListener("click", function () {
    if (localStorage.getItem('datos')) {
      element = JSON.parse(localStorage.getItem('datos'));
      showData(element);
      guardarClases()
    } else {
      guardarClases()
      let local = {
        nombre: "",
        edad: "",
        email: "",
        tel: "",
        foto: ""
      };
      showData(local)

    }
  });
  document.getElementById("botonModal").addEventListener("click", function () {
    previewFile()
  });

  document.getElementById("confirmar").addEventListener("click", function () {
    guardarClases();
    saveLS();
    document.getElementById('pieDeFoto').innerText = nombre.value;
  });
});