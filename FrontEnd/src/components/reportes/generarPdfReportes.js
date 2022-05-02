import constantes from '../../app/constantes';

const guardarPdf = (datos, pdfMake, formulario, DatosDepartamentos, reportes) => {



  if (pdfMake) {
    var doc = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [10, 10, 10, 10],
      content: [],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
           alignment: 'center',
          margin: [0, 10, 0, 10]
        },
        tableExample: {
          margin: [0, 0, 0, 0]
        },
        tablaEncuestados:{
         
          margin: [110, 0, 0, 0]
        }
      
      }
    };
    datos.forEach((dato, index) => {
      doc.content.push({
        image: dato.imagen,
        width: 560,
      });
    });
    doc.content.push({
      text: 'Encuestados por departamento',
      style: 'header'
    });
    doc.content.push({
      style: 'tablaEncuestados',
      table: {
        widths: [200, 130],
        body: [
          [
            {text: 'Departamento', bold: true},
            {text: 'Cantidad', bold: true},
          ],
          ...DatosDepartamentos.map(elemento => {
            return [[elemento.departamento], [elemento.cantidad]];
          }),
        ],
      },
    });
    reportes.forEach(datos => {
      doc.content.push({
        text: datos[0],
        style: 'header'
      });
      doc.content.push({
        style: 'tableExample',
        table: {
          widths: [105, 105, 105, 105, 105],
          body: [
            [
              {text: 'Respuesta', bold: true},
              {text: 'Apellido y Nombre', bold: true},
              {text: 'Sexo', bold: true},
              {text: 'Edad', bold: true},
              {text: 'Departamento', bold: true},
            ],
            
            ...datos[1].data.map(elemento => {
              const departamento = constantes.DEPARTAMENTOS.find(
                departamento => parseInt(elemento.departamento) === departamento.valor
              );
             
              return [
                [elemento.respuesta],
                [elemento.apellido_nombre],
                elemento.sexo === 'F' ? 'Femenino' : 'Masculino',
                [elemento.edad],
                [departamento.etiqueta],
              ];
            }),
          ],
        },
      });
    });
   
    pdfMake.createPdf(doc).download(`Reportes${formulario ? formulario.titulo : ''}`);
  } else {
    console.log('No se cargo pdfMake');
  }
};
export default guardarPdf;
