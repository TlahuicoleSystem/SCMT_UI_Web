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
document.getElementById("nombreMenu").innerHTML = `<p>Hola ${nombre}</p> <p>Descripcion: ${descripcionn}</p><p>Telefono: ${tel}</p>`
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