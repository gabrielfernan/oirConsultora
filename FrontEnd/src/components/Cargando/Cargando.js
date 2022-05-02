import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Cargando.css';

const Cargando = () => {
  return (
    <React.Fragment>
      <div className="ContenedorCargandoGeneral">
        <CircularProgress color={'primary'} />
      </div>
    </React.Fragment>
  );
};

export default Cargando;
