import {Typography} from '@material-ui/core';
import React from 'react';
import {Fragment} from 'react-is';
/* import {useDispatch} from 'react-redux';
import {obtenerFotoDeUsuario} from '../../Redux/Usuarios/AccionesUsuarios';
import Cargando from '../Cargando/Cargando';
 */
import FormularioUsuario from './FormularioUsuario';

const Perfil = props => {
  const {usuario} = props;
  /* const dispatch = useDispatch(); */
  /* const {cargandoFotoDeUsuario} = useSelector(state => state.storeLogueo);
  console.log(cargandoFotoDeUsuario); */
  /* useEffect(() => {
    if (!usuario.foto) {
      dispatch(obtenerFotoDeUsuario(usuario));
    }
  }, [dispatch, usuario]); */
  return (
    <Fragment>
      <Typography variant="h6" color="initial" align="center">
        Perfil de: {usuario.nombre} {usuario.apellido}
      </Typography>
      <FormularioUsuario usuario={usuario} edicion={true} />
    </Fragment>
  );
};

export default Perfil;
