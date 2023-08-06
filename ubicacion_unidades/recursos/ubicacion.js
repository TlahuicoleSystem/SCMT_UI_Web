let datosUbicacion = null;
function verUbicacion(db,ref,onValue,ruta,nombreRuta){
    const starCountRef = ref(db, 'ubicaciones/'+ruta);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if(data != null){
            if(data.estado === 0){
                alert("Lo sentimos ruta, no iniciada");
                window.location = ("..//..//inicio.html")
            }else{
                datosUbicacion = [data.estado, data.latitud, data.longitud, nombreRuta]
            }
            
        }else{
            alert("Lo sentimos ruta, no iniciada");
            window.location = ("..//..//inicio.html")
        }
    }); 
}

function revisar(){
    if(datosUbicacion[0] === 0){
        window.location = ("..//..//inicio.html")
    }
    return datosUbicacion
}





