import React, {useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';
import {cargandoDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';
import GraficoCheckbox from './GraficoCheckbox';
import GraficoDepartamentos from './GraficoDepartamentos';
import GraficoEdadEncuestados from './GraficoEdadEncuestados';
import GraficoGeneroEncuestados from './GraficoGeneroEncuestados';
import GraficoRadio from './GraficoRadio';
import GraficoRating from './GraficoRating';
import GraficoSelect from './GraficoSelect';
import GraficoTabla from './GraficoTabla';
import GraficoTexto from './GraficoTexto';

const ReporteGrafico = ({item, formularioReportes}) => {
  // const {item} = props;
  const dispatch = useDispatch();
  const pregunta = item[0];
  const datosGraficos = item[1];
  useLayoutEffect(() => {
    if (
      ['checkbox', 'radio', 'rating', 'select', 'table', 'graficoGenero', 'graficoEdad'].includes(
        datosGraficos.tipo
      )
    ) {
      dispatch(cargandoDatosParaPdfDeGraficos_Accion(pregunta));
    }

    return () => {};
  }, [datosGraficos, pregunta, dispatch]);
  return (
    <div>
      {['checkbox'].includes(datosGraficos.tipo) && (
        <GraficoCheckbox pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['radio'].includes(datosGraficos.tipo) && (
        <GraficoRadio pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['rating'].includes(datosGraficos.tipo) && (
        <GraficoRating pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['select'].includes(datosGraficos.tipo) && (
        <GraficoSelect pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['table'].includes(datosGraficos.tipo) && (
        <GraficoTabla pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['text', 'textarea'].includes(datosGraficos.tipo) && (
        <GraficoTexto pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
      {['graficoGenero'].includes(datosGraficos.tipo) && (
        <GraficoGeneroEncuestados
          pregunta={pregunta}
          datosGraficos={datosGraficos}
          formularioReportes={formularioReportes}
        />
      )}
      {['graficoDepartamentos'].includes(datosGraficos.tipo) && (
        <GraficoDepartamentos
          pregunta={pregunta}
          datosGraficos={datosGraficos}
          formularioReportes={formularioReportes}
        />
      )}
      {['graficoEdad'].includes(datosGraficos.tipo) && (
        <GraficoEdadEncuestados pregunta={pregunta} datosGraficos={datosGraficos} />
      )}
    </div>
  );
};

export default ReporteGrafico;
