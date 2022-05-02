import jwt from 'jsonwebtoken';

import {
  listadoUsuariosCargando,
  listadoUsuariosExito,
  listadoUsuariosError,
  nuevoUsuarioCargando,
  nuevoUsuarioExito,
  nuevoUsuarioError,
  loginCargando,
  loginExito,
  loginError,
  editarUsuarioCargando,
  editarUsuarioExito,
  editarMiPerfilExito,
  editarUsuarioError,
  buscarUsuarioCargando,
  buscarUsuarioExito,
  buscarUsuarioError,
  eliminarUsuarioCargando,
  eliminarUsuarioExito,
  eliminarUsuarioError,
  fotoDeUsuarioCargando,
  fotoDeUsuarioExito,
  fotoDeUsuarioError,
  valoresDefaultFotoDeUsuario,
  eliminarFotoDeUsuarioCargando,
  eliminarFotoDeUsuarioExito,
  eliminarFotoDeUsuarioError,
  obtenerFotoDeUsuarioCargando,
  obtenerFotoDeUsuarioExito,
  obtenerFotoDeUsuarioError,
  usuarioSinFoto,
} from './AccionesUsuarios';
const datosTokenInicio = localStorage.getItem('token')
  ? jwt.decode(localStorage.getItem('token'), {complete: true}).payload
  : null;

const logueoPorDefecto = {
  usuarios: null,
  cargandoUsuarios: true,
  errorUsuarios: null,
  usuario: datosTokenInicio,
  cargandoUsuario: true,
  errorUsuario: null,
  errorLogin: null,
  miPerfil: null,
  unUsuario: null,
  unUsuarioCargando: true,
  unUsuarioError: null,
  cargandoFotoDeUsuario: false,
  errorFotoDeUsuario: null,
};
const editarListaDeUsuarios = (usuarios, usuarioEditado) => {
  const usuariosEditados = usuarios.map(usuario => {
    if (usuario._id === usuarioEditado._id) {
      return usuarioEditado;
    } else {
      return usuario;
    }
  });
  return usuariosEditados;
};
const storeLogueo = (state = logueoPorDefecto, accion) => {
  switch (accion.type) {
    case listadoUsuariosCargando: {
      return {
        ...state,
        errorUsuarios: null,
        usuarios: [],
        cargandoUsuarios: accion.isCargando,
      };
    }
    case listadoUsuariosExito: {
      return {
        ...state,
        usuarios: accion.usuarios.length > 0 ? accion.usuarios : [],
        cargandoUsuarios: false,
        errorUsuarios: null,
      };
    }
    case listadoUsuariosError: {
      return {
        ...state,
        usuarios: [],
        cargandoUsuarios: false,
        errorUsuarios: accion.error,
      };
    }
    case nuevoUsuarioCargando: {
      return {
        ...state,
        errorUsuarios: null,
        cargandoUsuarios: accion.isCargando,
      };
    }
    case nuevoUsuarioExito: {
      return {
        ...state,
        usuarios: [...state.usuarios, accion.nuevoUsuario],
        cargandoUsuarios: false,
        errorUsuarios: null,
      };
    }
    case nuevoUsuarioError: {
      return {
        ...state,
        errorUsuarios: accion.error,
        usuarios: [],
        cargandoUsuarios: false,
      };
    }
    case loginCargando: {
      return {
        ...state,
        cargandoUsuario: accion.isCargando,
        usuario: null,
        errorLogin: null,
      };
    }
    case loginExito: {
      const datosToken = jwt.decode(accion.token, {complete: true}).payload;
      if (datosToken) {
        localStorage.setItem('token', accion.token);
        return {
          ...state,
          usuario: datosToken,
          cargandoUsuario: false,
          errorLogin: null,
        };
      } else {
        return {
          ...state,
          usuario: null,
          cargandoUsuario: false,
          errorLogin: 'Token no valido',
        };
      }
    }
    case loginError: {
      return {
        ...state,
        usuario: null,
        errorLogin: accion.error,
        cargandoUsuario: false,
      };
    }
    case editarUsuarioCargando: {
      return {
        ...state,
        cargandoUsuario: accion.isCargando,
        errorUsuario: null,
      };
    }
    case editarUsuarioExito: {
      return {
        ...state,
        usuarios: editarListaDeUsuarios(state.usuarios, accion.usuarioEditado),
        unUsuario: null,
        errorUsuario: null,
        cargandoUsuario: false,
      };
    }
    case editarMiPerfilExito: {
      localStorage.removeItem('token');
      /* localStorage.setItem('token', accion.token); */
      return {
        ...state,
        usuario: null,
        unUsuario: null,
        usuarios: null,
        errorUsuario: null,
        cargandoUsuario: false,
      };
    }
    case editarUsuarioError: {
      return {
        ...state,
        errorUsuario: accion.error,
        cargandoUsuario: false,
      };
    }
    case buscarUsuarioCargando: {
      return {
        ...state,
        unUsuarioCargando: accion.isCargando,
        unUsuario: null,
        unUsuarioError: null,
      };
    }
    case buscarUsuarioExito: {
      return {
        ...state,
        unUsuario: accion.datos,
        unUsuarioError: null,
        unUsuarioCargando: false,
      };
    }
    case buscarUsuarioError: {
      return {
        ...state,
        unUsuario: null,
        unUsuarioError: accion.error,
        unUsuarioCargando: false,
      };
    }
    case eliminarUsuarioCargando: {
      return {
        ...state,
        cargandoUsuarios: accion.isCargando,
        errorUsuarios: null,
      };
    }
    case eliminarUsuarioExito: {
      return {
        ...state,
        usuarios: state.usuarios.filter(usuario => usuario._id !== accion.id),
        errorUsuarios: null,
        cargandoUsuarios: false,
      };
    }
    case eliminarUsuarioError: {
      return {
        ...state,
        cargandoUsuarios: false,
        errorUsuarios: accion.error,
      };
    }
    case fotoDeUsuarioCargando: {
      return {
        ...state,
        cargandoFotoDeUsuario: accion.isCargando,
      };
    }
    case fotoDeUsuarioExito: {
      /*  var usuarioConFoto = {}; */
      /* usuarioConFoto = Object.assign(usuarioConFoto, state.usuario); */
      /* usuarioConFoto.foto = accion.datos;
      console.log(usuarioConFoto); */
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: null,
        usuario: accion.datos,
        /* usuarios: editarListaDeUsuarios(state.usuarios, (state.usuario.foto = accion.datos)), */
        /* usuario: {...state.usuario.accion.datos}, */
      };
    }
    case fotoDeUsuarioError: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: accion.error,
      };
    }
    case valoresDefaultFotoDeUsuario: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: null,
      };
    }
    case eliminarFotoDeUsuarioCargando: {
      return {
        ...state,
        cargandoFotoDeUsuario: accion.isCargando,
      };
    }
    case eliminarFotoDeUsuarioExito: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: null,
        usuario: accion.datos,
      };
    }
    case eliminarFotoDeUsuarioError: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: accion.error,
      };
    }
    case obtenerFotoDeUsuarioCargando: {
      return {
        ...state,
        cargandoFotoDeUsuario: accion.isCargando,
      };
    }
    case obtenerFotoDeUsuarioExito: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: null,
        usuario: accion.datos,
      };
    }
    case obtenerFotoDeUsuarioError: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: accion.error,
      };
    }
    case usuarioSinFoto: {
      return {
        ...state,
        cargandoFotoDeUsuario: false,
        errorFotoDeUsuario: null,
        usuario: accion.datos,
      };
    }
    default:
      return state;
  }
};
export default storeLogueo;
