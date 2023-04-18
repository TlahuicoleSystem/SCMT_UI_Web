let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function () {
    sidebar.classList.toggle("active");
};

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
tdFecha.textContent = fechaActual.toLocaleString("es-MX", opciones2);