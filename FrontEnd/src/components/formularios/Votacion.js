import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import useStyles from './editorFormularioCSS';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {
  Paper,
  Grid,
  // Card,
  // CardContent,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  buscarFormularioParaVotacion,
  cerrarModalErrorVotacion_accion,
  enviarVotacionFormulario,
} from '../../Redux/Formularios/AccionesFormularios';

import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import {validarDatos} from './validarCamposVotacion';
import Componentes from './Componentes';
import useGlobalStyles from '../../app/estilos/cssglobal';
const Votacion = () => {
  const {id} = useParams();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const {usuario} = useSelector(state => state.ReducerUsuarios);

  const {
    unFormulario,
    cargandoUnFormulario,
    errorUnFormulario,
    cargandoVotacion,
    errorVotacion,
    exitoVotacion,
  } = useSelector(state => state.ReducerFormularios);

  const [formulario, setFormulario] = useState(unFormulario);

  const dispatch = useDispatch();
  //const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(buscarFormularioParaVotacion(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (unFormulario) {
      setFormulario(unFormulario);
    }
  }, [unFormulario]);
  const enviarEncuesta = () => {
    const errores = validarDatos(formulario, setFormulario);
    if (!Object.keys(errores).length) {
      let usuario = {};
      let respuestas = {};
      formulario.componentes.forEach(componente => {
        switch (componente.type) {
          case 'userdata': {
            usuario = componente.value;
            break;
          }
          case 'table': {
            respuestas = {
              ...respuestas,
              [componente.pregunta.replaceAll('.', ' ')]: {
                respuesta: componente.value,
                tipo: componente.type,
                columnas: componente.columnas,
              },
            };
            break;
          }
          case 'condicional': {
            if (componente.value === 'si') {
              respuestas = {
                ...respuestas,
                [componente.pregunta.replaceAll('.', ' ')]: {
                  respuesta: componente.value,
                  tipo: componente.type,
                  [componente.componente.pregunta.replaceAll('.', ' ')]: {
                    respuesta: componente.componente.value,
                    tipo: componente.componente.type,
                  },
                },
              };
            } else {
              respuestas = {
                ...respuestas,
                [componente.pregunta.replaceAll('.', ' ')]: {
                  respuesta: componente.value,
                  tipo: componente.type,
                },
              };
            }
            break;
          }
          case 'radio':
          case 'checkbox':
          case 'select': {
            respuestas = {
              ...respuestas,
              [componente.pregunta.replaceAll('.', ' ')]: {
                respuesta: componente.value,
                tipo: componente.type,
                opciones: [...componente.options],
              },
            };
            break;
          }

          default: {
            if (!['divider', 'recaptcha', 'parrafo', 'userdata'].includes(componente.type)) {
              respuestas = {
                ...respuestas,
                [componente.pregunta.replaceAll('.', ' ')]: {
                  respuesta: componente.value,
                  tipo: componente.type,
                },
              };
            }
            break;
          }
        }
      });

      dispatch(
        enviarVotacionFormulario({
          respuestas: respuestas,
          idFormulario: formulario._id,
          datosEncuestado: usuario,
        })
      );
    }
  };
  if (cargandoUnFormulario) {
    return <Cargando />;
  } else {
    if (errorUnFormulario) {
      return (
        <Container
          maxWidth="lg"
          className={`${classes.containerCSS} ${globalClasses.posicionContenedorErrorUnFormulario}`}
        >
          <Paper elevation={3}>
            <ErrorGenerico mensaje={errorUnFormulario} />
          </Paper>
          <Grid container spacing={1} className={classes.gridContainerCSS}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
              <Button
                variant="contained"
                onClick={
                  usuario
                    ? () => (window.location.href = '/')
                    : () => (window.location.href = 'http://oirconsultora.com/')
                }
                color="primary"
                className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
              >
                Salir
              </Button>
            </Grid>
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="lg" className={classes.containerCSS}>
          <Typography variant="h6" color="initial" align="center">
            VOTACIÓN
          </Typography>
          <Paper elevation={3} className={classes.paperCSS}>
            <Grid container spacing={1}>
              {/* {Object.keys(formulario.logo).includes('value') && formulario.logo.value !== '' && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={1} justify="center" id="img_contenedor">
                        <img
                          src={formulario.logo.value}
                          alt={formulario.label}
                          width={formulario.logo.width}
                          height={formulario.logo.height}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )} */}
              <Grid item xs={12}>
                <Box mt={3}>
                  <Typography variant="h5" color="initial" align="center">
                    {formulario.titulo}
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="h6" color="initial" align="center">
                    {formulario.subtitulo}
                  </Typography>
                </Box>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {formulario.componentes.map((item, index) => (
                    <Box mt={3} key={index}>
                      <Componentes
                        formulario={formulario}
                        setFormulario={setFormulario}
                        item={item}
                        index={index}
                        preview={false}
                        edicion={false}
                      />
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Divider />
              </Grid>
              <Grid container spacing={1} className={classes.gridContainerCSS}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="right">
                  {cargandoVotacion ? (
                    <Cargando />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={() => enviarEncuesta()}
                      className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
                    >
                      Votar
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Dialog open={errorVotacion.isMostrar}>
            <DialogTitle id="">Hubo un problema con tu votacion</DialogTitle>
            <DialogContent>
              <DialogContentText>{errorVotacion.mensaje}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => (window.location.href = '/')}
                color="default"
                className={globalClasses.estilosBoton}
                style={{color: 'black'}}
              >
                No
              </Button>
              <Button
                variant="contained"
                onClick={() => dispatch(cerrarModalErrorVotacion_accion())}
                color="primary"
                className={globalClasses.estilosBoton}
              >
                Si
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={exitoVotacion}>
            <DialogTitle id="">Tu encuesta fue enviada con exito</DialogTitle>
            <DialogContent>
              <DialogContentText>Gracias por completar la encuesta!</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Box mr={2} mb={2}>
                <Button
                  variant="contained"
                  onClick={
                    usuario
                      ? () => (window.location.href = '/')
                      : () => (window.location.href = 'http://oirconsultora.com/')
                  }
                  className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
                >
                  Salir
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Container>
      );
    }
  }
};

export default Votacion;
