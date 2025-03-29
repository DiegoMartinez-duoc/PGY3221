document.getElementById("ir-registro").addEventListener("click", function(event) {
    window.location.href = "inicio.html";
})


document.getElementById("registro-formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    let nombreCompleto = document.getElementById("nombre-input").value;
    let nombreUsuario = document.getElementById("nombre-usuario-input").value;
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("contrasena-input").value;
    let confirmPassword = document.getElementById("confirmar-contrasena-input").value;
    let fechaNacimiento = new Date(document.getElementById("fecha-input").value);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    
    if (!emailRegex.test(email)) {
        alert("El correo electrónico no es válido.");
        return;
    }
    
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    
    if (!passwordRegex.test(password)) {
        alert("La contraseña debe contener al menos una letra mayúscula y un número, y tener entre 6 y 18 caracteres.");
        return;
    }
    
    if (edad < 13) {
        alert("Debes tener al menos 13 años para registrarte.");
        return;
    }
    
    alert("Registro exitoso.");

    let usuario = {
        nombre: nombreCompleto,
        usuario: nombreUsuario,
        correo: email,
        contrasena: password,
        fechaNacimiento: fechaNacimiento
    };

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    
    sessionStorage.setItem("sesionIniciada", "true");

    window.location.href = "index.html";


    
});

document.querySelector(".titulo").addEventListener("click", function() {
    window.location.href = "index.html";
});