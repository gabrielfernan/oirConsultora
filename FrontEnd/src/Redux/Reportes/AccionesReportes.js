import API from '../Configuaracion/api';

export const obtenerReportesPorIdDeFormularioCargando = 'obtenerReportesPorIdDeFormularioCargando';
export const obtenerReportesPorIdDeFormularioExito = 'obtenerReportesPorIdDeFormularioExito';
export const obtenerReportesPorIdDeFormularioError = 'obtenerReportesPorIdDeFormularioError';

export const filtrarReportesCargando = 'filtrarReportesCargando';
export const aplicarFiltrosExito = 'aplicarFiltrosExito';

//***********  LISTADO FORMULARIO  **************//
export const obtenerReportesPorIdDeFormularioCargando_Accion = isCargando => {
  return {
    type: obtenerReportesPorIdDeFormularioCargando,
    isCargando: isCargando,
  };
};
export const obtenerReportesPorIdDeFormularioExito_Accion = (reportes, formulario) => {
  return {
    type: obtenerReportesPorIdDeFormularioExito,
    datos: reportes,
    formulario: formulario,
  };
};
export const obtenerReportesPorIdDeFormularioError_Accion = error => {
  return {
    type: obtenerReportesPorIdDeFormularioError,
    error: error,
  };
};

//ACCION ASYNC LISTADO VOTACIONES
export const obtenerReportesPorIdDeFormulario = (id, formulario) => {
  return (dispatch, getStore) => {
    dispatch(obtenerReportesPorIdDeFormularioCargando_Accion(true));
    API({
      url: '/votacion/listar',
      method: 'post',
      headers: {'access-token': localStorage.getItem('token')},
      data: {_id: id},
    })
      .then(res => {
        // var formulario;
        // if (getStore().ReducerFormularios.formularios) {
        //   formulario = getStore().ReducerFormularios.formularios.find(
        //     formulario => formulario._id === id
        //   );
        // }
        dispatch(obtenerReportesPorIdDeFormularioExito_Accion(res.data.value, {...formulario}));
      })
      .catch(error => {
        console.log({error});
        dispatch(obtenerReportesPorIdDeFormularioError_Accion(error.response.data.mensaje));
      });
  };
};

//ACCION FILTRAR VOTAciones

export const filtrarReportesCargando_Accion = isCargando => {
  return {
    type: filtrarReportesCargando,
    isCargando: isCargando,
  };
};
export const aplicarFiltrosExito_accion = votacionesFiltradas => {
  return {
    type: aplicarFiltrosExito,
    datos: votacionesFiltradas,
  };
};
export const filtrarVotaciones = filtros => {
  return (dispatch, getStore) => {
    const clavesFiltro = Object.keys(filtros);
    dispatch(filtrarReportesCargando_Accion(true));
    const VotacionesFiltradas = getStore().ReducerReportes.vataciones.filter(
      voto =>
        !clavesFiltro
          .map(clave => {
            if (filtros[clave]) {
              return filtros[clave].includes(voto.datosEncuestado[clave].toString());
            } else {
              return true;
            }
          })
          .includes(false)
    );
    setTimeout(() => {
      dispatch(aplicarFiltrosExito_accion(VotacionesFiltradas));
    }, 200);
  };
};

export const cargandoDatosParaPdfDeGraficos = 'cargandoDatosParaPdfDeGraficos';
export const cargarDatosParaPdfDeGraficos = 'cargarDatosParaPdfDeGraficos';
export const cargarProDefectoPdfDeGraficos = 'cargarProDefectoPdfDeGraficos';

export const cargandoDatosParaPdfDeGraficos_Accion = datos => {
  return {
    type: cargandoDatosParaPdfDeGraficos,
    datos: datos,
  };
};
export const cargarDatosParaPdfDeGraficos_Accion = datos => {
  return {
    type: cargarDatosParaPdfDeGraficos,
    datos: datos,
  };
};

export const cargarProDefectoPdfDeGraficos_Accion = () => {
  return {
    type: cargarProDefectoPdfDeGraficos,
  };
};
