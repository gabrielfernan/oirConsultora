import React, {useRef, useLayoutEffect, useEffect} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {Card, CardContent} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';

import './GraficoSelect.css';
const GraficoSelect = props => {
  const dispatch = useDispatch();
  const {pregunta, datosGraficos} = props;

  const chart = useRef(null);
  useLayoutEffect(() => {
    //Para colores propios
    // function* gen() {
    //   yield '#641E16';
    //   yield '#512E5F';
    //   yield '#0E6251';
    //   yield '#F4D03F';
    //   yield '#17202A';
    //   yield '#F1948A';
    //   yield '#5499C7';
    //   yield '#45B39D';
    //   yield '#D35400';
    // }
    // const g = gen();

    //Creación de la instancia

    var graficaSelect = am4core.create(pregunta, am4charts.XYChart);
    graficaSelect.paddingRight = 20;
    //cantidad de saltos de colors.next()
    // documentacion https://www.amcharts.com/docs/v4/concepts/colors/
    graficaSelect.colors.step = 4;

    //Título
    var title = graficaSelect.titles.create();
    title.text = pregunta;
    title.fontSize = 25;
    title.wrap = 'wrap';
    title.marginBottom = 30;

    //Carga de datos
    graficaSelect.data = [
      ...Object.keys(datosGraficos.data).map(elemento => {
        var datos = {
          opcion: elemento,
          cantidad: datosGraficos.data[elemento],
          // color: g.next().value,
          color: datosGraficos.data[elemento] ? graficaSelect.colors.next() : null,
        };

        return datos;
      }),
    ];

    // Creación del eje X
    let categorias = graficaSelect.xAxes.push(new am4charts.CategoryAxis());

    categorias.dataFields.category = 'opcion';
    categorias.title.text = 'Opciones';
    var label = categorias.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 200;
    //https://www.amcharts.com/docs/v4/tutorials/managing-width-and-spacing-of-column-series/ documento de posicionamientos
    // cellStartLocation posicion de comienzo de la celda donde se pintara cada serie en el rango de (0 a 1)
    categorias.renderer.cellStartLocation = 0;
    // cellEndLocation posicion final de la celda donde se pintara cada serie en el rango de (0 a 1)
    categorias.renderer.cellEndLocation = 1;
    //Creación del eje Y
    let valores = graficaSelect.yAxes.push(new am4charts.ValueAxis());
    valores.title.text = 'Cantidad de votos';

    //Series de datos
    var series = graficaSelect.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'cantidad';
    series.dataFields.categoryX = 'opcion';
    series.name = 'Cantidad de votos';
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';

    series.columns.template.width = am4core.percent(50);
    series.strokeWidth = 0.4;
    var bullet = series.bullets.push(new am4charts.LabelBullet());

    bullet.interactionsEnabled = false;
    bullet.dy = 15;
    bullet.label.text = '{valueY}';
    bullet.label.fontSize = 15;
    bullet.label.fill = am4core.color('#ffffff');

    // Agregar un cursor

    // graficaSelect.cursor = new am4charts.XYCursor();

    // scroll eje x
    // graficaSelect.scrollbarX = new am4core.Scrollbar();
    // graficaSelect.scrollbarX.marginBottom = 20;
    // // graficaSelect.scrollbarX.startGrip.contentWidth = 900;
    // graficaSelect.scrollbarX.minHeight = 5;
    // graficaSelect.scrollbarX.thumb.background.fill = am4core.color('#00afb3');
    // customizeGrip(graficaSelect.scrollbarX.startGrip);
    // customizeGrip(graficaSelect.scrollbarX.endGrip);
    // function customizeGrip(grip) {
    //   grip.icon.disabled = true;
    //   grip.background.disabled = true;
    //   var img = grip.createChild(am4core.Circle);
    //   img.width = 10;
    //   img.height = 10;
    //   img.fill = am4core.color('#00afb3');
    //   img.align = 'center';
    //   img.valign = 'middle';
    // }

    chart.current = graficaSelect;

    return () => {
      graficaSelect.dispose();
      chart.current.dispose();
    };
  }, [pregunta, datosGraficos.data, dispatch]);
  useEffect(() => {
    if (chart && chart.current && chart.current.exporting) {
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
      <CardContent className="contenedor-Grafico-Select">
        <div
          id={pregunta}
          style={{
            height: '300px',
            width: Object.keys(datosGraficos.data).length < 5 ? '100%' : '150%',
          }}
        ></div>
      </CardContent>
    </Card>
  );
};

/* <Card>
<CardContent className="contenedor-Grafico-Select">
  <div id={pregunta} style={{height: '300px', width: '130%'}}></div>
</CardContent>
</Card> */

export default GraficoSelect;
