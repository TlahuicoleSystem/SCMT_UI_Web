let id = sessionStorage.getItem("id"),
    compania = sessionStorage.getItem("compania"),
    idActualizarRuta = null;

if (id == null || id == "null") {
    alert("Ingresa para continuar")
    window.location = "..//..//index.html";
}

fetch(`https://scmtapis.azurewebsites.net/scmt/consultarRutas?compania=` + compania, {
    method: 'GET'
})
    .then(res => res.json())
    .then(datos => {
        recuperar1(datos)
        console.log(datos)
    })
    .catch(function (err) {
        alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function recuperar1(datos) {
    let contenido = document.getElementById("accordionExample")
    contenido.innerHTML = ''
    let i = 1;
    for (let valor of datos.data) {
        let nombre = valor.nombre + " " + valor.primer_apellido +  " " + valor.segundo_apellido
        contenido.innerHTML += `
            <div class="card color-card">
                <div class="card-header" id="heading${i}">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed color-texto" type="button"
                            data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false"
                            aria-controls="collapse${i}">
                            ${valor.nombre_ruta}
                        </button>
                    </h2>
                </div>
                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}"data-parent="#accordionExample">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-7">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d7525.859950750081!2d-98.1399988!3d19.4154313!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d19.4124665!2d-98.1452667!4m5!1s0x85d0202504b10e21%3A0xdc52c5e4a992047e!2sAv%20Ignacio%20Zaragoza%20412%2C%20Centro%2C%2090300%20Apizaco%2C%20Tlax.!3m2!1d19.4190972!2d-98.14268919999999!5e0!3m2!1ses-419!2smx!4v1682548340635!5m2!1ses-419!2smx" 
                                width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <div class="col-sm-5 py-4">
                                <h3>Descripcion:</h3>
                                <p>${valor.descripcion}</p> 
                                <h3>Punto de acceso:</h3>
                                <p>${valor.punto_acceso}</p>
                                <h3>Vehiculo:</h3>
                                <p>${valor.vehiculo}</p> 
                                <h3>Conductor:</h3>
                                <p>${nombre}</p>
                                <div class="btn-group ">
                                    <button type="button" onclick="eliminar('${valor.id}');" class="btn btn-danger mr-2">Eliminar ruta</button>
                                    <button type="button" onclick="actualizar('${valor.id}');"class="btn btn-primary mr-2">Editar ruta</button>
                                    <a href="usuarios_rutas.html?codigo=${valor.id}"> <button type="button"class="btn btn-success ">Pasajeros de la ruta</button> </a>
                                </div>                   
                            </div>
                        </div> 
                    </div>
                </div>
            </div>       
        `;
        i++;
    }
}

function actualizar(id) {
    fetch(`https://scmtapis.azurewebsites.net/scmt/consultarRuta?id=` + id, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(datos => {
            recuperarUnidad(datos)
        })
        .catch(function (err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });

}

function recuperarUnidad(datos) {
    document.getElementById("mode").value = 1
    fetch(`https://scmtapis.azurewebsites.net/scmt/consultarConductores?compania=` + compania, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(datoss => {
                listaConductores(datoss,1,datos.data[0].tusuario_id_conductor);
            })
            .catch(function (err) {
                alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
                console.log(err);
            });
    $("#ModalRuta").modal();
    document.getElementById("nombreR").value = datos.data[0].nombre_ruta;
    document.getElementById("punto_acceso").value = datos.data[0].punto_acceso;
    document.getElementById("vehiculo").value = datos.data[0].vehiculo;
    document.getElementById("descripcionR").value = datos.data[0].descripcion;
    idActualizarRuta = datos.data[0].id;
}

function eliminar(id){
    Swal.fire({
        title: 'Desea eliminar la ruta seleccionada?',
        text: "No podra revertir esta accion, esta accion podria causar daños en el sistema.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://scmtapis.azurewebsites.net/scmt/eliminarRuta?id=` + id, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(datos => {
                    //resultado(datos)
                    Swal.fire(
                        'Eliminado',
                        'Usuario eliminado de manera correcta',
                        'success',
                    )
                    window.location.reload()
                })
                .catch(function (err) {
                    alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
                    console.log(err);
                });
        }
    })
}

$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#ModalRuta").modal();
        limpiar();
        fetch(`https://scmtapis.azurewebsites.net/scmt/consultarConductores?compania=` + compania, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(datos => {
                listaConductores(datos,0,null);
            })
            .catch(function (err) {
                alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
                console.log(err);
            });
        
    });
});

function listaConductores(datos,status,id){
    console.log(datos.data)
    let listaConductores = document.getElementById("conductores")
        listaConductores.innerHTML = ''
    if(status = 1){
        for (let valor of datos.data) {
            if(id === valor.id){
                listaConductores.innerHTML += `
                    <option VALUE="${valor.id}" selected>${valor.nombre + " " + valor.primer_apellido + " "+ valor.segundo_apellido}</option>
                `;
            }else{
                listaConductores.innerHTML += `
                    <option VALUE="${valor.id}" >${valor.nombre + " " + valor.primer_apellido + " "+ valor.segundo_apellido}</option>
                `;
            }
        }
    }else{
        for (let valor of datos.data) {
            listaConductores.innerHTML += `
            <option VALUE="${valor.id}" >${valor.nombre + " " + valor.primer_apellido + " "+ valor.segundo_apellido}</option>
        `;
        }
    }
     
}

function guardar(){
    let url = null;
    let nombreR = document.getElementById("nombreR").value,
    conductor = document.getElementById("conductores").value,
    punto_acceso = document.getElementById("punto_acceso").value,
    vehiculo = document.getElementById("vehiculo").value,
    descripcionR = document.getElementById("descripcionR").value;
    
    if (document.getElementById("mode").value == 1) {
        url = "https://scmtapis.azurewebsites.net/scmt/actualizarRuta?id=" + idActualizarRuta;
    } else {
        url = "https://scmtapis.azurewebsites.net/scmt/insertarRuta";
    }
    if (validaciones() != false) {
        const cuerpo = new URLSearchParams("tcompania_id=" + compania);
        cuerpo.append("nombre", nombreR);
        cuerpo.append("tusuario_id_conductor", conductor);
        cuerpo.append("descripcion", descripcionR);
        cuerpo.append("punto_acceso", punto_acceso);
        cuerpo.append("vehiculo", vehiculo);
        fetch(url, {
            method: "POST",
            body: cuerpo,
        })
        .then(function (response) {
            if (response.ok) {
                return response.text();
            } else {
                throw "Error en la llamada";
            }
        })
        .then(function (texto) {
            alert("Datos guardados correctamente");
            window.location.reload();
        })
        .catch(function (err) {
            console.log(err);
            alert("Error el guardar el producto");
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Algo anda mal",
            text: "Verifica los datos",
            timer: 1500,
            timerProgressBar: true,
        });
    }

}

function validaciones(){
    const nombreR = document.getElementById("nombreR"),
        punto_acceso = document.getElementById("punto_acceso"),
        vehiculo = document.getElementById("vehiculo"),
        descripcionR = document.getElementById("descripcionR");

    nombreR.style.border = "";
    punto_acceso.style.border = "";
    vehiculo.style.border = "";
    descripcionR.style.border = "";

    let name = true,
        punto_accesoo = true,
        vehiculoo = true,
        descripcionRR = true;

    if (!/^[a-zA-Z0-9 ]+$/.test(nombreR.value) || nombreR.value.length > 60 || nombreR.value.length < 5) {
        nombreR.style.border = "1px solid red";
        name = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(punto_acceso.value) || punto_acceso.value.length > 45 || punto_acceso.value.length < 2) {
        punto_acceso.style.border = "1px solid red";
        punto_accesoo = false;
    }
    if (!/^[a-zA-Z\-0-9 ]+$/.test(vehiculo.value) || vehiculo.value.length > 11 || vehiculo.value.length < 6) {
        vehiculo.style.border = "1px solid red";
        vehiculoo = false;
    }
    if (!/^[a-zA-Z\,0-9 ]+$/.test(descripcionR.value) || descripcionR.value.length > 150 || descripcionR.value.length < 6) {
        descripcionR.style.border = "1px solid red";
        descripcionRR = false;
    }

    if (name != false && punto_accesoo != false && vehiculoo != false && descripcionRR != false ) {
        return true;
    } else {
        return false;
    }
}

function limpiar(){
    idActualizarRuta = null;
    document.getElementById("mode").value = 0
    document.getElementById("nombreR").value = ""
    document.getElementById("punto_acceso").src = ""
    document.getElementById("vehiculo").value = ""
    document.getElementById("descripcionR").value = ""
}
