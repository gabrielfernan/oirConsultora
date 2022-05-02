import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Controller} from 'react-hook-form';

import useStyles from './ConfigurarFormularioCSS';
import useGlobalStyles from '../../app/estilos/cssglobal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  Box,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CardActions,
  Collapse,
  IconButton,
  Paper,
  Button,
} from '@material-ui/core';
import TipoUserData from './TiposDeComponentes/TipoUserData';
import clsx from 'clsx';
import Compartir from './Compartir';
import {useDispatch, useSelector} from 'react-redux';
import {
  configurarFormulario,
  volverPorDefectoConfigurarFormulario_Accion,
  volverPorDefectoUnFormulario_Accion,
} from '../../Redux/Formularios/AccionesFormularios';
import {useHistory} from 'react-router';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';

const ConfigurarFormulario = ({unFormulario}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {control} = useForm();
  const [formulario, setFormulario] = useState({
    ...unFormulario,
    lugarDatosEncuestado:
      unFormulario.lugarDatosEncuestado && unFormulario.lugarDatosEncuestado.trim() !== ''
        ? unFormulario.lugarDatosEncuestado
        : 'Inicio',
  });
  const [expandido, setExpandido] = useState(false);
  const {cargandoActualizarConfiguracionFormulario, errorConfiguracionFormulario} = useSelector(
    state => state.ReducerFormularios
  );
  const handleExpandidoClick = () => {
    setExpandido(!expandido);
  };
  const actualizarDatoUnFormulario = datos => {
    if (datos.name === 'condicion') {
      switch (datos.value) {
        case 'fecha':
          setFormulario({
            ...formulario,
            [datos.name]: datos.value,
            valorCondicion: new Date().toISOString().slice(0, 10),
          });
          break;
        case 'cupo':
          setFormulario({...formulario, [datos.name]: datos.value, valorCondicion: 10});
          break;
        default:
          setFormulario({...formulario, [datos.name]: datos.value, valorCondicion: ''});
          break;
      }
    } else {
      setFormulario({...formulario, [datos.name]: datos.value});
    }
  };

  const guardarCambios = () => {
    var datos = {};
    const componentes = [...unFormulario.componentes];
    if (unFormulario.lugarDatosEncuestado && unFormulario.lugarDatosEncuestado.trim() !== '') {
      if (unFormulario.lugarDatosEncuestado.trim() === 'Inicio') {
        componentes.shift();
      } else {
        componentes.pop();
      }
    }
    if (formulario.lugarDatosEncuestado === 'Final') {
      datos = {
        ...formulario,
        condicion: formulario.condicion,
        valorCondicion: formulario.valorCondicion,
        componentes: [
          ...componentes,
          {
            label: 'Datos del encuestado',
            pregunta: 'Datos del encuestado',
            required: true,
            type: 'userdata',
            value: {
              apellido: '',
              departamento: 0,
              dni: '',
              edad: 0,
              email: '',
              nombre: '',
              sexo: '',
              telefono: '',
            },
            errores: {},
          },
        ],
      };
    } else {
      datos = {
        ...formulario,
        condicion: formulario.condicion,
        valorCondicion: formulario.valorCondicion,
        componentes: [
          {
            label: 'Datos del encuestado',
            pregunta: 'Datos del encuestado',
            required: true,
            type: 'userdata',
            value: {
              apellido: '',
              departamento: 0,
              dni: '',
              edad: 0,
              email: '',
              nombre: '',
              sexo: '',
              telefono: '',
            },
            errores: {},
          },
          ...componentes,
        ],
      };
    }
    dispatch(configurarFormulario(datos));
  };
  const eventoBotonSalir = () => {
    dispatch(volverPorDefectoUnFormulario_Accion());
    history.push('/');
  };
  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.containerCSS}>
        <div
          style={{
            pointerEvents:
              cargandoActualizarConfiguracionFormulario || errorConfiguracionFormulario.isMostrar
                ? 'none'
                : null,
          }}
        >
          <Typography noWrap variant="h5" align="center" className={classes.titleCSS}>
            CONFIGURACION
          </Typography>
          <Box mt={3}>
            <Typography variant="h5" color="primary" align="center">
              {formulario.titulo}
            </Typography>
          </Box>
          <Box mt={3}>
            <Card elevation={3}>
              <CardContent>
                <Box mb={3} className={globalClasses.fondoVerde}>
                  <Typography variant="h6" className={globalClasses.colorBlanco} align="center">
                    Condición de vigencia
                  </Typography>
                </Box>
                <Box mx={2}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl
                        disabled={unFormulario.estado === 'habilitado'}
                        component="fieldset"
                      >
                        <RadioGroup
                          aria-label="condicion"
                          name="condicion"
                          value={formulario.condicion}
                          onChange={e =>
                            actualizarDatoUnFormulario({
                              name: 'condicion',
                              value: e.target.value,
                            })
                          }
                        >
                          <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                          <FormControlLabel value="fecha" control={<Radio />} label="Por fecha" />
                          <FormControlLabel value="cupo" control={<Radio />} label="Por cupo" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {formulario.condicion === 'fecha' && (
                        <Box>
                          <Controller
                            name="valorCondicion"
                            control={control}
                            defaultValue={formulario.valorCondicion}
                            // TODO:CHEQUEAR VALIDACIONES
                            rules={{required: 'Valor requerido fecha'}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                              <TextField
                                label="Fecha de vigencia"
                                variant="outlined"
                                size="small"
                                type="date"
                                value={formulario.valorCondicion}
                                onChange={value => {
                                  onChange(value);
                                  setFormulario({
                                    ...formulario,
                                    valorCondicion: value.target.value,
                                  });
                                }}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                autoFocus
                              />
                            )}
                          />
                        </Box>
                      )}
                      {formulario.condicion === 'cupo' && (
                        <Box>
                          <Controller
                            name="valorCondicion"
                            control={control}
                            defaultValue={formulario.valorCondicion}
                            // TODO:CHEQUEAR VALIDACIONES
                            rules={{required: 'Valor requerido cupo'}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                              <TextField
                                label="Cantidad límite de votaciones"
                                variant="outlined"
                                size="small"
                                type="number"
                                value={formulario.valorCondicion}
                                onChange={value => {
                                  onChange(value);
                                  setFormulario({
                                    ...formulario,
                                    valorCondicion:
                                      parseInt(value.target.value) > 0
                                        ? parseInt(value.target.value)
                                        : 1,
                                  });
                                }}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                autoFocus
                              />
                            )}
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box mt={3}>
            {unFormulario.estado === 'deshabilitado' && (
              <React.Fragment>
                <Card elevation={3}>
                  <CardContent>
                    <Box mb={3} className={globalClasses.fondoVerde}>
                      <Typography variant="h6" className={globalClasses.colorBlanco} align="center">
                        Ubicacion datos del encuestado
                      </Typography>
                    </Box>

                    <Box mx={2}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="condicion"
                              name="condicion"
                              value={formulario.lugarDatosEncuestado}
                              onChange={e =>
                                actualizarDatoUnFormulario({
                                  name: 'lugarDatosEncuestado',
                                  value: e.target.value,
                                })
                              }
                            >
                              <FormControlLabel
                                value="Inicio"
                                control={<Radio />}
                                label="Al inicio de la encuesta"
                              />
                              <FormControlLabel
                                value="Final"
                                control={<Radio />}
                                label="Al final de la encuesta"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <Grid container spacing={1} className={classes.gridContainerCSS}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="right">
                      <CardActions disableSpacing>
                        <IconButton
                          className={clsx(classes.expand, {[classes.expandOpen]: expandido})}
                          onClick={handleExpandidoClick}
                          aria-expanded={expandido}
                          aria-label="mostrar mas"
                        >
                          <ExpandMoreIcon color="primary" />
                        </IconButton>
                      </CardActions>
                    </Grid>
                  </Grid>
                  <Collapse in={expandido} timeout="auto" unmountOnExit>
                    <CardContent className={classes.boxCollapse}>
                      <Paper variant="outlined" className={classes.componenteRoot}>
                        <TipoUserData
                          item={{
                            pregunta: 'Datos del encuestado',
                            type: 'userdata',
                            name: 'nombre_componente',
                            label: 'Datos del encuestado',
                            required: true,
                            placeholder: 'Texto descriptivo',
                            value: {},
                            errores: [],
                          }}
                          classes={classes}
                          edicion={true}
                        />
                      </Paper>
                    </CardContent>
                  </Collapse>
                </Card>
              </React.Fragment>
            )}
          </Box>
          <Box mt={3}>
            <Card elevation={3}>
              <CardContent>
                <Box mb={3} className={globalClasses.fondoVerde}>
                  <Typography variant="h6" className={globalClasses.colorBlanco} align="center">
                    Estado de la encuesta
                  </Typography>
                </Box>
                <Box mx={2}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="estado"
                          name="estado"
                          value={formulario.estado}
                          onChange={e =>
                            actualizarDatoUnFormulario({
                              name: 'estado',
                              value: e.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="habilitado"
                            control={<Radio />}
                            label="Habilitar"
                          />
                          <FormControlLabel
                            value="deshabilitado"
                            control={<Radio />}
                            label="Deshabilitar"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
          {unFormulario.estado === 'habilitado' && <Compartir formulario={unFormulario} />}
        </div>
        <Box mt={3}>
          {cargandoActualizarConfiguracionFormulario ? (
            <Cargando />
          ) : (
            <Grid
              container
              spacing={5}
              className={`${classes.gridContainerCSS} ${globalClasses.maginTop20}`}
            >
              {errorConfiguracionFormulario.isMostrar ? (
                <React.Fragment>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
                    <ErrorGenerico mensaje={errorConfiguracionFormulario.mensaje} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={() => dispatch(volverPorDefectoConfigurarFormulario_Accion())}
                      className={`${globalClasses.degradeVerde} ${globalClasses.estilosBoton}`}
                    >
                      Ok
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box pl={{xs: 3, sm: 0}}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => eventoBotonSalir()}
                        className={`${globalClasses.degradeVerde} ${globalClasses.estilosBoton}`}
                      >
                        Salir
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align="end">
                    <Box pr={{xs: 3, sm: 0}}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => guardarCambios()}
                        className={`${globalClasses.degradeVerde} ${globalClasses.estilosBoton}`}
                      >
                        Guardar
                      </Button>
                    </Box>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ConfigurarFormulario;
