import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {buscarFormulario} from '../../Redux/Formularios/AccionesFormularios';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import ConfigurarFormulario from './ConfigurarFormulario';

const ControlConfigurarFormulario = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(buscarFormulario(id));
    }
  }, [dispatch, id]);
  const {unFormulario, cargandoUnFormulario, errorUnFormulario} = useSelector(
    (state) => state.ReducerFormularios
  );
  if (cargandoUnFormulario) {
    return <Cargando />;
  } else {
    return errorUnFormulario ? (
      <ErrorGenerico mensaje={errorUnFormulario} />
    ) : (
      <ConfigurarFormulario unFormulario={unFormulario} />
    );
  }
};

export default ControlConfigurarFormulario;
