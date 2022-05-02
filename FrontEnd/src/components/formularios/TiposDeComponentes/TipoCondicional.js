import React, {useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

import useStyles from './componenteCSS';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import useGlobalStyles from '../../../app/estilos/cssglobal';
import {insertarComponente} from '../insertarComponente';
import ComponenteHija from '../ComponenteHija';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const TipoCondicional = ({
  item,
  index,
  actualizarDatoComponente,
  actualizarComponenteCompleta,
  edicion,
  eliminarComponente,
}) => {
  const [editar, setEditar] = useState(false);

  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const [panelEdicion, setPanelEdicion] = useState(false);
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);
  const [componentePadre, setComponentePadre] = useState(item);

  const [tipoComponente, setTipoComponente] = useState('');

  const eventoGuardarDatosDeNuevaComponente = () => {
    var datosAEnviar = {};
    Object.assign(datosAEnviar, componentePadre);
    actualizarComponenteCompleta({
      index: index,
      valor: datosAEnviar,
    });

    setPanelEdicion(false);
  };
  const eventoBotonEditarComponente = filaOColumna => {
    setPanelEdicion(true);
  };
  const eventoBotonCancelarEditarComponente = () => {
    setTipoComponente('');

    setComponentePadre(item);
    setPanelEdicion(false);
  };
  const handleChangeTipoComponente = e => {
    const componente = insertarComponente(null, e.target.value);
    setTipoComponente(e.target.value);
    setComponentePadre({...componentePadre, componente: {...componente}});
  };
  const obtenerDatosVotacion = datos => {
    const datosAEnviar = {...item.componente, value: datos.valor};
    actualizarDatoComponente({
      index: index,
      prop: 'componente',
      valor: {...datosAEnviar},
    });
  };
  return (
    <React.Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box
          width="100%"
          height="11px"
          className={item.errores ? globalClasses.fondoRojo : globalClasses.fondoVerde}
        ></Box>
        <CardContent>
          <React.Fragment>
            {edicion ? (
              <React.Fragment>
                <Box align="right">
                  <DragHandleIcon className={`drag-handle ${classes.draggableIcon}`} />
                </Box>

                {!editar ? (
                  <Box textAlign="center">
                    <Typography
                      component="div"
                      fontWeight="fontWeightBold"
                      onClick={() => setEditar(true)}
                    >
                      <Box fontWeight="fontWeightBold">
                        {item.pregunta === ''
                          ? 'Click aquí para escribir la pregunta'
                          : item.pregunta}
                      </Box>
                    </Typography>
                  </Box>
                ) : (
                  <Box textAlign="center">
                    <TextField
                      value={item.pregunta}
                      placeholder="Click aquí para escribir la pregunta"
                      variant="standard"
                      fullWidth
                      size="small"
                      onChange={e =>
                        actualizarDatoComponente({
                          index: index,
                          prop: 'pregunta',
                          valor: e.target.value,
                          esHijo: item.esHijo,
                        })
                      }
                      // onChange={(e) => dispatch(actions.actualizarDatoComponente({index:index, prop:'pregunta', valor:e.target.value, esHijo:item.esHijo}))}
                      onBlur={() => setEditar(false)}
                    />
                  </Box>
                )}
              </React.Fragment>
            ) : (
              <Box textAlign="center">
                <Typography component="div" fontWeight="fontWeightBold">
                  <Box fontWeight="fontWeightBold">
                    {item.pregunta}
                    {item.required && (
                      <Typography
                        variant="h6"
                        component="span"
                        fontWeight="fontWeightBold"
                        color="error"
                      >
                        <span color="error"> *</span>
                      </Typography>
                    )}
                  </Box>
                </Typography>
              </Box>
            )}
          </React.Fragment>

          <Box mt={3} align="center">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} align="left">
                <FormControl
                  component="fieldset"
                  // error={item.errores.length > 0 && item.value === ''}
                >
                  <RadioGroup
                    aria-label="opcion"
                    name="opcion"
                    value={item.value}
                    onChange={e =>
                      actualizarDatoComponente({
                        index: index,
                        prop: 'value',
                        valor: e.target.value,
                      })
                    }
                  >
                    {panelEdicion ? (
                      <div style={{display: 'flex'}}>
                        <Radio disabled={true}></Radio>
                        <TextField
                          value={componentePadre.label_1}
                          placeholder={'Texto afirmativo'}
                          onChange={e =>
                            setComponentePadre({
                              ...componentePadre,
                              label_1: e.target.value,
                            })
                          }
                          // onChange={e => dispatch(actions.actualizarDatoComponente({index:index, prop:`columnas.${indexc}`, valor:e.target.value, esHijo:item.esHijo}))}
                          //onBlur={() => setEditarLabel({isLabel2: false, isLabel1: false})}
                          size="small"
                        />
                      </div>
                    ) : (
                      <FormControlLabel
                        value="si"
                        control={<Radio />}
                        label={componentePadre.label_1}
                        disabled={edicion}
                        //onClick={() => setEditarLabel({isLabel2: false, isLabel1: true})}
                      />
                    )}
                    {panelEdicion ? (
                      <div style={{display: 'flex'}}>
                        <Radio disabled={true}></Radio>
                        <TextField
                          placeholder={'Texto negativo'}
                          value={componentePadre.label_2}
                          onChange={e =>
                            setComponentePadre({
                              ...componentePadre,
                              label_2: e.target.value,
                            })
                          }
                          // onChange={e => dispatch(actions.actualizarDatoComponente({index:index, prop:`columnas.${indexc}`, valor:e.target.value, esHijo:item.esHijo}))}
                          //onBlur={() => setEditarLabel({isLabel1: false, isLabel2: false})}
                          size="small"
                        />
                      </div>
                    ) : (
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label={componentePadre.label_2}
                        disabled={edicion}
                        //onClick={() => setEditarLabel({isLabel1: false, isLabel2: true})}
                      />
                    )}
                  </RadioGroup>
                  <FormHelperText>
                    {/* {item.errores.length > 0 && item.value === ''
                      ? item.errores.length === 0 || item.value !== ''
                        ? ''
                        : item.errores.join(' ')
                      : item.placeholder} */}
                  </FormHelperText>
                </FormControl>
                {edicion && (
                  <Typography variant="caption" component="p" color="initial">
                    Nota: Una de las opciones debe ser afirmativa
                  </Typography>
                )}
              </Grid>
              {edicion && (
                <Grid item xs={12} sm={6} align="left">
                  <Typography variant="body2" componente="p" color="initial">
                    Elija un tipo de componente para la opción Afirmativa
                  </Typography>
                  <br></br>
                  <FormControl
                    variant={panelEdicion ? 'outlined' : 'filled'}
                    fullWidth
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Tipo de Componente
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      value={tipoComponente}
                      onChange={handleChangeTipoComponente}
                      label="Tipo de Componente"
                      disabled={!panelEdicion}
                    >
                      <MenuItem value="">
                        <em>Tipo de Componente</em>
                      </MenuItem>
                      <MenuItem value="text">Texto corto</MenuItem>
                      <MenuItem value="textarea">Texto largo</MenuItem>
                      {/* <MenuItem value="parrafo">Párrafo</MenuItem> */}
                      <MenuItem value="select">Desplegable</MenuItem>
                      <MenuItem value="radio">Opción única</MenuItem>
                      <MenuItem value="checkbox">Opción múltiple</MenuItem>
                      {/* <MenuItem value="number">Número</MenuItem> */}
                      {/* <MenuItem value="img">Imagen</MenuItem> */}
                      {/* <MenuItem value="time">Hora</MenuItem> */}
                      {/* <MenuItem value="date">Fecha</MenuItem> */}
                      {/* <MenuItem value="daterange">Rango de fechas</MenuItem> */}
                      {/* <MenuItem value="recaptcha">Captcha</MenuItem> */}
                      {/* <MenuItem value="file">Archivo</MenuItem> */}
                      <MenuItem value="rating">Selector de puntaje</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
          {edicion ? (
            <React.Fragment>
              {componentePadre.componente && (
                <Box mt={3}>
                  <ComponenteHija
                    componentePadre={componentePadre}
                    setComponentePadre={setComponentePadre}
                    item={componentePadre.componente}
                    edicion={panelEdicion}
                    isVotando={false}
                    setTipoComponente={setTipoComponente}
                  />
                </Box>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box mt={3}>
                {item.value === 'si' ? (
                  <ComponenteHija
                    componentePadre={componentePadre}
                    setComponentePadre={setComponentePadre}
                    item={componentePadre.componente}
                    edicion={false}
                    isVotando={true}
                    setTipoComponente={setTipoComponente}
                    cargarVotacion={obtenerDatosVotacion}
                  />
                ) : null}
              </Box>
            </React.Fragment>
          )}
        </CardContent>
        {edicion && (
          <CardActions disableSpacing>
            {!panelEdicion && (
              <IconButton
                aria-label="eliminar componente"
                onClick={() => setOpenDialogoEliminarComponente(true)}
              >
                <DeleteOutlineIcon color="primary" />
              </IconButton>
            )}
            {panelEdicion ? (
              <React.Fragment>
                <IconButton
                  aria-label="cancelar"
                  onClick={() => eventoBotonCancelarEditarComponente()}
                >
                  <CancelIcon color="primary" />
                </IconButton>
                <IconButton
                  aria-label="guardar"
                  onClick={() => eventoGuardarDatosDeNuevaComponente()}
                >
                  <SaveIcon color="primary" />
                </IconButton>
              </React.Fragment>
            ) : (
              <IconButton
                aria-label="editar componente"
                onClick={() => eventoBotonEditarComponente()}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
            {/* {error && <span style={{color: 'red'}}>{error}</span>} */}
          </CardActions>
        )}
      </Card>
      <Dialog
        open={openDialogoEliminarComponente}
        onClose={() => setOpenDialogoEliminarComponente(false)}
        aria-labelledby="dialgo eliminar"
      >
        <DialogTitle id="">Eliminar componente</DialogTitle>
        <DialogContent>
          <DialogContentText>Realmente desea eliminar este componente?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenDialogoEliminarComponente(false)}
            color="default"
            className={globalClasses.estilosBoton}
            style={{color: 'black'}}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => eliminarComponente()}
            color="primary"
            className={globalClasses.estilosBoton}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TipoCondicional;
