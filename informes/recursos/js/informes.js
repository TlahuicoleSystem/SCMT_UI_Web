function obtenerDatos(tipo) {
    let inicio = document.getElementById("inicio").value;
    let fin = document.getElementById("fin").value;
    let url;
    switch (tipo) {
        case 1:
            url = "http://localhost:5000/scmt/consultarInformeIncidencia?inicio=" + inicio + "&fin=" + fin;
            break;
        case 2:
            url = "";
            break;
        case 3:
            url = "http://localhost:5000/scmt/consultarInformeAsistencia?inicio=" + inicio + "&fin=" + fin;
            break;
    }
    return fetch(url)
        .then(response => response.json())
        .then(datos => datos.data);
}

function generarPDFIncidencias() {
    return new Promise(resolve => {
        window.jsPDF = window.jspdf.jsPDF;
        // Crear un objeto jsPDF
        const doc = new jsPDF();
        // Agregar contenido al PDF
        let encabezadoUrlImg = "/recursos/img/SCMTLOGO.jpg";
        let piePagina = "SCMT por Josue y Abraham - Pagina ";
        let i = 1;
        let fecha = new Date();
        let fechaFormateada = fecha.toLocaleString();

        // Agregar contenido al PDF
        doc.text('Informe de incidencias', 80, 17);
        doc.text('Fecha/Hora de impresion: ' + fechaFormateada.slice(0, 16), 10, 27);

        let totalPaginas = doc.internal.getNumberOfPages();
        for (let j = 1; j <= totalPaginas; j++) {
            doc.setPage(j);
            doc.addImage(encabezadoUrlImg, 'JPG', 10, 10, 30, 8);
            doc.text(piePagina + 1, 10, doc.internal.pageSize.getHeight() - 10);
        }

        let columns = [
            'No.',
            'Nombre del conductor',
            'Incidencia',
            'Ruta',
            'Descripcion',
            'Fecha/Hora'
        ];
        obtenerDatos(1).then(datos => {
            console.log(datos);
            let data = datos.map(d => [
                i++,
                d.nombre + ' ' + d.primer_apellido + ' ' + d.segundo_apellido,
                d.nombre_incidente,
                d.nombre_ruta,
                d.descripcion,
                d.fecha.slice(0, 10) + ' ' + d.hora
            ]);

            doc.autoTable({
                head: [columns], // Encabezado de la tabla
                body: data, // Datos de la tabla
                startY: 30 // Posición vertical de inicio de la tabla
            });

            const pdfData = doc.output();
            const blob = new Blob([pdfData], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const modal = document.getElementById("pdfModal");
            const iframe = modal.querySelector("iframe");
            iframe.src = url;
            $(modal).modal("show");

            resolve(doc);
        });
    });
}

function generarPDFRutas() {

}

function generarPDFAsistencia() {
    return new Promise(resolve => {
        window.jsPDF = window.jspdf.jsPDF;
        // Crear un objeto jsPDF
        const doc = new jsPDF();
        // Agregar contenido al PDF
        let encabezadoUrlImg = "/recursos/img/SCMTLOGO.jpg";
        let piePagina = "SCMT por Josue y Abraham - Pagina ";
        let i = 1;
        let fecha = new Date();
        let fechaFormateada = fecha.toLocaleString();

        // Agregar contenido al PDF
        doc.text('Informe de asistencia', 80, 17);
        doc.text('Fecha/Hora de impresion: ' + fechaFormateada.slice(0, 16), 10, 27);

        let totalPaginas = doc.internal.getNumberOfPages();
        for (let j = 1; j <= totalPaginas; j++) {
            doc.setPage(j);
            doc.addImage(encabezadoUrlImg, 'JPG', 10, 10, 30, 8);
            doc.text(piePagina + 1, 10, doc.internal.pageSize.getHeight() - 10);
        }

        let columns = [
            'No.',
            'Nombre',
            'Area',
            'Jefe inmediato',
            'Ruta',
            'Fecha/Hora'
        ];
        obtenerDatos(3).then(datos => {
            console.log(datos);
            let data = datos.map(d => [
                i++,
                d.nombre + ' ' + d.primer_apellido + ' ' + d.segundo_apellido,
                d.area,
                d.jefe_inmediato,
                d.nombre_ruta,
                d.fecha.slice(0, 10) + ' ' + d.hora
            ]);

            doc.autoTable({
                head: [columns], // Encabezado de la tabla
                body: data, // Datos de la tabla
                startY: 30 // Posición vertical de inicio de la tabla
            });

            const pdfData = doc.output();
            const blob = new Blob([pdfData], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const modal = document.getElementById("pdfModal");
            const iframe = modal.querySelector("iframe");
            iframe.src = url;
            $(modal).modal("show");

            resolve(doc);
        });
    });
}

function descargarPDFIncidencia() {
    generarPDFIncidencias().then(doc => {
        doc.save('Incidencia.pdf')
    })
}

function descargarPDFAsistencia() {
    generarPDFAsistencia().then(doc => {
        doc.save('Asistencia.pdf');
    });
}
