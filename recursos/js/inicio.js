// Verificar si no hay datos en el sessionStorage
if (
    !sessionStorage.getItem("nombre") ||
    !sessionStorage.getItem("descripcion") ||
    !sessionStorage.getItem("foto") ||
    !sessionStorage.getItem("telefono")
) {
    // Redirigir a la página de inicio de sesión (index.html)
    window.location.href = "../index.html";
}

let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let nombre = sessionStorage.getItem("nombre"),
    descripcionn = sessionStorage.getItem("descripcion"),
    fotoo = sessionStorage.getItem("foto"),
    tel = sessionStorage.getItem("telefono");
document.getElementById("foto_perfil").src = fotoo;
document.getElementById("nombreMenu").innerHTML = `<p>Hola ${nombre}</p> <p>Descripción: ${descripcionn}</p><p>Telefono: ${tel}</p>`
document.getElementById("nombre_spam").innerHTML = `<img src="${fotoo}" alt="Imagen de perfil" class="img-fluid espaciado-img bx" width="50" height="50"> <span class="link_name">${nombre}</span>`

btn.onclick = function () {
    sidebar.classList.toggle("active");
};

function cerrarSesion() {
    // Limpiar los valores del sessionStorage
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("descripcion");
    sessionStorage.removeItem("foto");
    sessionStorage.removeItem("telefono");

    // Redirigir a la página de inicio de sesión
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // Obtén la ruta completa de la página actual
    let currentPath = window.location.pathname;

    // Extrae el nombre del archivo de la ruta de la página actual
    currentPath = currentPath.split("/").pop();

    // Obtén todos los enlaces de navegación
    let navLinks = document.querySelectorAll(".nav a");

    // Recorre los enlaces y verifica si el nombre del archivo coincide con la página actual
    for (let i = 0; i < navLinks.length; i++) {
        let link = navLinks[i];
        let href = link.getAttribute("href");
        console.log(href, currentPath);

        // Extrae el nombre del archivo de la ruta del enlace de navegación
        href = href.split("/").pop();

        // Verifica si el nombre del archivo coincide con el de la página actual
        if (href === currentPath) {
            link.classList.add("nav-selected");
            break; // Detén el bucle una vez que se encuentre el enlace correspondiente
        }
    }
});


let id = sessionStorage.getItem("id"),
    compania = sessionStorage.getItem("compania");

fetch(`https://scmtapis.azurewebsites.net/scmt/consultarRutas?compania=` + compania, {
    method: 'GET'
})
    .then(res => res.json())
    .then(datos => {
        listaRutas(datos);
    })
    .catch(function (err) {
        alert('Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function listaRutas(datos) {
    let listaRutas = document.getElementById("listaRutas")
    listaRutas.innerHTML = ''
    for (let valor of datos.data) {
        listaRutas.innerHTML += `
            <option VALUE="${valor.id}" >${valor.nombre_ruta}</option>
        `;
    }
};

function rastrear() {
    let ruta = document.getElementById("listaRutas").value;
    var combo = document.getElementById("listaRutas");
    var nombreRuta = combo.options[combo.selectedIndex].text;
    window.location = "../ubicacion_unidades/unidades.html?ruta=" + ruta + "&nombre=" + nombreRuta;
}