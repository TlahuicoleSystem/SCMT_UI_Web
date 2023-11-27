var url_string = window.location.href;
var url = new URL(url_string);
var codigo = url.searchParams.get("codigo");

if (id == null || id == "null") {
    alert("Ingresa para continuar")
    window.location = "..//..//index.html";
}

$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#ModalRuta").modal();
        //limpiar();
        fetch(`https://scmtapis.azurewebsites.net/scmt/consultarPasajeros?compania=` + compania, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(datos => {
                listaPasajeros(datos);
            })
            .catch(function (err) {
                alert('Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde')
                console.log(err);
            });

    });
});

function listaPasajeros(datos) {
    console.log(datos.data)
    let listaConductores = document.getElementById("pasajeros")
    listaConductores.innerHTML = ''
    for (let valor of datos.data) {
        listaConductores.innerHTML += `
            <option VALUE="${valor.id}" >${valor.nombre + " " + valor.primer_apellido + " " + valor.segundo_apellido}</option>
        `;
    }
}

fetch(`https://scmtapis.azurewebsites.net/scmt/consultarPasajerosRuta?id=` + codigo, {
    method: 'GET'
})
    .then(res => res.json())
    .then(datos => {
        recuperar1(datos)
    })
    .catch(function (err) {
        alert('Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function recuperar1(datos) {
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = ''
    let i = 1;
    for (let valor of datos.data) {
        let apellidos = valor.primer_apellido + " " + valor.segundo_apellido
        contenido.innerHTML += `
        <tr>
            <td>${i++}</td>
            <td>${valor.nombre}</td>
            <td>${apellidos}</td>
            <td><button type="button" onclick="eliminar(${valor.id});"><i class="material-icons">&#xe16c;</i> </button></td>
        </tr> 
        `;
        i++;
    }
}

function guardar() {
    let pasajero = document.getElementById("pasajeros").value;
    const cuerpo = new URLSearchParams("truta_id=" + codigo);
    cuerpo.append("tusuario_id", pasajero);
    fetch('https://scmtapis.azurewebsites.net/scmt/insertarPasajeroRuta?ruta=' + codigo + '&pasajero=' + pasajero, {
        method: "POST",
        body: cuerpo,
    })
        .then(res => res.json())
        .then(datos => {
            if (datos.data == "Pasajero existente en la ruta") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'El pasajero ya se encuentra registrado',
                    showConfirmButton: false,
                    timer: 1900
                })
            } else {
                alert("Pasajero agregado correctamente")
                window.location.reload();
            }
        })
        .catch(function (err) {
            alert('Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}



function eliminar(id) {
    Swal.fire({
        title: '¿Desea eliminar al pasajero de la ruta?',
        text: "No podrá revertir esta acción, esta acción podría causar daños en el sistema.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://scmtapis.azurewebsites.net/scmt/eliminarPasajeroRuta?id=` + id, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(datos => {
                    Swal.fire(
                        'Eliminado',
                        'Usuario eliminado de manera correcta',
                        'success',
                    )
                    window.location.reload()
                })
                .catch(function (err) {
                    alert('Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde')
                    console.log(err);
                });
        }
    })
}