import {Card, CardContent} from '@material-ui/core';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';
import {useDispatch} from 'react-redux';
const GraficoEdadEncuestados = ({pregunta, datosGraficos}) => {
  const dispatch = useDispatch();
  const chart = useRef(null);

  useLayoutEffect(() => {
    // GARFICO DE EDADES
    var graficoEdades = am4core.create('edades', am4charts.XYChart);
    var titleEdades = graficoEdades.titles.create();
    titleEdades.text = 'Encuestados por Rango de Edades';
    titleEdades.fontSize = 20;
    titleEdades.marginBottom = 10;
    titleEdades.wrap = 'wrap';
    graficoEdades.colors.step = 4;
    // Add data
    graficoEdades.data = [
      {
        opcion: '15 a 24',
        cantidad: 0,
        color: graficoEdades.colors.next(),
      },
      {
        opcion: '25 a 35',
        cantidad: 0,
        color: graficoEdades.colors.next(),
      },
      {
        opcion: '36 a 46',
        cantidad: 0,
        color: graficoEdades.colors.next(),
      },
      {
        opcion: '47 a 55',
        cantidad: 0,
        color: graficoEdades.colors.next(),
      },
      {
        opcion: 'Mayor a 55',
        cantidad: 0,
        color: graficoEdades.colors.next(),
      },
    ];
    datosGraficos.data.forEach(elemento => {
      if (elemento >= 15 && elemento <= 24) {
        graficoEdades.data[0].cantidad++;
      }
      if (elemento >= 25 && elemento <= 35) {
        graficoEdades.data[1].cantidad++;
      }
      if (elemento >= 36 && elemento <= 46) {
        graficoEdades.data[2].cantidad++;
      }
      if (elemento >= 47 && elemento <= 55) {
        graficoEdades.data[3].cantidad++;
      }
      if (elemento > 55) {
        graficoEdades.data[4].cantidad++;
      }
    });

    // Create axes

    var categoryAxis = graficoEdades.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'opcion';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 10;

    categoryAxis.renderer.labels.template.adapter.add('dy', function (dy) {
      return dy;
    });

    graficoEdades.yAxes.push(new am4charts.ValueAxis());

    // Create series

    var series = graficoEdades.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'cantidad';
    series.dataFields.categoryX = 'opcion';
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    var bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.label.verticalCenter = 'bottom';
    bullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
    bullet.label.text = '{valueY}';

    graficoEdades.legend = new am4charts.Legend();
    graficoEdades.legend.background.fill = am4core.color('#000');
    graficoEdades.legend.background.fillOpacity = 0.05;
    graficoEdades.legend.position = 'right';
    graficoEdades.legend.align = 'left';
    graficoEdades.legend.data = [
      ...graficoEdades.data.map(dato => {
        return {name: dato.opcion, fill: dato.color};
      }),
    ];
    graficoEdades.legend.itemContainers.template.clickable = false;
    graficoEdades.legend.itemContainers.template.focusable = false;

    // graficoEdades.exporting.pdfmake
    //   .then(res => {
    //     graficoEdades.exporting
    //       .getImage('jpg')
    //       .then(imagen => {
    //         dispatch(
    //           cargarDatosParaPdfDeGraficos_Accion({
    //             pdfmake: {...res},
    //             imagen: imagen,
    //             error: false,
    //             grafico: pregunta,
    //           })
    //         );
    //       })
    //       .catch(error => {
    //         dispatch(
    //           cargarDatosParaPdfDeGraficos_Accion({
    //             pdfmake: {...res},
    //             imagen: null,
    //             error: error,
    //             grafico: pregunta,
    //           })
    //         );
    //       });
    //   })
    //   .catch(error => {
    //     dispatch(
    //       cargarDatosParaPdfDeGraficos_Accion({
    //         pdfmake: null,
    //         imagen: null,
    //         error: error,
    //         grafico: pregunta,
    //       })
    //     );
    //   });
    chart.current = graficoEdades;

    return () => {
      chart.current.dispose();
      graficoEdades.dispose();

    };
  }, [datosGraficos, dispatch, pregunta]);
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
        <div id="edades" style={{width: '100%', height: '400px'}}></div>
      </CardContent>
    </Card>
  );
};

export default GraficoEdadEncuestados;
