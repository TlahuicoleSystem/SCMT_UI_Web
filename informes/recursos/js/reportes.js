const urlParams = new URLSearchParams(window.location.search);
let tipo = urlParams.get('tipo');

switch (tipo) {
    case "1":
        incidencias();
        break;

    case "2":
        rutas();
        break;

    case "3":
        asistencia();
        break;

    default:
        break;
}

function incidencias() {
    let buscar = document.getElementById("buscar");
    buscar.innerHTML = `
    <button onclick="cargar(1);" type="button" class="btn btn-primary">Buscar</button>
    `;

    let titulo = document.getElementById('titulo');
    titulo.innerHTML = `
    <h1 class="color-texto">Informe de: incidencias</h1>
    `;

    let tableincidencias = document.getElementById("table");
    tableincidencias.innerHTML = `
    <table class="table table-dark">
        <thead>
            <th scope="col">No.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Ruta</th>
            <th scope="col">Lugar</th>
            <th scope="col">Descripcion</th>
        </thead>
        <tbody id="contenido">

        </tbody>
    </table>
    `;
}

function rutas() {
    let buscar = document.getElementById("buscar");
    buscar.innerHTML = `
    <button onclick="cargar(2);" type="button" class="btn btn-primary">Buscar</button>
    `;

    let titulo = document.getElementById('titulo');
    titulo.innerHTML = `
    <h1 class="color-texto">Informe de: rutas</h1>
    `;

    let tablerutas = document.getElementById("table");
    tablerutas.innerHTML = `
    <table class="table table-dark">
        <thead>
            <th scope="col">No.</th>
            <th scope="col">Ruta</th>
            <th scope="col">Conductor</th>
        </thead>
        <tbody id="contenido">

        </tbody>
    </table>
    `;
}

function asistencia() {
    let buscar = document.getElementById("buscar");
    buscar.innerHTML = `
    <button onclick="cargar(3);" type="button" class="btn btn-primary">Buscar</button>
    `;

    let titulo = document.getElementById('titulo');
    titulo.innerHTML = `
    <h1 class="color-texto">Informe de: asistencia</h1>
    `;

    let tableasistencia = document.getElementById("table");
    tableasistencia.innerHTML = `
    <table class="table table-dark">
        <thead>
            <th scope="col">No.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Area</th>
            <th scope="col">Jefe inmediato</th>
            <th scope="col">Ruta</th>
            <th scope="col">Fecha/Hora</th>
        </thead>
        <tbody id="contenido">

        </tbody>
    </table>
    `;
}

function cargar(tipo) {
    console.log(tipo);
    let url = null;
    switch (tipo) {
        case 1:
            url = ""

            break;
        case 2:
            url = ""
            break;
        case 3:
            url = ""
            break;

        default:
            break;
    }
    fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(datos => {
            recuperar(datos, tipo)
        })
        .catch(function (err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function recuperar(datos, tipo) {
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = ''
    switch (tipo) {
        case 1:
            for (let valor of datos.data) {
                contenido.innerHTML += `
        <tr>
            <td></td> //No
            <td></td> //Nombre
            <td></td> //Ruta
            <td></td> //Lugar
            <td></td> //Descripcion
        </tr>
    `;
            }
            break;

        case 2:
            contenido.innerHTML += `
        <tr>
            <td></td> //No
            <td></td> //Ruta
            <td></td> //Conductor
        </tr>
    `;
            break;

        case 3:
            contenido.innerHTML += `
        <tr>
            <td></td> //No
            <td></td> //Nombre
            <td></td> //Area
            <td></td> //Jefe inmediato
            <td></td> //Ruta
            <td></td> //Fecha/Hora
        </tr>
    `;
            break;

        default:
            break;
    }
}