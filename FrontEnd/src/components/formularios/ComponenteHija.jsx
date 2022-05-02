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

const ComponenteHija = ({
  item,
  componentePadre,
  setComponentePadre,
  preview,
  edicion,
  setTipoComponente,
  isVotando,
  cargarVotacion,
}) => {
  const classes = useStyles();

  const actualizarDatoComponente = (datos) => {
    if (isVotando) {
      cargarVotacion(datos);
    } else {
      if (datos.prop !== 'value') {
        const componente = {...componentePadre.componente};
        componente[datos.prop] = datos.valor;
        setComponentePadre({...componentePadre, componente: componente});
      }
    }
  };
  const eliminarComponente = () => {
    setTipoComponente('');
    setComponentePadre({...componentePadre, componente: null});
  };
  switch (item.type) {
    case 'parrafo':
      return (
        <TipoParrafo
          item={item}
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
          classes={classes}
          actualizarDatoComponente={actualizarDatoComponente}
          eliminarComponente={eliminarComponente}
          edicion={edicion}
        />
      );
    case 'table':
      return (
        <TipoTablaDobleEntrada
          item={item}
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

export default ComponenteHija;
