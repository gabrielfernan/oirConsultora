import React, {Fragment, useEffect} from 'react';
import {Typography} from '@material-ui/core';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {buscarUsuario} from '../../Redux/Usuarios/AccionesUsuarios';
import FormularioUsuario from './FormularioUsuario';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
const Usuario = () => {
  const {id} = useParams();
  const {unUsuario, unUsuarioCargando, unUsuarioError, usuario} = useSelector(
    state => state.ReducerUsuarios
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarUsuario(id));
  }, [dispatch, id]);

  if (unUsuarioCargando) return <Cargando />;
  else {
    return unUsuarioError ? (
      <ErrorGenerico mensaje={unUsuarioError} />
    ) : (
      <Fragment>
        <Typography variant="h6" color="initial" align="center">
          Editar perfil de: {unUsuario.nombre} {unUsuario.apellido}
        </Typography>
        <FormularioUsuario usuario={unUsuario} edicion={true} usuarioLogueado={usuario} />
      </Fragment>
    );
  }
};

export default Usuario;
