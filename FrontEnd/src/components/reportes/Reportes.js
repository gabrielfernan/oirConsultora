import React, {useEffect} from 'react';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import ReporteGrafico from './ReporteGrafico';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Box, Button, IconButton, Paper, Slider, TextField, Tooltip} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import useGlobalStyles from '../../app/estilos/cssglobal';
import {Fragment} from 'react';
import constantes from '../../app/constantes';
import {useDispatch, useSelector} from 'react-redux';
import Cargando from '../Cargando/Cargando';
import generarPdfReportes from './generarPdfReportes';

import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import {
  cargarProDefectoPdfDeGraficos_Accion,
  filtrarVotaciones,
  obtenerReportesPorIdDeFormulario,
} from '../../Redux/Reportes/AccionesReportes';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ReactExport from 'react-export-excel'; //import AddBoxIcon from '@material-ui/icons//AddBox';
const Reportes = () => {
  const dispatch = useDispatch();
  const {
    reportes,
    cargandoReportes,
    errorReportes,
    isCargandoFiltros,
    datosPDF,
    datosExcel,
    pdfMake,
    formularioReportes,
  } = useSelector(state => state.ReducerReportes);
  const formularios = useSelector(state => state.ReducerFormularios.formularios);
  const {id} = useParams();
  const fechaDeHoy = new Date();
  const classes = useGlobalStyles();
  const [rangoEdad, setRangoEdad] = useState([1, 100]);
  const [sexo, setSexo] = useState('');
  const [departamento, setDepartamento] = useState(0);
  const [isCargandoDatosPDF, setIsCargandoDatosPDF] = useState(true);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  useEffect(() => {
    if (id && formularios) {
      const formulario = formularios.find(formulario => formulario._id === id);
      dispatch(obtenerReportesPorIdDeFormulario(id, formulario));

      // dispatch(cargarProDefectoPdfDeGraficos_Accion());
    }
    return () => {
      dispatch(cargarProDefectoPdfDeGraficos_Accion());
    };
  }, [id, dispatch, formularios]);
  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    if (datosPDF) {
      var isCargando = false;
      datosPDF.forEach(elemento => {
        if (elemento.cargando) {
          isCargando = true;
        }
      });
      setIsCargandoDatosPDF(isCargando);
    }
    return () => {};
  }, [datosPDF]);

  const handleChangeRangeEdad = (event, newValue) => {
    setRangoEdad(newValue);
  };

  const handleSexo = event => {
    setSexo(event.target.value);
  };

  const handleDepartamento = event => {
    setDepartamento(event.target.value);
  };
  const filtrar = () => {
    const rango = Array.apply(null, {length: rangoEdad[1]}).map(function (value, index) {
      return (index + rangoEdad[0]).toString();
    });
    dispatch(
      filtrarVotaciones({
        edad: rango,
        sexo: sexo ? [sexo] : null,
        departamento: departamento ? [departamento.toString()] : null,
      })
    );
  };

  const eventoClickPDF = () => {
    if (datosPDF) {
      let DatosDepartamentos = reportes.find(
        datosGrafico => datosGrafico[1].tipo === 'graficoDepartamentos'
      );
      generarPdfReportes(
        [...datosPDF],
        pdfMake,
        formularioReportes,
        DatosDepartamentos[1].data,
        reportes.filter(grafico => grafico[1].tipo === 'text' || grafico[1].tipo === 'textarea')
      );
      // dispatch(cargarProDefectoPdfDeGraficos_Accion());
    } else {
      console.log('No hay datos para generar Reportes');
    }
  };

  if (cargandoReportes) {
    return <Cargando />;
  } else {
    if (errorReportes) {
      return <ErrorGenerico mensaje={errorReportes} />;
    } else {
      return (
        <Fragment>
          <Box mt={3}>
            <Paper elevation={0} variant="outlined" className={classes.padding15}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} align="center">
                  <Typography variant="h4" color="initial">
                    REPORTES
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} align="center">
                  <Typography variant="h6" color="initial">
                    Fecha:{' '}
                  </Typography>
                  <Typography variant="h6" color="initial">
                    {` ${fechaDeHoy.getDate()}/${
                      fechaDeHoy.getMonth() + 1
                    }/${fechaDeHoy.getUTCFullYear()} `}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} /* md={4} lg={4} xl={4} */ align="center">
                  <Typography style={{marginRight: '0.3rem'}} variant="h6" color="initial">
                    Descargas:
                  </Typography>

                  <Tooltip title="PDF" arrow>
                    <IconButton onClick={!isCargandoDatosPDF ? () => eventoClickPDF() : null}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </Tooltip>

                  <ExcelFile
                    filename={formularioReportes.titulo}
                    element={
                      <Tooltip title="Excel" arrow>
                        <IconButton>
                          <LibraryBooksIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ExcelSheet
                      data={[
                        {nombre: '', apellido: '', edad: ''},
                        {
                          nombre: 'Nombre y Apellido',
                          edad: 'Edad',
                          departamento: 'Departamento',
                          sexo: 'Sexo',
                          email: 'Email',
                          dni: 'N° de Documento',
                          telefono: 'Telefono',
                        },
                        ...datosExcel,
                      ]}
                      name="encuestados"
                    >
                      <ExcelColumn
                        widthPx="50"
                        label="Personas Registradas en el Sistema"
                        value="nombre"
                      />
                      <ExcelColumn label="Fecha" value="edad" />
                      <ExcelColumn
                        label={` ${fechaDeHoy.getDate()}/${
                          fechaDeHoy.getMonth() + 1
                        }/${fechaDeHoy.getUTCFullYear()} `}
                        value="departamento"
                      />
                      <ExcelColumn label="" value="sexo" />
                      <ExcelColumn label="" value="email" />
                      <ExcelColumn label="" value="dni" />
                      <ExcelColumn label="" value="telefono" />
                    </ExcelSheet>
                  </ExcelFile>
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Typography variant="body2" id="range-slider" color="initial">
                    Rango de edad: [{rangoEdad[0]} - {rangoEdad[1]}]
                  </Typography>
                  <Slider
                    value={rangoEdad}
                    onChange={handleChangeRangeEdad}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                    label="Sexo"
                    name="sexo"
                    value={sexo}
                    defaultValue=""
                    onChange={handleSexo}
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                  >
                    <option value="">Todos</option>
                    {constantes.SEXO.map((sexo, index) => (
                      <option value={sexo.valor} key={index}>
                        {sexo.etiqueta}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <TextField
                    name="departamento"
                    value={departamento}
                    defaultValue="0"
                    onChange={handleDepartamento}
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                  >
                    {constantes.DEPARTAMENTOS.map((departamento, index) => (
                      <option value={departamento.valor} key={index}>
                        {departamento.etiqueta}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<FilterListIcon />}
                    onClick={() => filtrar()}
                    className={`${classes.estilosBoton} ${classes.degradeVerde}`}
                  >
                    FILTRAR
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box mt={5}>
            {isCargandoFiltros ? (
              <Cargando />
            ) : (
              <Grid container spacing={1}>
                {reportes.length === 0 ? (
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" color="initial" align="center">
                        No hay resultados con los criterios de búsqueda seleccionados
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  reportes.map((grafico, index) => (
                    <Grid item xs={12} key={index}>
                      <ReporteGrafico item={grafico} formularioReportes={formularioReportes} />
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </Box>
        </Fragment>
      );
    }
  }
};

export default Reportes;
// useLayoutEffect(() => {
//   const resultados = async () => {
//     let datos = {};
//     const response = await fetch(`http://localhost:3001/votaciones?formularioId=${id}`);
//     const votaciones = await response.json();
//     votaciones.forEach((votos) => {
//       votos.respuestas.forEach((respuesta) => {
//         if (['radio', 'select', 'rating', 'checkbox', 'table'].includes(respuesta.tipo)) {
//           if (!Object.keys(datos).includes(respuesta.pregunta)) {
//             datos[respuesta.pregunta] = {
//               tipo: respuesta.tipo,
//               data: {},
//             };
//           }
//           if (['radio', 'select', 'rating'].includes(respuesta.tipo)) {
//             if (!Object.keys(datos[respuesta.pregunta]['data']).includes(respuesta.respuesta)) {
//               datos[respuesta.pregunta]['data'][respuesta.respuesta] = 1;
//             } else {
//               datos[respuesta.pregunta]['data'][respuesta.respuesta]++;
//             }
//           }
//           if (['checkbox'].includes(respuesta.tipo)) {
//             respuesta.respuesta.forEach((resp) => {
//               if (!Object.keys(datos[respuesta.pregunta]['data']).includes(resp)) {
//                 datos[respuesta.pregunta]['data'][resp] = 1;
//               } else {
//                 datos[respuesta.pregunta]['data'][resp]++;
//               }
//             });
//           }
//           if (['table'].includes(respuesta.tipo)) {
//             Object.keys(respuesta.respuesta).forEach((resp) => {
//               if (!Object.keys(datos[respuesta.pregunta]['data']).includes(resp)) {
//                 datos[respuesta.pregunta]['data'][resp] = [];
//                 datos[respuesta.pregunta]['data'][resp].push({[respuesta.respuesta[resp]]: 1});
//               } else {
//                 //arre.map(a => Object.keys(a)[0])
//                 if (
//                   !datos[respuesta.pregunta]['data'][resp]
//                     .map((r) => Object.keys(r)[0])
//                     .includes(respuesta.respuesta[resp])
//                 ) {
//                   //datos[respuesta.pregunta]['data'][resp] = []
//                   datos[respuesta.pregunta]['data'][resp].push({[respuesta.respuesta[resp]]: 1});
//                 } else {
//                   let index = datos[respuesta.pregunta]['data'][resp]
//                     .map((r) => Object.keys(r)[0])
//                     .indexOf(respuesta.respuesta[resp]);
//                   datos[respuesta.pregunta]['data'][resp][index][respuesta.respuesta[resp]]++;
//                 }
//               }
//             });
//           }
//         } else {
//           if (['text', 'textarea'].includes(respuesta.tipo)) {
//             if (!Object.keys(datos).includes(respuesta.pregunta)) {
//               datos[respuesta.pregunta] = {
//                 tipo: respuesta.tipo,
//                 data: [],
//               };
//             }
//             datos[respuesta.pregunta]['data'].push({
//               respuesta: respuesta.respuesta,
//               apellido_nombre: votos.usuario.apellido + ', ' + votos.usuario.nombre,
//               sexo: votos.usuario.sexo,
//               edad: parseInt(votos.usuario.edad),
//               departamento: votos.usuario.departamento,
//             });
//           }
//         }
//       });
//     });
//     setGraficos(Object.entries(datos));
//   };

//   resultados();
// }, [id, setGraficos]);

// const filtrar = async () => {
//   let datos = {};
//   const response = await fetch(`http://localhost:3001/votaciones?formularioId=${id}`);
//   const votaciones = await response.json();
//   votaciones.forEach((votos) => {
//     if (
//       parseInt(votos.usuario.edad) >= rangoEdad[0] &&
//       parseInt(votos.usuario.edad) <= rangoEdad[1] &&
//       (sexo === '' || sexo === votos.usuario.sexo) &&
//       (departamento === 0 || departamento === votos.usuario.departamento)
//     ) {
//       votos.respuestas.forEach((respuesta) => {
//         if (['radio', 'select', 'rating', 'checkbox', 'table'].includes(respuesta.tipo)) {
//           if (!Object.keys(datos).includes(respuesta.pregunta)) {
//             datos[respuesta.pregunta] = {
//               tipo: respuesta.tipo,
//               data: {},
//             };
//           }
//           if (['radio', 'select', 'rating'].includes(respuesta.tipo)) {
//             if (!Object.keys(datos[respuesta.pregunta]['data']).includes(respuesta.respuesta)) {
//               datos[respuesta.pregunta]['data'][respuesta.respuesta] = 1;
//             } else {
//               datos[respuesta.pregunta]['data'][respuesta.respuesta]++;
//             }
//           }
//           if (['checkbox'].includes(respuesta.tipo)) {
//             respuesta.respuesta.forEach((resp) => {
//               if (!Object.keys(datos[respuesta.pregunta]['data']).includes(resp)) {
//                 datos[respuesta.pregunta]['data'][resp] = 1;
//               } else {
//                 datos[respuesta.pregunta]['data'][resp]++;
//               }
//             });
//           }
//           if (['table'].includes(respuesta.tipo)) {
//             Object.keys(respuesta.respuesta).forEach((resp) => {
//               if (!Object.keys(datos[respuesta.pregunta]['data']).includes(resp)) {
//                 datos[respuesta.pregunta]['data'][resp] = [];
//                 datos[respuesta.pregunta]['data'][resp].push({[respuesta.respuesta[resp]]: 1});
//               } else {
//                 //arre.map(a => Object.keys(a)[0])
//                 if (
//                   !datos[respuesta.pregunta]['data'][resp]
//                     .map((r) => Object.keys(r)[0])
//                     .includes(respuesta.respuesta[resp])
//                 ) {
//                   //datos[respuesta.pregunta]['data'][resp] = []
//                   datos[respuesta.pregunta]['data'][resp].push({[respuesta.respuesta[resp]]: 1});
//                 } else {
//                   let index = datos[respuesta.pregunta]['data'][resp]
//                     .map((r) => Object.keys(r)[0])
//                     .indexOf(respuesta.respuesta[resp]);
//                   datos[respuesta.pregunta]['data'][resp][index][respuesta.respuesta[resp]]++;
//                 }
//               }
//             });
//           }
//         } else {
//           if (['text', 'textarea'].includes(respuesta.tipo)) {
//             if (!Object.keys(datos).includes(respuesta.pregunta)) {
//               datos[respuesta.pregunta] = {
//                 tipo: respuesta.tipo,
//                 data: [],
//               };
//             }
//             datos[respuesta.pregunta]['data'].push({
//               respuesta: respuesta.respuesta,
//               apellido_nombre: votos.usuario.apellido + ', ' + votos.usuario.nombre,
//               sexo: votos.usuario.sexo,
//               edad: parseInt(votos.usuario.edad),
//               departamento: votos.usuario.departamento,
//             });
//           }
//         }
//       });
//     }
//   });
//   setGraficos(Object.entries(datos));
// };
