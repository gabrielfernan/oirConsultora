import React, {Fragment} from 'react';
import {Box, Typography} from '@material-ui/core';
import FormularioUsuario from './FormularioUsuario';
import useGlobalStyles from '../../app/estilos/cssglobal';
import {useSelector} from 'react-redux';

const NuevoUsuario = () => {
  const classesGlobal = useGlobalStyles();
  const usuario = useSelector(state => state.ReducerUsuarios.usuario);
  return (
    <Fragment>
      <Box width="100%" mt={2} className={`${classesGlobal.degradeVerde}`}>
        <Box ml={2}>
          <Typography variant="h6" color="initial" align="center">
            CREAR USUARIO
          </Typography>
        </Box>
      </Box>
      <FormularioUsuario edicion={true} isNuevoUsuario={true} usuarioLogueado={usuario} />
    </Fragment>
  );
};

export default NuevoUsuario;
