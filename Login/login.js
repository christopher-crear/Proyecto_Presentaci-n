
// SCRIPT PARA CAMBIAR EL LOGO CADA 25 SEGUNDOS
const imagenes = document.querySelectorAll('.logo img');
let indiceActual = 0;
// Función que cambia de una imagen a otra
function cambiarLogo() {
    imagenes[indiceActual].classList.remove('activa');
    indiceActual = (indiceActual + 1) % imagenes.length;
    imagenes[indiceActual].classList.add('activa');
}

// Ejecutar la función cambiarLogo cada 25 segundos (25000 milisegundos)
setInterval(cambiarLogo, 25000);


// SCRIPT DE VALIDACIÓN DE LOGIN
// Usuario y contraseña válidos
const USUARIO_VALIDO = "christopher";
const CONTRASENA_VALIDA = "eras";
const URL_REDIRECCION = "../Inicio/inicio.html";

// Capturar elementos del DOM
const formulario = document.getElementById("formularioLogin");
const mensaje = document.getElementById("mensaje");

// Evento cuando se envía el formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Obtener los valores ingresados por el usuario
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    // Validar que los campos no estén vacíos
    if (usuario === "" || contrasena === "") {
        mensaje.textContent = "Complete todos los campos.";
        mensaje.className = "mensaje error";
        return;
    }
    // Validar las credenciales
    if (usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
        mensaje.textContent = "¡Inicio de sesión exitoso!";
        mensaje.className = "mensaje exito";
        setTimeout(() => {
            window.location.href = URL_REDIRECCION;
        }, 1000);
    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos.";
        mensaje.className = "mensaje error";
    }
});