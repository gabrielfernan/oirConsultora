import {
  formatearFormulario,
  actualizarDatoComponente,
  eliminarComponente,
  listadoFormularioCargando,
  listadoFormularioExito,
  listadoFormularioError,
  buscarFormularioCargando,
  volverPorDefectoUnFormulario,
  buscarFormularioExito,
  buscarFormularioError,
  actualizarFormularioCargando,
  actualizarFormularioExito,
  actualizarFormularioError,
  eliminarFormularioCargando,
  eliminarFormularioExito,
  eliminarFormularioError,
  nuevoFormularioCargando,
  nuevoFormularioExito,
  nuevoFormularioError,
  enviarVotacionFormularioCargando,
  enviarVotacionFormularioExito,
  enviarVotacionFormularioError,
  cerrarModalErrorVotacion,
  cargandoConfigurarFormulario,
  volverPorDefectoConfigurarFormulario,
  configurarFormularioExito,
  configurarFormularioError,
} from './AccionesFormularios';
const formulariosSlice = {
  formularios: null,
  cargandoFormularios: true,
  estadoFormularios: null,
  errorFormularios: null,
  unFormulario: {
    id: '',
    titulo: '',
    subtitulo: '',
    logo: {},
    ambito: '',
    condicion: 'manual',
    valorCondicion: '',
    componentes: [],
    usuarioId: '',
  },
  cargandoUnFormulario: false,
  estadoUnFormulario: null,
  errorUnFormulario: null,
  exitoVotacion: false,
  cargandoVotacion: false,
  errorVotacion: {isMostrar: false, mensaje: ''},
  cargandoActualizarConfiguracionFormulario: false,
  errorConfiguracionFormulario: {isMostrar: false, mensaje: ''},
};
const storeFormulario = (state = formulariosSlice, accion) => {
  //TODO:Eliminar casos ya no utilizados
  switch (accion.type) {
    case formatearFormulario: {
      return {
        ...state,
        unFormulario: {
          ...state.unFormulario,
          usuarioId: accion.idUsuario,
        },
      };
    }
    case actualizarDatoComponente: {
      const formularioActualizado = state.unFormulario;
      formularioActualizado.componentes[accion.datos.index][accion.datos.prop] = accion.datos.valor;
      return {
        ...state,
        unFormulario: formularioActualizado,
      };
    }
    case eliminarComponente: {
      const formularioActualizado = state.unFormulario;
      let componentes = [...state.unFormulario.componentes];
      componentes.splice(accion.datos.index, 1);
      formularioActualizado.componentes = [...componentes];
      return {
        ...state,
        unFormulario: formularioActualizado,
      };
    }
    case listadoFormularioCargando: {
      return {
        ...state,
        cargandoFormularios: accion.isCargando,
        estadoFormularios: 'cargando',
      };
    }
    case listadoFormularioExito: {
      return {
        ...state,
        formularios: accion.datos.length > 0 ? accion.datos : [],
        errorFormularios: null,
        estadoFormularios: 'exitoso',
        cargandoFormularios: false,
      };
    }
    case listadoFormularioError: {
      return {
        ...state,
        formularios: null,
        estadoFormularios: 'fallo',
        cargandoFormularios: false,
        errorFormularios: accion.error,
      };
    }
    case buscarFormularioCargando: {
      return {
        ...state,
        cargandoUnFormulario: accion.isCargando,
      };
    }
    case volverPorDefectoUnFormulario: {
      return {
        ...state,
        unFormulario: {
          id: '',
          titulo: '',
          subtitulo: '',
          logo: {},
          ambito: '',
          condicion: 'manual',
          valorCondicion: '',
          componentes: [],
          usuarioId: '',
        },
        errorUnFormulario: null,
        estadoUnFormulario: null,
        cargandoUnFormulario: false,
      };
    }
    case buscarFormularioExito: {
      return {
        ...state,
        unFormulario: accion.datos,
        errorUnFormulario: null,
        estadoUnFormulario: 'exitoso',
        cargandoUnFormulario: false,
      };
    }
    case buscarFormularioError: {
      return {
        ...state,
        estadoUnFormulario: 'fallo',
        errorUnFormulario: accion.error ? accion.error : 'Error desconcido',

        cargandoUnFormulario: false,
      };
    }
    case actualizarFormularioCargando: {
      return {
        ...state,
        cargandoFormularios: accion.isCargando,
      };
    }
    case actualizarFormularioExito: {
      //TODO:Controlar esto! Viene de actualizar un formulario de la lista
      return {
        ...state,
        unFormulario: accion.datos,
        estadoUnFormulario: 'exitoso',
      };
    }
    case actualizarFormularioError: {
      return {
        ...state,
        //TODO:Controlar que hacer con formularios en caso de error
        // formularios: null,
        estadoFormularios: 'fallo',
        cargandoFormularios: false,
        errorFormularios: accion.error,
      };
    }
    case cargandoConfigurarFormulario: {
      return {
        ...state,
        cargandoActualizarConfiguracionFormulario: true,
        errorConfiguracionFormulario: {isMostrar: false, mensaje: ''},
      };
    }
    case volverPorDefectoConfigurarFormulario: {
      return {
        ...state,
        cargandoActualizarConfiguracionFormulario: false,
        errorConfiguracionFormulario: {isMostrar: false, mensaje: ''},
      };
    }
    case configurarFormularioExito: {
      return {
        ...state,
        unFormulario: accion.datos,
        errorConfiguracionFormulario: {isMostrar: false, mensaje: ''},
        cargandoActualizarConfiguracionFormulario: false,
      };
    }
    case configurarFormularioError: {
      return {
        ...state,
        errorConfiguracionFormulario: {
          isMostrar: true,
          mensaje: 'No se pudieron guardar los cambios,intentelo nuevamente',
        },
        cargandoActualizarConfiguracionFormulario: false,
      };
    }
    case eliminarFormularioCargando: {
      return {
        ...state,
        cargandoFormularios: accion.isCargando,
      };
    }
    case eliminarFormularioExito: {
      return {
        ...state,
        formularios: state.formularios.filter((formulario) => formulario._id !== accion.datos._id),
        errorFormularios: null,
        estadoFormularios: 'exitoso',
        cargandoFormularios: false,
      };
    }
    case eliminarFormularioError: {
      return {
        ...state,
        //TODO:Controlar que hacer con formularios en caso de error
        // formularios: null,
        errorFormularios: 'Fallo eliminar formulario',
        estadoFormularios: 'fallo',
        cargandoFormularios: false,
      };
    }
    case nuevoFormularioCargando: {
      return {
        ...state,
        cargandoFormularios: accion.isCargando,
      };
    }
    case nuevoFormularioExito: {
      return {
        ...state,
        formularios: [...state.formularios, accion.datos],
        errorFormularios: null,
        estadoFormularios: 'exito',
        cargandoFormularios: false,
      };
    }
    case nuevoFormularioError: {
      return {
        ...state,
        errorFormularios: accion.error,
        estadoFormularios: 'fallo',
        cargandoFormularios: false,
      };
    }
    case enviarVotacionFormularioCargando: {
      return {
        ...state,
        cargandoVotacion: accion.isCargando,
        exitoVotacion: false,
        errorVotacion: {isMostrar: false, mensaje: ''},
      };
    }
    case enviarVotacionFormularioExito: {
      return {
        ...state,
        exitoVotacion: true,
        cargandoVotacion: false,
        errorVotacion: {isMostrar: false, mensaje: ''},
      };
    }
    case enviarVotacionFormularioError: {
      return {
        ...state,
        errorVotacion: {isMostrar: true, mensaje: accion.error},
        exitoVotacion: false,
        cargandoVotacion: false,
      };
    }
    case cerrarModalErrorVotacion: {
      return {
        ...state,
        errorVotacion: {isMostrar: false, mensaje: ''},
      };
    }
    default:
      return state;
  }
};
export default storeFormulario;
