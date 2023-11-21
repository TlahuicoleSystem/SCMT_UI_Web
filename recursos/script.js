function entrar() {
    var usuario = document.getElementById("usuario").value,
        contraseña = document.getElementById("contrasenia").value;
    if (usuario == "" && contraseña == "") {
        alert("Ingresa los datos")
    } else {
        const cuerpo = new URLSearchParams("usuario=" + usuario);
        cuerpo.append('contraseña', contraseña);
        console.log(cuerpo)
        fetch(`https://scmtapis.azurewebsites.net/scmt/consultarU`, {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: cuerpo
        })
            .then(res => res.json())
            .then(datos => {
                entrarRes(datos)
            })
            .catch(function (err) {
                console.log(err);
                alert("Lo sentimos ocurrió un error inesperado, intente de nuevo mas tarde")
                sessionStorage.setItem("cliente", null);
                sessionStorage.setItem("nombre", null);
            });
    }
}

function entrarRes(datos) {
    let nombreCompleto = null,
        descripcion = null
    if (datos.data.trol_id == 1) {
        descripcion = "Administrador"
    } else {
        if (datos.data.trol_id == 2) {
            descripcion = "Conductor"
        } else {
            if (datos.data.trol_id == 3) {
                descripcion = "Pasajero"
            }
        }
    }
    if (datos.data == "") {
        alert("Lo sentimos contraseña o correo invalido")
        sessionStorage.setItem("cliente", null);
        sessionStorage.setItem("nombre", null);
    } else {
        if (datos.data.trol_id != 1) {
            alert("Lo sentimos no puedes inciar sesión en web")
        } else {
            nombreCompleto = datos.data.nombre + " " + datos.data.primer_apellido + " " + datos.data.segundo_apellido
            console.log(datos.data)
            sessionStorage.setItem("id", datos.data.id);
            sessionStorage.setItem("nombre", nombreCompleto);
            sessionStorage.setItem("rol", datos.data.trol_id);
            sessionStorage.setItem("telefono", datos.data.telefono);
            sessionStorage.setItem("descripcion", descripcion);
            sessionStorage.setItem("foto", datos.data.fotografia);
            sessionStorage.setItem("compania", datos.data.tcompania_id);
            alert("Bienvenido " + datos.data.nombre);
            window.location = "inicio.html";
        }
    }

}