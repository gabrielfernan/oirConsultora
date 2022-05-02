import API from '../Configuaracion/api';

export const nuevoUsuarioCargando = 'nuevoUsuarioCargando';
export const nuevoUsuarioExito = 'nuevoUsuarioExito';
export const nuevoUsuarioError = 'nuevoUsuarioError';

export const listadoUsuariosCargando = 'listadoUsuariosCargando';
export const listadoUsuariosExito = 'listadoUsuariosExito';
export const listadoUsuariosError = 'listadoUsuariosError';

export const eliminarUsuarioCargando = 'eliminarUsuarioCargando';
export const eliminarUsuarioExito = 'eliminarUsuarioExito';
export const eliminarUsuarioError = 'eliminarUsuarioError';

export const loginCargando = 'loginCargando';
export const loginExito = 'loginExito';
export const loginError = 'loginError';

export const editarUsuarioCargando = 'editarUsuarioCargando';
export const editarUsuarioExito = 'editarUsuarioExito';
export const editarMiPerfilExito = 'editarMiPerfilExito';
export const editarUsuarioError = 'editarUsuarioError';

export const buscarUsuarioCargando = 'buscarUsuarioCargando';
export const buscarUsuarioExito = 'buscarUsuarioExito';
export const buscarUsuarioError = 'buscarUsuarioError';

export const fotoDeUsuarioCargando = 'fotoDeUsuarioCargando';
export const fotoDeUsuarioError = 'fotoDeUsuarioError';
export const fotoDeUsuarioExito = 'fotoDeUsuarioExito';
export const valoresDefaultFotoDeUsuario = 'valoresDefaultFotoDeUsuario';

export const eliminarFotoDeUsuarioCargando = 'eliminarFotoDeUsuarioCargando';
export const eliminarFotoDeUsuarioExito = 'eliminarFotoDeUsuarioExito';
export const eliminarFotoDeUsuarioError = 'eliminarFotoDeUsuarioError';

export const obtenerFotoDeUsuarioCargando = 'obtenerFotoDeUsuarioCargando';
export const obtenerFotoDeUsuarioExito = 'obtenerFotoDeUsuarioExito';
export const obtenerFotoDeUsuarioError = 'obtenerFotoDeUsuarioError';
export const usuarioSinFoto = 'usuarioSinFoto';
/********** EDITAR FOTO DE PERFIL (MAXI) *************/

//ACCION ASYNC EDITAR FOTO DE PERFIL
export const editarFotoDeUsuarioCargando_Accion = isCargando => {
  return {
    type: fotoDeUsuarioCargando,
    isCargando: isCargando,
  };
};
export const editarFotoDeUsuarioExito_Accion = datos => {
  return {
    type: fotoDeUsuarioExito,
    datos: datos,
  };
};
export const editarFotoDeUsuarioError_Accion = error => {
  return {
    type: fotoDeUsuarioError,
    error: error,
  };
};
export const valoresDefaultFotoDeUsuario_Accion = () => {
  return {
    type: valoresDefaultFotoDeUsuario,
  };
};
export const editarFotoDeUsuario = (usuario, fotoDeUsuario) => {
  return dispatch => {
    dispatch(editarFotoDeUsuarioCargando_Accion(true));
    var fotoDePerfil = new FormData();
    fotoDePerfil.append('usuarioId', usuario._id);
    fotoDePerfil.append('archivos', fotoDeUsuario[0]);

    var token = localStorage.getItem('token');

    API({
      url: '/usuarios/cargarFoto',
      method: 'post',
      data: fotoDePerfil,
      headers: {'access-token': token},
    })
      .then(res => {
        dispatch(editarFotoDeUsuarioExito_Accion(res.data.value));
      })
      .catch(error => {
        console.log({error});
        dispatch(editarFotoDeUsuarioError_Accion(error));
      });
  };
};
/* ELIMINAR FOTO DE USUARIO */
export const eliminarFotoDeUsuarioCargando_Accion = isCargando => {
  return {
    type: eliminarFotoDeUsuarioCargando,
    isCargando: isCargando,
  };
};
export const eliminarFotoDeUsuarioExito_Accion = datos => {
  return {
    type: eliminarFotoDeUsuarioExito,
    datos: datos,
  };
};
export const eliminarFotoDeUsuarioError_Accion = error => {
  return {
    type: eliminarFotoDeUsuarioError,
    error: error,
  };
};
/* ASYNC ELIMINAR FOTO DE USUARIO */
export const eliminarFotoDeUsuario = usuario => {
  return dispatch => {
    dispatch(eliminarFotoDeUsuarioCargando_Accion(true));

    var token = localStorage.getItem('token');

    API({
      url: '/usuarios/eliminarFoto',
      method: 'delete',
      data: {usuarioId: usuario._id},
      headers: {'access-token': token},
    })
      .then(res => {
        usuario = {...usuario, foto: {}};
        dispatch(eliminarFotoDeUsuarioExito_Accion(usuario));
      })
      .catch(error => {
        dispatch(eliminarFotoDeUsuarioError_Accion(error));
      });
  };
};
/* OBTENER FOTO DE PERFIL */
export const obtenerFotoDeUsuarioCargando_Accion = isCargando => {
  return {
    type: obtenerFotoDeUsuarioCargando,
    isCargando: isCargando,
  };
};
export const obtenerFotoDeUsuarioExito_Accion = datos => {
  return {
    type: obtenerFotoDeUsuarioExito,
    datos: datos,
  };
};
export const obtenerFotoDeUsuarioError_Accion = error => {
  return {
    type: obtenerFotoDeUsuarioError,
    error: error,
  };
};
export const usuarioSinFoto_Accion = datos => {
  return {
    type: usuarioSinFoto,
    datos: datos,
  };
};
/* ASYNC OBTENER FOTO DE USUARIO */
export const obtenerFotoDeUsuario = usuario => {
  return dispatch => {
    dispatch(eliminarFotoDeUsuarioCargando_Accion(true));
    var token = localStorage.getItem('token');
    API({
      url: '/usuarios/obtenerFoto',
      method: 'post',
      data: {usuarioId: usuario._id},
      headers: {'access-token': token},
    })
      .then(res => {
        dispatch(obtenerFotoDeUsuarioExito_Accion(res.data.value));
      })
      .catch(error => {
        if (error.request.status === 400) {
          usuario = {...usuario, foto: {}};
          dispatch(usuarioSinFoto_Accion(usuario));
        } else {
          dispatch(obtenerFotoDeUsuarioError_Accion(error));
        }
      });
  };
};
//***********  ALTA USUARIO  **************//
export const nuevoUsuarioCargando_Accion = isCargando => {
  return {
    type: nuevoUsuarioCargando,
    isCargando: isCargando,
  };
};
export const nuevoUsuarioExito_Accion = nuevoUsuario => {
  return {
    type: nuevoUsuarioExito,
    nuevoUsuario: nuevoUsuario,
  };
};
export const nuevoUsuarioError_Accion = error => {
  return {
    type: nuevoUsuarioError,
    error: error,
  };
};
//ACCION ASYNC ALTA USUARIO
export const nuevoUsuario = nuevoUsuario => {
  return dispatch => {
    dispatch(nuevoUsuarioCargando_Accion(true));
    API({
      url: '/usuarios/alta',
      method: 'post',
      data: nuevoUsuario,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then(res => {
        dispatch(nuevoUsuarioExito_Accion(res.data));
      })
      .catch(error => {
        dispatch(nuevoUsuarioError_Accion(error));
      });
  };
};

//***********  LISTADO USUARIOS  **************//
export const listadoUsuariosCargando_Accion = isCargando => {
  return {
    type: listadoUsuariosCargando,
    isCargando: isCargando,
  };
};
export const listadoUsuariosExito_Accion = usuarios => {
  return {
    type: listadoUsuariosExito,
    usuarios: usuarios,
  };
};
export const listadoUsuariosError_Accion = error => {
  return {
    type: listadoUsuariosError,
    error: error,
  };
};
//ACCION ASYNC LISTADO USUARIOS
export const listado = () => {
  return dispatch => {
    dispatch(listadoUsuariosCargando_Accion(true));
    API({
      url: '/usuarios/listar',
      method: 'get',
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then(res => {
        dispatch(listadoUsuariosExito_Accion(res.data));
      })
      .catch(error => {
        dispatch(listadoUsuariosError_Accion(error));
      });
  };
};

//***********  ELIMINAR USUARIO  **************//
export const eliminarUsuarioCargando_Accion = isCargando => {
  return {
    type: eliminarUsuarioCargando,
    isCargando: isCargando,
  };
};
export const eliminarUsuarioExito_Accion = id => {
  return {
    type: eliminarUsuarioExito,
    id: id,
  };
};
export const eliminarUsuarioError_Accion = error => {
  return {
    type: eliminarUsuarioError,
    error: error,
  };
};
//ACCION ASYNC ELIMINAR USUARIOS
export const eliminarUsuario = id => {
  return dispatch => {
    dispatch(eliminarUsuarioCargando_Accion(true));
    API({
      url: '/usuarios/eliminar',
      method: 'delete',
      data: {_id: id},
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then(res => {
        dispatch(eliminarUsuarioExito_Accion(res.data));
      })
      .catch(error => {
        dispatch(eliminarUsuarioError_Accion(error));
      });
  };
};

//***********  Login  **************//
export const loginCargando_Accion = isCargando => {
  return {
    type: loginCargando,
    isCargando: isCargando,
  };
};
export const loginExito_Accion = token => {
  return {
    type: loginExito,
    token: token,
  };
};
export const loginError_Accion = error => {
  return {
    type: loginError,
    error: error,
  };
};
//ACCION ASYNC Login
export const login = ({usuario, password}) => {
  return dispatch => {
    dispatch(loginCargando_Accion(true));
    API({
      url: '/usuarios/login',
      method: 'post',
      data: {usuario: usuario, password: password},
    })
      .then(res => {
        console.log({res});
        dispatch(loginExito_Accion(res.data));
      })
      .catch(error => {
        console.log({error});
        if (error && error.response && error.response.status === 400) {
          dispatch(loginError_Accion('Usuario o contraseña incorrectas'));
        } else {
          dispatch(loginError_Accion('Problemas internos de servidor'));
        }
      });
  };
};
//***********  EDITAR MI PERFIL  **************//
export const editarUsuarioCargando_Accion = isCargando => {
  return {
    type: editarUsuarioCargando,
    isCargando: isCargando,
  };
};
export const editarUsuarioExito_Accion = usuarioEditado => {
  return {
    type: editarUsuarioExito,
    usuarioEditado: usuarioEditado,
  };
};
export const editarMiPerfilExito_Accion = token => {
  return {
    type: editarMiPerfilExito,
    token: token,
  };
};
export const editarUsuarioError_Accion = error => {
  return {
    type: editarUsuarioError,
    error: error,
  };
};
//ACCION ASYNC EDITAR Usuario
export const editarUsuario = usuario => {
  return dispatch => {
    dispatch(editarUsuarioCargando_Accion(true));
    let {foto, ...copiaUsuario} = usuario;
    API({
      url: '/usuarios/actualizar',
      method: 'put',
      data: copiaUsuario,
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then(res => {
        if (usuario.miPerfil) {
          dispatch(editarMiPerfilExito_Accion(res.data));
        } else {
          dispatch(editarUsuarioExito_Accion(res.data));
        }
      })
      .catch(error => {
        console.log({error});
        dispatch(editarUsuarioError_Accion('Usuario o contraseña incorrectas'));
      });
  };
};

//***********  BUSCAR USUARIO  **************//
export const buscarUsuarioCargando_Accion = isCargando => {
  return {
    type: buscarUsuarioCargando,
    isCargando: isCargando,
  };
};
export const buscarUsuarioExito_Accion = datos => {
  return {
    type: buscarUsuarioExito,
    datos: datos,
  };
};
export const buscarUsuarioError_Accion = error => {
  return {
    type: buscarUsuarioError,
    error: error,
  };
};
//ACCION ASYNC BUSCAR USUARIO
export const buscarUsuario = id => {
  return dispatch => {
    dispatch(buscarUsuarioCargando_Accion(true));
    API({
      url: '/usuarios/obtener',
      method: 'post',
      data: {_id: id},
      headers: {'access-token': localStorage.getItem('token')},
    })
      .then(res => {
        dispatch(buscarUsuarioExito_Accion(res.data));
      })
      .catch(error => {
        console.log({error});
        dispatch(buscarUsuarioError_Accion(error));
      });
  };
};
