let id = sessionStorage.getItem("id"),
    nombre = sessionStorage.getItem("nombre"),
    compania = sessionStorage.getItem("compania");


if (id == null || id == "null") {
    alert("Ingresa para continuar")
    window.location = "..//..//index.html";
} else {
    //document.getElementById("nombreNav").innerHTML = `<p>Hola ${nombre}</p>`
}

fetch(`http://localhost:5000/scmt/consultarAll?compania=` + compania, {
    method: 'GET'
})
    .then(res => res.json())
    .then(datos => {
        recuperar1(datos)
    })
    .catch(function (err) {
        alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
        console.log(err);
    });

function recuperar1(datos) {
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = ''
    let i = 1;
    for (let valor of datos.data) {
        let nombre = valor.nombre + " " + valor.primer_apellido + " " + valor.segundo_apellido
        let rol = null
        switch (valor.trol_id) {
            case 1:
                rol = "Administrador"
                break;
            case 2:
                rol = "Conductor"
                break;
            case 3:
                rol = "Pasajero"
                break;
            default:
                rol = "rol no encontrado"
                break;
        }
        contenido.innerHTML += `
        <tr>
            <td>${i++}</td>
            <td>${nombre}</td>
            <td>${rol}</td>
            <td>${valor.usuario}</td>
            <td>${valor.tcompania_id}</td>
            <td><button type="submit" class="btn btn-success">Modificar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminar('${valor.id}');"><i class="material-icons">&#xe16c;</i> </button></td>
        </tr>        
    `;
    }
}

$(document).ready(function () {
    $(".bill").click(function (evento) {
        switch ($(this).val()) {
            case "1":
                $("#admin").css("display", "block");
                $("#conductor").css("display", "none");
                $("#pasajero").css("display", "none");
                break;
            case "2":
                $("#admin").css("display", "none");
                $("#conductor").css("display", "block");
                $("#pasajero").css("display", "none");
                break;
            case "3":
                $("#admin").css("display", "none");
                $("#conductor").css("display", "none");
                $("#pasajero").css("display", "block");
                break;
        }
    });
});

function eliminar(id) {
    fetch(`http://localhost:5000/scmt/eliminarUsuario?id=` + id, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(datos => {
            //resultado(datos)
            alert(datos);
        })
        .catch(function (err) {
            alert('Lo sentimos ocurrio error inesperado, intente de nuevo mas tarde')
            console.log(err);
        });
}


function guardar() {
    let imagen = new FormData(document.getElementById('form-imagen'))
    fetch(`http://localhost:5000/scmt/insertarI`, {
        method: 'POST',
        //headers: { 'Content-Type': 'multipart/form-data' },
        body: imagen
    })
        .then(res => res.json())
        .then(datos => {
            procesar(datos)
        })
        .catch(function (err) {
            console.log(err);
            alert("Lo sentimos, error al carga la imagen intenta de nuevo")
        });
}

function procesar(datos) {
    console.log("Entro en el procesar")
    let seleccion = document.querySelector('input[name="bill"]:checked').value
    if (datos.message == "Imagen insertada") {
        switch (seleccion) {
            case "1":
                insertarAdmin(datos);
                break;
            case "2":
                insertarConductor(datos);
                break;
            case "3":
                insertarPasajero(datos);
                break;
        }
    } else {
        alert("Lo sentimos hubo un error al cargar la imagen");
    }
}

function insertarAdmin(datos) {
    let fotografia = datos.data
    descripcion_admin = document.getElementById("descripcion_admin").value;
    telefono_admin = document.getElementById("telefono_admin").value;
    if (validar() != false && validarAdmin() != false) {
        const cuerpo = new URLSearchParams("fotografia=" + fotografia);
        cuerpo.append('descripcion', descripcion_admin)
        cuerpo.append('telefono', telefono_admin);

        fetch('http://localhost:5000/scmt/insertarAdmin', {
            method: 'POST',
            body: cuerpo
        })
            .then(res => res.json())
            .then(datos => {
                insertarUsuario(datos)
            })
            .catch(function (err) {
                console.log(err);
                alert("Lo sentimos, error al carga la imagen intenta de nuevo")
            });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Algo anda mal',
            text: "Verifica los datos",
            timer: 1500,
            timerProgressBar: true,
        })
    }
}


function insertarConductor(datos) {
    let fotografia = datos.data
    id_empleado_conductor = document.getElementById("id_empleado_conductor").value,
        licencia_conductor = document.getElementById("licencia_conductor").value,
        telefono_conductor = document.getElementById("telefono_conductor").value,
        direccion_conductor = document.getElementById("direccion_conductor").value;
    if (validar() != false && validarConductor() != false) {
        const cuerpo = new URLSearchParams("id_empleado=" + id_empleado_conductor);
        cuerpo.append('fotografia', fotografia);
        cuerpo.append('direccion', direccion_conductor);
        cuerpo.append('telefono', telefono_conductor);
        cuerpo.append('id_licencia', licencia_conductor);

        fetch('http://localhost:5000/scmt/insertarConductor', {
            method: 'POST',
            body: cuerpo
        })
            .then(res => res.json())
            .then(datos => {
                insertarUsuario(datos)
            })
            .catch(function (err) {
                console.log(err);
                alert("Lo sentimos, error al carga la imagen intenta de nuevo")
            });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Algo anda mal',
            text: "Verifica los datos",
            timer: 1500,
            timerProgressBar: true,
        })
    }
}

function insertarPasajero(datos) {
    let fotografia = datos.data
    id_pasajero = document.getElementById("id_pasajero").value,
        telefono_pasajero = document.getElementById("telefono_pasajero").value,
        area_pasajero = document.getElementById("area_pasajero").value,
        jefe_inmediato_pasajero = document.getElementById("jefe_inmediato_pasajero").value,
        turno_pasajero = document.getElementById("turno_pasajero").value;
    if (validar() != false && validarPasajero() != false) {
        const cuerpo = new URLSearchParams("id_pasajero=" + id_pasajero);
        cuerpo.append('fotografia', fotografia);
        cuerpo.append('telefono', telefono_pasajero);
        cuerpo.append('area', area_pasajero);
        cuerpo.append('jefe_inmediato', jefe_inmediato_pasajero);
        cuerpo.append('turno', turno_pasajero);

        fetch('http://localhost:5000/scmt/insertarPasajero', {
            method: 'POST',
            body: cuerpo
        })
            .then(res => res.json())
            .then(datos => {
                insertarUsuario(datos)
            })
            .catch(function (err) {
                console.log(err);
                alert("Lo sentimos, error al carga la imagen intenta de nuevo")
            });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Algo anda mal',
            text: "Verifica los datos",
            timer: 1500,
            timerProgressBar: true,
        })
    }
}

function insertarUsuario(datos) {
    console.log(datos.data)
    let nombre = document.getElementById("nombre").value,
        apellidoP = document.getElementById("apellidoP").value,
        apellidoM = document.getElementById("apellidoM").value,
        usuario = document.getElementById("usuario").value,
        contraseña = document.getElementById("contraseña").value,
        seleccion = document.querySelector('input[name="bill"]:checked').value

    const cuerpo = new URLSearchParams("tcompania_id=" + compania);
    cuerpo.append('trol_id', seleccion)
    switch (seleccion) {
        case "1":
            cuerpo.append('tusuario_admin_id', datos.data);
            break;
        case "2":
            cuerpo.append('tusuario_conductor_id', datos.data);
            break;
        case "3":
            cuerpo.append('tusuario_pasajero_id', datos.data);
            break;
    }
    cuerpo.append('nombre', nombre);
    cuerpo.append('primer_apellido', apellidoP);
    cuerpo.append('segundo_apellido', apellidoM);
    cuerpo.append('usuario', usuario);
    cuerpo.append('contraseña', contraseña);
    fetch('http://localhost:5000/scmt/insertarUsuario', {
        method: 'POST',
        body: cuerpo
    })
        .then(function (response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error en la llamada";
            }
        })
        .then(function (texto) {
            alert("Datos guardados correctamente")
            window.location.reload()
        })
        .catch(function (err) {
            console.log(err);
            alert("Error el guardar el producto")
        });
}




//Validaciones
function validar() {
    const nombre = document.getElementById("nombre"),
        apellidoP = document.getElementById("apellidoP"),
        apellidoM = document.getElementById("apellidoM"),
        usuario = document.getElementById("usuario"),
        contraseña = document.getElementById("contraseña");
    nombre.style.border = "";
    apellidoP.style.border = "";
    apellidoM.style.border = "";
    usuario.style.border = "";
    contraseña.style.border = "";
    let nombree = true,
        apellidoPP = true,
        apellidoMM = true,
        usuarioo = true,
        contraseñaa = true;

    if (!/^[a-zA-Z ]+$/i.test(nombre.value) || nombre.value.length > 120 || nombre.value.length < 5) {
        nombre.style.border = "1px solid red";
        nombree = false;
    }
    if (!/^[a-zA-Z ]+$/i.test(apellidoP.value) || apellidoP.value.length > 120 || apellidoP.value.length < 5) {
        apellidoP.style.border = "1px solid red";
        apellidoPP = false;
    }
    if (!/^[a-zA-Z ]+$/i.test(apellidoM.value) || apellidoM.value.length > 120 || apellidoM.value.length < 5) {
        apellidoM.style.border = "1px solid red";
        apellidoMM = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(usuario.value) || usuario.value.length > 30 || usuario.value.length < 5) {
        usuarioo = false;
        usuario.style.border = "1px solid red";
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(contraseña.value) || contraseña.value.length > 20 || contraseña.value.length < 5) {
        contraseñaa = false;
        contraseña.style.border = "1px solid red";
    }

    if (nombree != false && apellidoPP != false && apellidoMM != false && usuarioo != false && contraseñaa != false) {
        return true;
    } else {
        return false;
    }
}

function validarAdmin() {
    const telefono = document.getElementById("telefono_admin"),
        input_descripcion = document.getElementById("descripcion_admin");
    telefono.style.border = "";
    input_descripcion.style.border = "";
    let phone = true,
        references = true;

    if (!/^\d{10}$/.test(telefono.value)) {
        telefono.style.border = "1px solid red";
        phone = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(input_descripcion.value) || input_descripcion.value.length > 150 || input_descripcion.value.length < 5) {
        references = false;
        input_descripcion.style.border = "1px solid red";
    }
    if (phone != false && references != false) {
        return true;
    } else {
        return false;
    }
}

function validarConductor() {
    const licencia_conductor = document.getElementById("licencia_conductor"),
        telefono = document.getElementById("telefono_conductor"),
        input_street = document.getElementById("direccion_conductor"),
        id_empleado_conductor = document.getElementById("id_empleado_conductor");
    licencia_conductor.style.border = "";
    telefono.style.border = "";
    input_street.style.border = "";
    id_empleado_conductor.style.border = "";
    let licencia = true,
        id = true,
        phone = true,
        street = true;
    if (!/^[0-9]+$/.test(id_empleado_conductor.value) || id_empleado_conductor.value.length > 10 || id_empleado_conductor.value.length < 1) {
        id = false;
        id_empleado_conductor.style.border = "1px solid red";
    }
    if (!/^[0-9]+$/.test(licencia_conductor.value) || licencia_conductor.value.length > 15 || licencia_conductor.value.length < 1) {
        licencia = false;
        licencia_conductor.style.border = "1px solid red";
    }
    if (!/^\d{10}$/.test(telefono.value)) {
        telefono.style.border = "1px solid red";
        phone = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(input_street.value) || input_street.value.length > 100 || input_street.value.length < 6) {
        street = false;
        input_street.style.border = "1px solid red";
    }
    if (id != false && licencia != false && phone != false && street != false) {
        return true;
    } else {
        return false;
    }
}

function validarPasajero() {
    const jefe_inmediato_pasajero = document.getElementById("jefe_inmediato_pasajero"),
        input_cp = document.getElementById("id_pasajero"),
        telefono = document.getElementById("telefono_pasajero"),
        area_pasajero = document.getElementById("area_pasajero"),
        turno_pasajero = document.getElementById("turno_pasajero");

    jefe_inmediato_pasajero.style.border = "";
    input_cp.style.border = "";
    telefono.style.border = "";
    area_pasajero.style.border = "";
    turno_pasajero.style.border = "";

    let name = true,
        cp = true,
        phone = true,
        street = true,
        city = true;

    if (!/^[a-zA-Z ]+$/i.test(jefe_inmediato_pasajero.value) || jefe_inmediato_pasajero.value.length > 120 || jefe_inmediato_pasajero.value.length < 10) {
        jefe_inmediato_pasajero.style.border = "1px solid red";
        name = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(input_cp.value) || input_cp.value.length > 10 || input_cp.value.length < 1) {
        cp = false;
        input_cp.style.border = "1px solid red";
    }
    if (!/^\d{10}$/.test(telefono.value)) {
        telefono.style.border = "1px solid red";
        phone = false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(area_pasajero.value) || area_pasajero.value.length > 70 || area_pasajero.value.length < 6) {
        street = false;
        area_pasajero.style.border = "1px solid red";
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(turno_pasajero.value) || turno_pasajero.value.length > 70 || turno_pasajero.value.length < 5) {
        city = false;
        turno_pasajero.style.border = "1px solid red";
    }
    if (name != false && cp != false && phone != false && street != false && city != false) {
        return true;
    } else {
        return false;
    }
}



/*
function salir(){
    let temporar = null
    sessionStorage.setItem("cliente", temporar);
    sessionStorage.setItem("nombre", temporar);
    window.location = "../index.html";
}*/