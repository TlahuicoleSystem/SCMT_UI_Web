let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let nombre = sessionStorage.getItem("nombre"),
    descripcionn = sessionStorage.getItem("descripcion"),
    fotoo = sessionStorage.getItem("foto"),
    tel = sessionStorage.getItem("telefono");
    document.getElementById("foto_perfil").src = fotoo;
    document.getElementById("nombreMenu").innerHTML = `<p>Hola ${nombre}</p> <p>Descripcion: ${descripcionn}</p><p>Telefono: ${tel}</p>` 
    document.getElementById("nombre_spam").innerHTML = `<img src="${fotoo}" alt="Imagen de perfil" class="img-fluid espaciado-img bx" width="50" height="50"> <span class="link_name">${nombre}</span>` 

btn.onclick = function () {
    sidebar.classList.toggle("active");
};
/*
// Fecha
var fechaActual = new Date(); // Obtiene la fecha actual
var tdFecha = document.getElementById("fecha-actual_0"); // Selecciona el elemento td por su id
var opciones1 = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};
tdFecha.textContent = fechaActual.toLocaleString("es-MX", opciones1); // Escribe la fecha y hora en el elemento td

var tdFecha = document.getElementById("fecha-actual_1");
var opciones2 = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};
tdFecha.textContent = fechaActual.toLocaleString("es-MX", opciones2);*/