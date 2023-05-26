let id = sessionStorage.getItem("id"),
    compania = sessionStorage.getItem("compania");

fetch(`http://localhost:5000/scmt/consultarRutas?compania=` + compania, {
    method: 'GET'
})
    .then(res => res.json())
    .then(datos => {
        listaRutas(datos);
    })
    .catch(function (err) {
        alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function listaRutas(datos) {
    console.log(datos.data)
    let listaRutas = document.getElementById("listaRutas")
    listaRutas.innerHTML = ''
    for (let valor of datos.data) {
        listaRutas.innerHTML += `
            <option VALUE="${valor.id}" >${valor.nombre_ruta}</option>
        `;
    }
}

function buscarRutas() {
    let conductor = document.getElementById("listaRutas").value;
    console.log(conductor);
    fetch(`http://localhost:5000/scmt/concultarIncidencias?rutas=` + conductor, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(datos => {
            listarIncidencias(datos);
        })
        .catch(function (err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}

function listarIncidencias(datos) {
    let listarIncidencias = document.getElementById("incidencias")
    listarIncidencias.innerHTML = ''
    for (let valor of datos.data) {
        listarIncidencias.innerHTML += `
            <tr>
                <td>${valor.id}</td>
                <td>${valor.nombre}</td>
                <td>${valor.fecha.slice(0, 10) + ' ' + valor.hora}</td>
                <td><button type="button" onclick="visualizar('${valor.descripcion}');" class="btn btn-success mr-2">Visualizar</button></td>
            </tr>
        `;
    }
}

function visualizar(descripcion) {
    $("#ModalDescripcion").modal();
    document.getElementById("descripcion").value = descripcion;
}