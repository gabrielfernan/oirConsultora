import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {buscarFormulario} from '../../Redux/Formularios/AccionesFormularios';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import EditorFormulario from './EditorFormulario';

const EditarFormularjo = () => {
  const {id} = useParams();
  const {unFormulario, cargandoUnFormulario, errorUnFormulario} = useSelector(
    (state) => state.ReducerFormularios
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(buscarFormulario(id));
    }
  }, [dispatch, id]);

  if (cargandoUnFormulario) {
    return <Cargando />;
  } else {
    return (
      <div>
        {errorUnFormulario ? (
          <ErrorGenerico mensaje={errorUnFormulario} />
        ) : (
          <EditorFormulario formularioSeleccionado={unFormulario} edicion={true} />
        )}
      </div>
    );
  }
};

export default EditarFormularjo;
