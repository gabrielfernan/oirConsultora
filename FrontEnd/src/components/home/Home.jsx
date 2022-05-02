import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {obtenerFotoDeUsuario} from '../../Redux/Usuarios/AccionesUsuarios';
import ListadoFormularios from '../formularios/ListadoFormularios';

const Home = props => {
  const {usuario} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario.foto) {
      dispatch(obtenerFotoDeUsuario(usuario));
    }
  }, [dispatch, usuario]);
  return (
    <div>
      <ListadoFormularios usuario={usuario} />
    </div>
  );
};

export default Home;
