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
    <h1 class="color-texto">Informe de incidencias</h1>
    `;

    let tableincidencias = document.getElementById("table");
    tableincidencias.innerHTML = `
    <table class="table table-dark">
        <thead>
            <th scope="col">No.</th>
            <th scope="col">Nombre del conductor</th>
            <th scope="col">Incidencia</th>
            <th scope="col">Ruta</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha/Hora</th>
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
    <h1 class="color-texto">Informe de rutas</h1>
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
    <h1 class="color-texto">Informe de asistencia</h1>
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
    let inicio = document.getElementById("inicio").value
    let fin = document.getElementById("fin").value
    let url = null;
    switch (tipo) {
        case 1:
            url = "http://localhost:5000/scmt/consultarInformeIncidencia?inicio=" + inicio + "&fin=" + fin;
            break;
        case 2:
            url = ""
            break;
        case 3:
            url = "http://localhost:5000/scmt/consultarInformeAsistencia?inicio=" + inicio + "&fin=" + fin;
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
    let i = 1;
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = ''
    switch (tipo) {
        case 1:
            for (let valor of datos.data) {
                contenido.innerHTML += `
                <tr>
                    <td>${i++}</td>
                    <td>${valor.nombre + " " + valor.primer_apellido + " " + valor.segundo_apellido}</td>
                    <td>${valor.nombre_incidente}</td>
                    <td>${valor.nombre_ruta}</td>
                    <td>${valor.descripcion}</td>
                    <td>${valor.fecha + " " + valor.hora}
                </tr>
            `;
            }
            break;

        case 2:
            for (let valor of datos.data) {
                contenido.innerHTML += `
                <tr>
                    <td></td> //No
                    <td></td> //Ruta
                    <td></td> //Conductor
                </tr>
            `;
            }
            break;

        case 3:
            for (let valor of datos.data) {
                contenido.innerHTML += `
                <tr>
                    <td>${i++}</td>
                    <td>${valor.nombre + " " + valor.primer_apellido + " " + valor.segundo_apellido}</td>
                    <td>${valor.area}</td>
                    <td>${valor.jefe_inmediato}</td>
                    <td>${valor.nombre_ruta}</td>
                    <td>${valor.fecha + " " + valor.hora}</td>
                </tr>
            `;
            }
            break;

        default:
            break;
    }
}