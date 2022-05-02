import React, {useEffect, useLayoutEffect, useRef} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {Card, CardContent} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';
import './GraficoTabla.css';

const GraficoTabla = ({pregunta, datosGraficos}) => {
  const dispatch = useDispatch();
  const chart = useRef(null);

  useLayoutEffect(() => {
    //Creación de la instancia
    let graficaTabla = am4core.create(pregunta, am4charts.XYChart);
    //cantidad de saltos entre el arreglo de colores de am4charts.colors.next()
    graficaTabla.colors.step = 5;

    // graficaTabla.colors.step = datosGraficos.data.columnas.length;
    // graficaTabla.width = am4core.percent(150);
    // graficaTabla.width = am4core.percent(150);
    // Barras de Scroll
    /* X */
    // graficaTabla.scrollbarX = new am4core.Scrollbar();
    // graficaTabla.scrollbarX.marginBottom = 20;
    // // graficaTabla.scrollbarX.startGrip.contentWidth = 900;
    // graficaTabla.scrollbarX.minHeight = 5;
    // graficaTabla.scrollbarX.thumb.background.fill = am4core.color('#00afb3');
    // customizeGrip(graficaTabla.scrollbarX.startGrip);
    // customizeGrip(graficaTabla.scrollbarX.endGrip);
    // /* Y */
    // graficaTabla.scrollbarY = new am4core.Scrollbar();
    // graficaTabla.scrollbarY.marginLeft = 30;
    // graficaTabla.scrollbarY.minWidth = 5;
    // graficaTabla.scrollbarY.thumb.background.fill = am4core.color('#00afb3');
    // customizeGrip(graficaTabla.scrollbarY.startGrip);
    // customizeGrip(graficaTabla.scrollbarY.endGrip);

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

    //Título
    var title = graficaTabla.titles.create();
    title.text = pregunta;
    title.fontSize = 20;
    title.wrap = 'wrap';
    title.marginBottom = 5;

    graficaTabla.legend = new am4charts.Legend();
    graficaTabla.legend.position = 'top';
    graficaTabla.legend.paddingBottom = 10;
    graficaTabla.legend.labels.template.maxWidth = 95;

    var xAxis = graficaTabla.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'category';
    xAxis.renderer.cellStartLocation = 0;
    xAxis.renderer.cellEndLocation = 1;
    xAxis.renderer.grid.template.location = 0;
    var label = xAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 100;

    graficaTabla.yAxes.push(new am4charts.ValueAxis());
    // yAxis.width = am4core.percent(100);
    // yAxis.min = 0;
    // yAxis.renderer.minGridDistance = 200;

    function createSeries(value, name) {
      var series = graficaTabla.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;

      series.dataFields.categoryX = 'category';
      series.name = name;
      // series.events.on('hidden', arrangeColumns);
      // series.events.on('shown', arrangeColumns);

      var bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 15;
      bullet.label.fontSize = 20;
      bullet.label.text = '{valueY}';
      bullet.label.fill = am4core.color('#ffffff');

      return series;
    }
    graficaTabla.data = [
      ...Object.keys(datosGraficos.data).map(elemento => {
        var datos = {};
        if (elemento !== 'columnas') {
          datos = {category: elemento};
          datosGraficos.data[elemento].forEach(valor => {
            datos = {...datos, ...valor};
          });
        } else {
          datosGraficos.data[elemento].forEach(elemento => {
            createSeries(elemento, elemento);
          });
        }

        return datos;
      }),
    ];

    chart.current = graficaTabla;

    return () => {
      graficaTabla.dispose();
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
      <CardContent className="contenedor-Grafico-Tabla">
        <div
          id={pregunta}
          style={{
            height: '400px',
            width: Object.keys(datosGraficos.data).length < 5 ? '100%' : '150%',
          }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default GraficoTabla;

/* <Card>
<CardContent className="contenedor-Grafico-Tabla">
  <div id={pregunta} style={{height: '300px', width: '150%'}}></div>
</CardContent>
</Card> */
