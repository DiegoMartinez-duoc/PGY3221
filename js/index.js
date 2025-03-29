const sesion = sessionStorage.getItem("sesionIniciada");

document.addEventListener("DOMContentLoaded", function() {
    let sesionIniciada = sessionStorage.getItem("sesionIniciada");
    let admin = sessionStorage.getItem("admin");
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (sesionIniciada === "true") {

        if (admin === "true") {
            window.location.href = "admin.html";
            return;
        }
        
        document.getElementById("registro").style.display = "none";
        document.getElementById("inicio").style.display = "none";

        document.getElementById("nombre-usuario").textContent = usuario.usuario;

        document.getElementById("perfil").style.display = "block";
        document.getElementById("cerrar-sesion").style.display = "block";

        

        
    }
})

document.getElementById("cerrar-sesion").addEventListener("click", function(event) {
    
    document.getElementById("registro").style.display = "block";
    document.getElementById("inicio").style.display = "block";

    document.getElementById("perfil").style.display = "none";
    document.getElementById("cerrar-sesion").style.display = "none";

    sessionStorage.setItem("sesionIniciada", "false");

    window.location.reload();
})


document.querySelectorAll(".boton-like").forEach((boton) => {
    boton.addEventListener("click", function () {
        if (sesion !== "true") {
            window.location.href = "inicio.html";
            return;
        }

        
        const cantidadElemento = this.nextElementSibling.querySelector("#cantidad");

        if (cantidadElemento) {
            
            let cantidad = parseInt(cantidadElemento.textContent.replace(/\D/g, ""), 10);
            cantidad++;
            cantidadElemento.textContent = cantidad; 
        }
    });
});

document.querySelectorAll(".boton-foro").forEach((boton) => {
    boton.addEventListener("click", function () {
        if (sesion !== "true") {
            window.location.href = "inicio.html";
            return;
        }

        const urlDestino = this.getAttribute("data-url");
        if (urlDestino) {
            window.location.href = urlDestino;
        }

    });
});



const track = document.getElementById("juegos");

let juego = "Hilo DuocUC";
let seleccion = "duoc.html"

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    isDragging = false;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    if (isDragging) {
        track.dataset.prevPercentage = track.dataset.percentage;
    }
}

window.onmousemove = e => {

    if (parseFloat(track.dataset.mouseDownAt) === 0) return;

    isDragging = true;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = Math.max(Math.min(nextPercentage, -9.5), -90.5);

    track.animate({
        transform: `translate(${Math.max(Math.min(nextPercentage, -9.5), -90.5)}%, -50%)`
    }, { duration: 1200, fill:"forwards" });
    
    for (const imgen of track.getElementsByClassName("imagen")) {
        imgen.animate({
            objectPosition: `${100 + Math.max(Math.min(nextPercentage, -9.5), -90.5)}% center`
        }, { duration: 1200, fill: "forwards" });
    }

    console.log("nextPercentage:", track.dataset.percentage); // Debug

    if (track.dataset.percentage >= -65 && track.dataset.percentage < -45) {
        juego = "Hilo DuocUC";
        seleccion = "duoc.html"
    } else if (track.dataset.percentage >= -45 && track.dataset.percentage < -25) {
        juego = "Hilo perros";
        seleccion = "perros.html"
    } else if (track.dataset.percentage >= -25) {
        juego = "Hilo gatos";
        seleccion = "gatos.html"
    } else if (track.dataset.percentage >= -85 && track.dataset.percentage < -65) {
        juego = "Hilo programacion";
        seleccion = "programacion.html"
    } else if (track.dataset.percentage < -85) {
        juego = "Hilo random";
        seleccion = "random.html"
    }

    document.getElementById("nombre-juego").textContent = juego;
}

document.getElementById("nombre-juego").addEventListener("click", function(event) {
    if (sesion !== "true") {
            window.location.href = "inicio.html";
            return;
    }

    window.location.href = seleccion;
})