import React from 'react';

import useStyles from './componentesCSS';
import 'suneditor/dist/css/suneditor.min.css';
import TipoCheckbox from './TiposDeComponentes/TipoCheckbox';
import TipoParrafo from './TiposDeComponentes/TipoParrafo';
import TipoRadio from './TiposDeComponentes/TipoRadio';
import TipoImg from './TiposDeComponentes/TipoImg';
import TipoTime from './TiposDeComponentes/TipoTime';
import TipoUserData from './TiposDeComponentes/TipoUserData';
import TipoDivider from './TiposDeComponentes/TipoDivider';
import TipoDateRanger from './TiposDeComponentes/TipoDateRanger';
import TipoFile from './TiposDeComponentes/TipoFile';
import TipoRating from './TiposDeComponentes/TipoRating';
import TipoCondicional from './TiposDeComponentes/TipoCondicional';
import TipoRecaptcha from './TiposDeComponentes/TipoRecaptcha';
import TipoTablaDobleEntrada from './TiposDeComponentes/TipoTablaDobleEntrada';
import TipoDesplegable from './TiposDeComponentes/TipoDesplegable';
import TipoTex from './TiposDeComponentes/TipoText';
import TipoTextArea from './TiposDeComponentes/TipoTextArea';
import TipoNumber from './TiposDeComponentes/TipoNumber';
import TipoDate from './TiposDeComponentes/TipoDate';

const Componentes = ({item, index, formulario, setFormulario, preview, edicion}) => {
  const classes = useStyles();
  const actualizarDatoComponente = datos => {
    const componentes = [...formulario.componentes];
    componentes[datos.index][datos.prop] = datos.valor;
    componentes[datos.index]['mensajeErrorComponente'] = null;
    setFormulario({...formulario, componentes: componentes});
  };
  const actualizarComponenteCompleta = datos => {
    const componentes = [...formulario.componentes];
    componentes[datos.index] = datos.valor;
    setFormulario({...formulario, componentes: componentes});
  };
  const eliminarComponente = () => {
    const componentes = [...formulario.componentes];
    componentes.splice(index, 1);
    setFormulario({...formulario, componentes: componentes});
  };
  switch (item.type) {
    case 'parrafo':
      return (
        <TipoParrafo
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'radio':
      return (
        <TipoRadio
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'checkbox':
      return (
        <TipoCheckbox
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'img':
      return (
        <TipoImg
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'time':
      return (
        <TipoTime
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'userdata':
      return (
        <TipoUserData
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'divider':
      return (
        <TipoDivider
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'daterange':
      return (
        <TipoDateRanger
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'recaptcha':
      return (
        <TipoRecaptcha
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'file':
      return (
        <TipoFile
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'rating':
      return (
        <TipoRating
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'condicional':
      return (
        <TipoCondicional
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          actualizarComponenteCompleta={actualizarComponenteCompleta}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'table':
      return (
        <TipoTablaDobleEntrada
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          preview={preview}
          edicion={edicion}
        />
      );
    case 'select':
      return (
        <TipoDesplegable
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'text':
      return (
        <TipoTex
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'textarea':
      return (
        <TipoTextArea
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'number':
      return (
        <TipoNumber
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'date':
      return (
        <TipoDate
          item={item}
          index={index}
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    default:
      //TODO:Falta implementar que hacer cuando no encontro la opcion
      return null;
  }
};

export default Componentes;
