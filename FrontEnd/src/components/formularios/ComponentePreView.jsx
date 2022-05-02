import React, {Fragment} from 'react';

import TipoCaptcha from './TiposDeComponentePreView/TipoCaptcha';
import TipoTextoCorto from './TiposDeComponentePreView/TipoTextoCorto';
import TipoTextoLargo from './TiposDeComponentePreView/TipoTextoLargo';
import TipoParrafo from './TiposDeComponentePreView/TipoParrafo';
import TipoDesplegable from './TiposDeComponentePreView/TipoDesplegable';
import TipoOpcionUnica from './TiposDeComponentePreView/TipoOpcionUnica';
import TipoOpcionMultiple from './TiposDeComponentePreView/TipoOpcionMultiple';
import TipoNumero from './TiposDeComponentePreView/TipoNumero';
import TipoImagen from './TiposDeComponentePreView/TipoImagen';
import TipoHora from './TiposDeComponentePreView/TipoHora';
import TipoDatosEncuestado from './TiposDeComponentePreView/TipoDatosEncuestado';
import TipoSeparador from './TiposDeComponentePreView/TipoSeparador';
import TipoFecha from './TiposDeComponentePreView/TipoFecha';
import TipoRangoFechas from './TiposDeComponentePreView/TipoRangoFechas';
import TipoArchivo from './TiposDeComponentePreView/TipoArchivo';
import TipoSelectorPuntaje from './TiposDeComponentePreView/TipoSelectorPuntaje';
import TipoCondicional from './TiposDeComponentePreView/TipoCondicional';
//import TipoTablaEntrada from './TiposDeComponentePreView/TipoTablaEntrada';
import TipoTablaDobleEntrada from './TiposDeComponentes/TipoTablaDobleEntrada';

const ComponentePreView = (props) => {
  const {item, index, formulario, setFormulario, preview} = props;
  const actualizarDatoComponente = (datos) => {
    const componentes = [...formulario.componentes];
    componentes[datos.index][datos.prop] = datos.valor;
    setFormulario({...formulario, componentes: componentes});
  };
  return (
    <Fragment>
      {['text'].includes(item.type) && (
        <TipoTextoCorto item={item} index={index} preview={preview} />
      )}
      {['textarea'].includes(item.type) && (
        <TipoTextoLargo item={item} index={index} preview={preview} />
      )}
      {['parrafo'].includes(item.type) && (
        <TipoParrafo item={item} index={index} preview={preview} />
      )}
      {['select'].includes(item.type) && (
        <TipoDesplegable item={item} index={index} preview={preview} />
      )}
      {['radio'].includes(item.type) && (
        <TipoOpcionUnica item={item} index={index} preview={preview} />
      )}
      {['checkbox'].includes(item.type) && (
        <TipoOpcionMultiple item={item} index={index} preview={preview} />
      )}
      {['number'].includes(item.type) && <TipoNumero item={item} index={index} preview={preview} />}
      {['img'].includes(item.type) && <TipoImagen item={item} index={index} preview={preview} />}
      {['time'].includes(item.type) && <TipoHora item={item} index={index} preview={preview} />}
      {['userdata'].includes(item.type) && (
        <TipoDatosEncuestado item={item} index={index} preview={preview} />
      )}
      {['divider'].includes(item.type) && <TipoSeparador index={index} preview={preview} />}
      {['date'].includes(item.type) && <TipoFecha item={item} index={index} preview={preview} />}
      {['daterange'].includes(item.type) && (
        <TipoRangoFechas item={item} index={index} preview={preview} />
      )}
      {['recaptcha'].includes(item.type) && <TipoCaptcha index={index} preview={preview} />}
      {['file'].includes(item.type) && <TipoArchivo item={item} index={index} preview={preview} />}
      {['rating'].includes(item.type) && (
        <TipoSelectorPuntaje item={item} index={index} preview={preview} />
      )}
      {['condicional'].includes(item.type) && (
        <TipoCondicional item={item} index={index} preview={preview} />
      )}
      {['table'].includes(item.type) && (
        <TipoTablaDobleEntrada
          item={item}
          index={index}
          actualizarDatoComponente={actualizarDatoComponente}
          preview={preview}
          edicion={false}
        />
      )}
    </Fragment>
  );
};

export default ComponentePreView;
