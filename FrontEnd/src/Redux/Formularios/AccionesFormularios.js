import API from '../Configuaracion/api';

export const formatearFormulario = 'formatearFormulario';
export const actualizarDatoUnFormulario = 'actualizarDatoUnFormulario';
export const actualizarDatoComponente = 'actualizarDatoComponente';

export const moverComponentes = 'moverComponentes';
export const eliminarComponente = 'eliminarComponente';
export const insertarComponente = 'insertarComponente';

export const listadoFormularioCargando = 'listadoFormularioCargando';
export const listadoFormularioExito = 'listadoFormularioExito';
export const listadoFormularioError = 'listadoFormularioError';

export const nuevoFormularioCargando = 'nuevoFormularioCargando';
export const nuevoFormularioExito = 'nuevoFormularioExito';
export const nuevoFormularioError = 'nuevoFormularioError';

export const buscarFormularioCargando = 'buscarFormularioCargando';
export const volverPorDefectoUnFormulario = 'volverPorDefectoUnFormulario';
export const buscarFormularioExito = 'buscarFormularioExito';
export const buscarFormularioError = 'buscarFormularioError';

export const actualizarFormularioCargando = 'actualizarFormularioCargando';
export const actualizarFormularioExito = 'actualizarFormularioExito';
export const actualizarFormularioError = 'actualizarFormularioError';

export const eliminarFormularioCargando = 'eliminarFormularioCargando';
export const eliminarFormularioExito = 'eliminarFormularioExito';
export const eliminarFormularioError = 'eliminarFormularioError';

export const inicializarFormulario = (idUsuario) => {
  return {
    type: formatearFormulario,
    idUsuario: idUsuario,
  };
};
export const actualizarDatoUnFormularioAccion = (datos) => {
  return {
    type: actualizarDatoUnFormulario,
    datos: datos,
  };
};
export const actualizarDatoComponenteAccion = (datos) => {
  return {
    type: actualizarDatoComponente,
    datos: datos,
  };
};
export const moverComponentesAccion = (datos) => {
  return {
    type: moverComponentes,
    datos: datos,
  };
};
export const eliminarComponenteAccion = (datos) => {
  return {
    type: eliminarComponente,
    datos: datos,
  };
};
export const insertarComponenteAccion = (datos) => {
  return {
    type: insertarComponente,
    datos: datos,
  };
};
//***********  LISTADO FORMULARIO  **************//
export const listadoFormularioCargando_Accion = (isCargando) => {
  return {
    type: listadoFormularioCargando,
    isCargando: isCargando,
  };
};
export const listadoFormularioExito_Accion = (formularios) => {
  return {
    type: listadoFormularioExito,
    datos: formularios,
  };
};
export const listadoFormularioError_Accion = (error) => {
  return {
    type: listadoFormularioError,
    error: error,
  };
};
//ACCION ASYNC LISTADO FORMULARIOS
export const listado = () => {
  return (dispatch) => {
    dispatch(listadoFormularioCargando_Accion(true));
    API({
      url: '/formularios/listar',
      method: 'get',
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(listadoFormularioExito_Accion(res.data));
      })
      .catch((error) => {
        console.log({error});
        if (error.status !== 500) {
          dispatch(listadoFormularioError_Accion(error.response.data.mensaje));
        } else {
          dispatch(listadoFormularioError_Accion('Error interno del servidor'));
        }
      });
  };
};
//***********  NUEVO FORMULARIO  **************//
export const nuevoFormularioCargando_Accion = (isCargando) => {
  return {
    type: nuevoFormularioCargando,
    isCargando: isCargando,
  };
};
export const nuevoFormularioExito_Accion = (formularios) => {
  return {
    type: nuevoFormularioExito,
    datos: formularios,
  };
};
export const nuevoFormularioError_Accion = (error) => {
  return {
    type: nuevoFormularioError,
    error: error,
  };
};
//ACCION ASYNC NUEVO FORMULARIO
export const nuevoFormulario = (formulario) => {
  return (dispatch) => {
    dispatch(nuevoFormularioCargando_Accion(true));
    API({
      url: '/formularios/alta',
      method: 'post',
      data: formulario,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(nuevoFormularioExito_Accion(res.data));
      })
      .catch((error) => {
        console.log({error});
        dispatch(nuevoFormularioError_Accion(error));
      });
  };
};
//***********  BUSCAR FORMULARIO  **************//
export const buscarFormularioCargando_Accion = (isCargando) => {
  return {
    type: buscarFormularioCargando,
    isCargando: isCargando,
  };
};
export const volverPorDefectoUnFormulario_Accion = () => {
  return {
    type: volverPorDefectoUnFormulario,
  };
};
export const buscarFormularioExito_Accion = (formularios) => {
  return {
    type: buscarFormularioExito,
    datos: formularios,
  };
};
export const buscarFormularioError_Accion = (error) => {
  return {
    type: buscarFormularioError,
    error: error,
  };
};
//ACCION ASYNC BUSCAR FORMULARIO
export const buscarFormulario = (id) => {
  //TODO: TENER CUIDADO QUE EJECUTA DOS VECES CUANDO LE DAN A EDITAR Y ACTUALIZAN LA PAGINA
  return (dispatch) => {
    dispatch(buscarFormularioCargando_Accion(true));
    API({
      url: '/formularios/obtener',
      method: 'post',
      data: {formularioId: id},
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(buscarFormularioExito_Accion(res.data));
      })
      .catch((error) => {
        console.log({error});

        dispatch(buscarFormularioError_Accion(error));
      });
  };
};
export const buscarFormularioParaVotacion = (id) => {
  //TODO: TENER CUIDADO QUE EJECUTA DOS VECES CUANDO LE DAN A EDITAR Y ACTUALIZAN LA PAGINA
  return (dispatch) => {
    dispatch(buscarFormularioCargando_Accion(true));
    API({
      url: '/formularios/obtenerParaVotacion',
      method: 'post',
      data: {formularioId: id},
    })
      .then((res) => {
        dispatch(buscarFormularioExito_Accion(res.data));
      })
      .catch((error) => {
        console.log({error});
        dispatch(
          buscarFormularioError_Accion(
            error.response.status === 403 ? error.response.data.message : 'Encuesta no disponible'
          )
        );
      });
  };
};

//***********  ACTUALIZAR FORMULARIO  **************//
export const actualizarFormularioCargando_Accion = (isCargando) => {
  return {
    type: actualizarFormularioCargando,
    isCargando: isCargando,
  };
};
export const actualizarFormularioExito_Accion = (formularioActualizado) => {
  return {
    type: actualizarFormularioExito,
    datos: formularioActualizado,
  };
};
export const actualizarFormularioError_Accion = (error) => {
  return {
    type: actualizarFormularioError,
    error: error,
  };
};
//ACCION ASYNC BUSCAR FORMULARIO
export const actualizarFormulario = (formulario) => {
  return (dispatch) => {
    formulario.formularioId = formulario._id;
    dispatch(actualizarFormularioCargando_Accion(true));
    API({
      url: '/formularios/modificar',
      method: 'put',
      data: formulario,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(actualizarFormularioExito_Accion(formulario));
      })
      .catch((error) => {
        console.log({error});
        dispatch(actualizarFormularioError_Accion(error));
      });
  };
};
//***********  CONFIGURAR FORMULARIO  **************//
export const cargandoConfigurarFormulario = 'cargandoConfigurarFormulario';
export const configurarFormularioExito = 'configurarFormularioExito';
export const configurarFormularioError = 'configurarFormularioError';
export const volverPorDefectoConfigurarFormulario = 'volverPorDefectoConfigurarFormulario';

export const volverPorDefectoConfigurarFormulario_Accion = () => {
  return {
    type: volverPorDefectoConfigurarFormulario,
  };
};
export const cargandoConfigurarFormulario_Accion = (isCargando) => {
  return {
    type: cargandoConfigurarFormulario,
    isCargando: isCargando,
  };
};
export const configurarFormularioExito_Accion = (formularioActualizado) => {
  return {
    type: configurarFormularioExito,
    datos: formularioActualizado,
  };
};
export const configurarFormularioError_Accion = (error) => {
  return {
    type: configurarFormularioError,
    error: error,
  };
};
export const configurarFormulario = (formulario) => {
  return (dispatch) => {
    formulario.formularioId = formulario._id;
    dispatch(cargandoConfigurarFormulario_Accion(true));
    API({
      url: '/formularios/configurar',
      method: 'put',
      data: formulario,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(configurarFormularioExito_Accion(formulario));
      })
      .catch((error) => {
        console.log({error});
        dispatch(configurarFormularioError_Accion(error));
      });
  };
};

//***********  ELIMINAR FORMULARIO  **************//
export const eliminarFormularioCargando_Accion = (isCargando) => {
  return {
    type: eliminarFormularioCargando,
    isCargando: isCargando,
  };
};
export const eliminarFormularioExito_Accion = (formularioEliminado) => {
  return {
    type: eliminarFormularioExito,
    datos: formularioEliminado,
  };
};
export const eliminarFormularioError_Accion = (error) => {
  return {
    type: eliminarFormularioError,
    error: error,
  };
};
//ACCION ASYNC ELIMINAR FORMULARIO
export const eliminarFormulario = (formularioId) => {
  return (dispatch) => {
    dispatch(eliminarFormularioCargando_Accion(true));
    API({
      url: '/formularios/eliminar',
      method: 'delete',
      data: {formularioId: formularioId},
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        dispatch(eliminarFormularioExito_Accion(res.data.formEliminado));
      })
      .catch((error) => {
        console.log({error});
        dispatch(eliminarFormularioError_Accion(error));
      });
  };
};

//SECCION VOTACIONES

export const enviarVotacionFormularioCargando = 'enviarVotacionFormularioCargando';
export const enviarVotacionFormularioExito = 'enviarVotacionFormularioExito';
export const enviarVotacionFormularioError = 'enviarVotacionFormularioError';
export const cerrarModalErrorVotacion = 'cerrarModalErrorVotacion';

//***********  VOTACION DE FORMULARIO  **************//
export const enviarVotacionFormularioCargando_Accion = (isCargando) => {
  return {
    type: enviarVotacionFormularioCargando,
    isCargando: isCargando,
  };
};
export const enviarVotacionFormularioExito_Accion = (datos) => {
  return {
    type: enviarVotacionFormularioExito,
    datos: datos,
  };
};
export const enviarVotacionFormularioError_Accion = (error) => {
  return {
    type: enviarVotacionFormularioError,
    error: error,
  };
};
export const cerrarModalErrorVotacion_accion = () => {
  return {
    type: cerrarModalErrorVotacion,
  };
};
//ACCION ASYNC VOTAR FORMULARIO
export const enviarVotacionFormulario = (votacion) => {
  return (dispatch) => {
    dispatch(enviarVotacionFormularioCargando_Accion(true));
    API({
      url: '/votacion/cargar',
      method: 'post',
      data: votacion,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then((res) => {
        console.log(res);
        dispatch(enviarVotacionFormularioExito_Accion(res.data.value));
      })
      .catch((error) => {
        console.log({error});
        if (error.response.status === 418) {
          dispatch(
            enviarVotacionFormularioError_Accion(
              `${error.response.data.message}+ desea volver a intentarlo?`
            )
          );
        } else {
          dispatch(
            enviarVotacionFormularioError_Accion('Error desconocido ,desea volver a intentarlo?')
          );
        }
      });
  };
};
