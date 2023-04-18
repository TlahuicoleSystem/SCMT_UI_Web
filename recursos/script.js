function entrar() {
    var usuario = document.getElementById("usuario").value,
    contraseña = document.getElementById("contrasenia").value;
    if(usuario == "" && contraseña == ""){
        alert("Ingresa los datos")
    }else{
        const cuerpo = new URLSearchParams("usuario=" + usuario);
        cuerpo.append('contraseña', contraseña);
        console.log(cuerpo)
        fetch(`http://localhost:5000/scmt/consultarU`, {
                method: 'POST',
                //headers: { 'Content-Type': 'multipart/form-data' },
                body: cuerpo
            })
            .then(res => res.json())
            .then(datos => {
                entrarRes(datos)
            })
            .catch(function(err) {
                console.log(err);
                alert("Lo sentimos ocurrio un error inesperado, intente de nuevo")
                sessionStorage.setItem("cliente", null);
                sessionStorage.setItem("nombre", null);
            });
    }    
}

function entrarRes(datos) {
    if (datos.data == "") {
        alert("Lo sentimos contraseña o correo invalido")
        sessionStorage.setItem("cliente", null);
        sessionStorage.setItem("nombre", null);
    } else {
        if(datos.data.trol_id != 1){
            alert("Lo sentimos no puedes inciar sesion en web")
        }else{
            console.log(datos.data)
            sessionStorage.setItem("id", datos.data.id);
            sessionStorage.setItem("nombre", datos.data.nombre);
            sessionStorage.setItem("rol", datos.data.trol_id);
            sessionStorage.setItem("compania", datos.data.tcompania_id);
            alert("Bienvenido " + datos.data.nombre);
            window.location = "inicio.html";
        }
    }

}