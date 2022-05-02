import {
  obtenerReportesPorIdDeFormularioCargando,
  obtenerReportesPorIdDeFormularioExito,
  obtenerReportesPorIdDeFormularioError,
  filtrarReportesCargando,
  aplicarFiltrosExito,
  cargandoDatosParaPdfDeGraficos,
  cargarDatosParaPdfDeGraficos,
  cargarProDefectoPdfDeGraficos,
} from './AccionesReportes';
import {formatearDatosParaReportes} from './funcionesParaReportes';
const formulariosSlice = {
  reportes: null,
  datosExcel: null,
  votaciones: null,
  isCargandoFiltros: false,
  cargandoReportes: true,
  errorReportes: null,
  datosPDF: [],
  pdfMake: null,
  formularioReportes: null,
};
const storeFormulario = (state = formulariosSlice, accion) => {
  //TODO:Eliminar casos ya no utilizados
  switch (accion.type) {
    case obtenerReportesPorIdDeFormularioCargando: {
      return {
        ...state,
        cargandoReportes: accion.isCargando,
        errorReportes: null,
        reportes: null,
        formularioReportes: null,
      };
    }
    case obtenerReportesPorIdDeFormularioExito: {
      var informacion = formatearDatosParaReportes(accion.datos);
      const fechaDeHoy = new Date();
      var DatosExcel = {
        columns: [
          {value: 'Personas Registradas en el Sistema', widthPx: 50}, // width in pixels
          {value: 'Fecha', widthCh: 20}, // width in charachters
          {
            value: ` ${fechaDeHoy.getDate()}/${
              fechaDeHoy.getMonth() + 1
            }/${fechaDeHoy.getUTCFullYear()} `,
            widthPx: 60,
            widthCh: 20,
          }, // will check for width in pixels first
        ],
        data: [],
      };
      informacion.datosEncuenstados.forEach(encuestado => {
        DatosExcel = {
          ...DatosExcel,
          data: [
            ...DatosExcel.data,
            [
              encuestado.nombre,
              encuestado.edad,
              encuestado.departamento,
              encuestado.sexo,
              encuestado.email,
              encuestado.dni,
              encuestado.telefono,
            ],
          ],
        };
      });

      return {
        ...state,
        votaciones: accion.datos,
        datosExcel: informacion.datosEncuenstados,
        formularioReportes: accion.formulario,
        reportes: Object.entries(informacion.datos),
        errorReportes: null,
        cargandoReportes: false,
      };
    }
    case obtenerReportesPorIdDeFormularioError: {
      return {
        ...state,
        reportes: null,
        formularioReportes: null,
        cargandoReportes: false,
        errorReportes: accion.error,
      };
    }
    case filtrarReportesCargando: {
      return {
        ...state,
        isCargandoFiltros: accion.isCargando,
      };
    }
    case aplicarFiltrosExito: {
      var datosFiltrados = formatearDatosParaReportes(accion.datos);
      return {
        ...state,
        reportes: Object.entries(datosFiltrados),
        isCargandoFiltros: false,
      };
    }
    case cargandoDatosParaPdfDeGraficos: {
      return {
        ...state,
        datosPDF: [
          ...state.datosPDF,
          {grafico: accion.datos, imagen: null, cargando: true, error: false},
        ],
        pdfMake: null,
      };
    }
    case cargarDatosParaPdfDeGraficos: {
      var datosParaPDFActualizado = state.datosPDF.map(elemento => {
        if (accion.datos.grafico === elemento.grafico) {
          if (accion.datos.error) {
            return {imagen: null, cargando: false, error: accion.datos.error};
          } else {
            return {imagen: accion.datos.imagen, cargando: false, error: false};
          }
        } else {
          return elemento;
        }
      });

      return {
        ...state,
        pdfMake: state.pdfMake ? state.pdfMake : accion.datos.pdfmake,
        datosPDF: [...datosParaPDFActualizado],
      };
    }
    case cargarProDefectoPdfDeGraficos: {
      return {
        ...state,
        reportes: null,
  datosExcel: null,
  votaciones: null,
  isCargandoFiltros: false,
  cargandoReportes: true,
  errorReportes: null,
  datosPDF: [],
  pdfMake: null,
  formularioReportes: null,
      };
    }

    default:
      return state;
  }
};
export default storeFormulario;
