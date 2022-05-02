import {Card, CardContent} from '@material-ui/core';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';
import {useDispatch} from 'react-redux';
const GraficoEncuestados = ({pregunta, datosGraficos, formularioReportes}) => {
  const dispatch = useDispatch();
  const chart = useRef(null);

  useLayoutEffect(() => {
    var iconPath =
      'M169.63,31.68v27.91c0,0-9.83,9.83-11.14,14.09s0,16.38,0,16.38s-1.31,23.59-3.93,26.54c-2.62,2.95-4.26,32.76-4.26,32.76s-7.86,3.93-11.47,6.55c-3.6,2.62-12.45,10.48-12.45,11.47c0,0.98,0.66,3.93-2.95,6.88c-3.6,2.95-9.83,4.91-7.21,14.09s8.19,26.54,8.19,26.54l2.29,27.19l4.59,4.59c0,0,5.24,38.33,0.66,50.13c-4.59,11.8-7.21,14.74-7.21,14.74l2.29,2.62h10.81c0,0,18.35,6.23,2.95,21.3s11.14,28.23-28.18,26.54c-2.27-0.1-5.9-2.68-5.9-2.68l-2.95,14.15l-10.3,9.5v13.76l-7.39,16.38l-5.24,16.38l-3.93,22.94v6.88l12.12,10.16c0,0-9.5-1.31-12.12,4.91s-6.55,14.42-6.55,14.42s-1.31,2.29-3.28,0c-1.97-2.29-6.23-6.88-6.23-6.88s-3.6-0.91-8.19,7.9s-3.93,23.55-3.93,23.55l-2.29,19.66c0,0-2.95,17.69,0,29.82c2.95,12.12,11.14,22.94,11.14,22.94s3.93,25.23,16.38,25.56s22.61,7.86,20.31,14.74s-8.52,13.11-8.52,13.11H73.3c0,0,9.5,18.68,8.85,25.88s2.95,13.76,2.95,13.76s6.55,3.6,12.78,2.62c6.23-0.98,7.86-2.62,15.73-2.29s14.42,5.24,26.87,0c12.45-5.24,27.85-4.91,31.45-4.91s6.55-1.31,6.55-1.31l2.95-20.97c0,0,4.91-2.95,8.52-4.59s13.76-9.5,13.76-9.5l25.23,1.97c0,0,8.85-16.71,13.43-17.69c4.59-0.98,11.14,4.91,14.74,10.81c3.6,5.9,6.55,8.52,6.55,8.52h17.04l1.97,45.48h31.13l41.94-32.38l20.97-1.31c0,0,18.35-16.71,27.19-12.12s8.85,4.59,8.85,4.59l20.64,25.56l49.48-4.91l12.12,7.86v-38.33l3.28,0.33v-28.18l14.09-1.31c0,0,0,3.28,3.28,2.62c3.28-0.66,14.09,0.66,14.09,0.66s8.85-5.24,13.43-1.97s5.9,4.91,5.9,4.91l40.63-0.98c0,0-6.55-16.71-12.12-19c-5.57-2.29-4.26-19.99-4.26-19.99s-8.52-1.31-13.43-5.57c-4.91-4.26-14.74-10.48-15.4-13.43s-0.98-18.02-0.98-18.02l-6.55-7.86l6.23-48.49c0,0-7.21-5.9-7.21-9.17s0.98-5.9,2.62-8.52c1.64-2.62,2.62-13.11-1.31-21.62c-3.93-8.52-16.05-25.23-16.05-25.23l-40.96-49.48l-7.21-1.31l-0.33-12.45l-36.7-37.68l-7.21-2.62l-29.82-34.4l-10.81-2.29v-7.86l-20.64-14.74l-1.97-6.88l-23.26-4.59l-20.31-1.31l-8.52-6.55l-12.45,0.33c0,0-0.33,2.95-2.62,2.95c-2.29,0-5.57,2.29-10.16,1.31c-4.59-0.98-11.8,5.24-16.71,1.31s-5.9-6.23-5.9-6.23l0.33-16.71c0,0,1.64-2.29,3.6-5.57c1.97-3.28,0.66-19.66,0.66-19.66s9.17-3.6,6.23-9.5c-2.95-5.9-8.52-8.52-8.52-8.52L266.61,151l8.85-9.83c0,0,9.83-3.6,4.26-10.81c-5.57-7.21-16.71-24.9-16.71-24.9l-10.81-10.48l-0.66-12.78c0,0-13.11-23.59-27.52-32.11s-19.66-3.6-19.66-3.6s0-8.19-5.57-8.19c-5.57,0-16.05,0.66-16.05,0.66s-4.26-7.27-6.23-7.27C174.54,31.68,169.63,31.68,169.63,31.68z';

    var graficoPersonas = am4core.create('personas', am4charts.SlicedChart);
    var title = graficoPersonas.titles.create();
    title.text = formularioReportes ? `${formularioReportes.titulo}.` : 'Encuesta sín título.';
    title.fontSize = 30;
    title.aling = 'center';
    title.wrap = 'wrap';
    title.marginBottom = 30;
    graficoPersonas.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    graficoPersonas.data = [...datosGraficos.data];

    var seriesPersona = graficoPersonas.series.push(new am4charts.PictorialStackedSeries());
    seriesPersona.dataFields.value = 'value';
    seriesPersona.dataFields.category = 'name';

    // seriesPersona.tooltip
    seriesPersona.labels.template.disabled = true;

    seriesPersona.maskSprite.path = iconPath;
    // seriesPersona.alignLabels = true;
    graficoPersonas.legend = new am4charts.Legend();
    graficoPersonas.legend.valueLabels.template.text = '{value.value}';
    graficoPersonas.legend.position = 'right';
    graficoPersonas.legend.itemContainers.template.clickable = false;
    graficoPersonas.legend.itemContainers.template.focusable = false;
    // graficoPersonas.legend.labels.template.maxWidth = 95;
    var legendTitle = graficoPersonas.legend.createChild(am4core.Label);
    legendTitle.text = `Total encuestados ${
      datosGraficos.data[0].value + datosGraficos.data[1].value
    }`;
    legendTitle.fontSize = 20;

    graficoPersonas.exporting.pdfmake
      .then(res => {
        graficoPersonas.exporting
          .getImage('jpg')
          .then(imagen => {
            dispatch(
              cargarDatosParaPdfDeGraficos_Accion({
                pdfmake: {...res},
                imagen: imagen,
                error: false,
                grafico: pregunta,
              })
            );
          })
          .catch(error => {
            dispatch(
              cargarDatosParaPdfDeGraficos_Accion({
                pdfmake: {...res},
                imagen: null,
                error: error,
                grafico: pregunta,
              })
            );
          });
      })
      .catch(error => {
        dispatch(
          cargarDatosParaPdfDeGraficos_Accion({
            pdfmake: null,
            imagen: null,
            error: error,
            grafico: pregunta,
          })
        );
      });
    chart.current = graficoPersonas;

    return () => {};
  }, [datosGraficos, dispatch, pregunta, formularioReportes]);
  useEffect(() => {
    if (chart && chart.current) {
      chart.current.exporting.pdfmake
        .then(res => {
          chart.current.exporting
            .getImage('png')
            .then(imagen => {
              dispatch(
                cargarDatosParaPdfDeGraficos_Accion({
                  pdfmake: {...res},
                  imagen: imagen,
                  error: false,
                  grafico: pregunta,
                })
              );
            })
            .catch(error => {
              console.log(error);
              dispatch(
                cargarDatosParaPdfDeGraficos_Accion({
                  pdfmake: {...res},
                  imagen: null,
                  error: error,
                  grafico: pregunta,
                })
              );
            });
        })
        .catch(error => {
          console.log({error});
          dispatch(
            cargarDatosParaPdfDeGraficos_Accion({
              pdfmake: null,
              imagen: null,
              error: error,
              grafico: pregunta,
            })
          );
        });
    }
    return () => {};
  }, [chart, dispatch, pregunta]);

  return (
    <Card>
      <CardContent>
        <div id="personas" style={{width: '100%', height: '300px'}}></div>
      </CardContent>
    </Card>
  );
};

export default GraficoEncuestados;
