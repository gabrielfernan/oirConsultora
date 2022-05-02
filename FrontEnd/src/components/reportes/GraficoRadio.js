import React, {useEffect, useLayoutEffect, useRef} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Card, CardContent} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';

am4core.useTheme(am4themes_animated);

const GraficoRadio = props => {
  const {pregunta, datosGraficos} = props;
  const dispatch = useDispatch();
  const chart = useRef(null);

  useLayoutEffect(() => {
    //Creación de la instancia
    let graficaRadio = am4core.create(pregunta, am4charts.PieChart);
    graficaRadio.paddingRight = 20;

    //Título
    var title = graficaRadio.titles.create();

    title.text = pregunta;
    title.fontSize = 25;
    title.wrap = 'wrap';
    title.marginBottom = 30;

    //Carga de datos

    graficaRadio.data = [
      ...Object.keys(datosGraficos.data).map(elemento => {
        var datos = {
          opcion: elemento,
          cantidad: datosGraficos.data[elemento],
        };
        return datos;
      }),
    ];
    // for (const dato in datosGraficos.data) {
    //   data.push({
    //     opcion: dato,
    //     cantidad: datosGraficos.data[dato],
    //   });
    // }

    // graficaRadio.data = data;

    //Series de datos
    let pieSeries = new am4charts.PieSeries();

    pieSeries.dataFields.value = 'cantidad';
    pieSeries.dataFields.category = 'opcion';
    pieSeries.labels.template.maxWidth = 300;
    pieSeries.labels.template.wrap = true;
    pieSeries.colors.list = [];
    // Object.keys(datosGraficos.data).forEach(elemento => {
    //   pieSeries.colors.list.push(colorSet.next());
    // });
    pieSeries.colors.step = 4;
    graficaRadio.series.push(pieSeries);

    //Para el borde de cada sector
    pieSeries.slices.template.stroke = am4core.color('#4a2abb');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    //Para el hueco del medio
    graficaRadio.innerRadius = am4core.percent(40);

    chart.current = graficaRadio;

    return () => {
      graficaRadio.dispose();
      chart.current.dispose();

    };
  }, [pregunta, datosGraficos.data]);
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
        <div id={pregunta} style={{width: '100%', height: '300px'}}></div>
      </CardContent>
    </Card>
  );
};

export default GraficoRadio;
