import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import EditorFormulario from './EditorFormulario';

const NuevoFormulario = () => {
  const {usuario} = useSelector((state) => state.ReducerUsuarios);
  const unFormulario = {
    id: '',
    titulo: '',
    subtitulo: '',
    componentes: [],
    usuarioId: usuario._id,
    errores: false,
  };

  return (
    <Fragment>
      <EditorFormulario formularioSeleccionado={unFormulario} edicion={false} />
    </Fragment>
  );
};

export default NuevoFormulario;
