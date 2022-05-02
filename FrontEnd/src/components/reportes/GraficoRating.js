import React, {useRef, useLayoutEffect, useEffect} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Card, CardContent} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';
import './GraficoRating.css';

am4core.useTheme(am4themes_animated);

const GraficoRating = props => {
  const {pregunta, datosGraficos} = props;
  const dispatch = useDispatch();

  const chart = useRef(null);

  useLayoutEffect(() => {
    //Creación de la instancia
    let graficaRating = am4core.create(pregunta, am4charts.XYChart);

    graficaRating.paddingRight = 20;

    //Título
    var title = graficaRating.titles.create();

    title.text = pregunta;
    title.fontSize = 25;
    title.wrap = 'wrap';
    title.marginBottom = 30;

    //Carga de datos
    let data = [];

    let max = Math.max(...Object.keys(datosGraficos.data));

    for (let puntos = 1; puntos <= max; puntos++) {
      data.push({
        puntaje: puntos,
        cantidad: datosGraficos.data[puntos] !== -Infinity ? datosGraficos.data[puntos] : 0,
      });
    }

    graficaRating.data = data;

    // Creación del eje X
    let ejeX = new am4charts.CategoryAxis();
    ejeX.dataFields.category = 'puntaje';
    ejeX.title.text = 'Puntaje';
    ejeX.scale = 1;
    graficaRating.xAxes.push(ejeX);

    //Creación del eje Y
    let ejeY = new am4charts.ValueAxis();
    ejeY.title.text = 'Cantidad de votos';
    ejeY.min = 0;
    graficaRating.yAxes.push(ejeY);

    //Series de datos
    let series = new am4charts.LineSeries();
    series.dataFields.valueY = 'cantidad';
    series.dataFields.categoryX = 'puntaje';
    series.name = 'Puntos';
    series.stroke = am4core.color('#4a2abb');
    series.strokeWidth = 2;
    series.tensionX = 0.8;
    series.bullets.push(new am4charts.CircleBullet());
    graficaRating.series.push(series);

    // Agregar un cursor
    graficaRating.cursor = new am4charts.XYCursor();

    chart.current = graficaRating;

    return () => {
      graficaRating.dispose();
      chart.current.dispose();

    };
  }, [pregunta, datosGraficos.data, dispatch]);
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
        <div id={pregunta} className="grafico-Rating"></div>
      </CardContent>
    </Card>
  );
};

export default GraficoRating;
