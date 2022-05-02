import React, {useRef, useLayoutEffect, useEffect} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Card, CardContent} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {cargarDatosParaPdfDeGraficos_Accion} from '../../Redux/Reportes/AccionesReportes';

am4core.useTheme(am4themes_animated);

const GraficoCheckbox = props => {
  const {pregunta, datosGraficos} = props;
  const dispatch = useDispatch();
  const chart = useRef(null);

  useLayoutEffect(() => {
    //Creación de la instancia
    let graficaCheckBox = am4core.create(pregunta, am4charts.PieChart3D);

    graficaCheckBox.paddingRight = 20;
    // graficaCheckBox.colors.step = 10;

    //Título
    var title = graficaCheckBox.titles.create();

    title.text = pregunta;
    title.fontSize = 25;
    title.wrap = 'wrap';
    title.marginBottom = 30;

    //Carga de datos
    let data = [];

    for (const dato in datosGraficos.data) {
      data.push({
        opcion: dato,
        cantidad: datosGraficos.data[dato],
      });
    }

    graficaCheckBox.data = data;

    //Series de datos
    let pieSeries = new am4charts.PieSeries3D();

    pieSeries.dataFields.value = 'cantidad';
    pieSeries.dataFields.category = 'opcion';

    //Para el borde de cada sector
    pieSeries.slices.template.stroke = am4core.color('#4a2abb');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.colors.step = 3;
    graficaCheckBox.series.push(pieSeries);

    chart.current = graficaCheckBox;

    return () => {
      graficaCheckBox.dispose();
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
        <div id={pregunta} style={{width: '100%', height: '300px'}}></div>
      </CardContent>
    </Card>
  );
};

export default GraficoCheckbox;
