import React, {Fragment, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Switch,
} from '@material-ui/core';

import 'suneditor/dist/css/suneditor.min.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoDateRanger = ({
  item,
  index,
  classes,
  actualizarDatoComponente,
  eliminarComponente,
  edicion,
}) => {
  const globalClasses = useGlobalStyles();
  const [editar, setEditar] = useState(false);
  const [expandido, setExpandido] = useState(false);

  const [opciones, setOpciones] = useState([]);
  const [indiceOpcion /*setIndiceOpcion*/] = useState(null);
  const [openDialogoEliminarOpcion, setOpenDialogoEliminarOpcion] = useState(false);
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const handleExpandidoClick = () => {
    setExpandido(!expandido);
  };
  const eliminarOpcion = () => {
    let tmpOpciones = [...opciones];
    tmpOpciones.splice(indiceOpcion, 1);
    setOpciones(tmpOpciones);
    setOpenDialogoEliminarOpcion(false);
  };
  const actualizarDatoComponenteInterna = datos => {
    const propiedad = datos.prop.split('.');
    //TODO: FALTA CONTROLAR QUE la el valor de la variable fecha ("desde") sea mas chico que ("hasta") ,(sacar por consola propiedad[0] y propiedad[1])

    var datosAEnviar = {};
    Object.assign(datosAEnviar, {...item[propiedad[0]], [propiedad[1]]: datos.valor});
    actualizarDatoComponente({
      index: index,
      prop: [propiedad[0]],
      valor: datosAEnviar,
    });
  };
  return (
    <Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box
          width="100%"
          height="11px"
          className={item.errores ? globalClasses.fondoRojo : globalClasses.fondoVerde}
        ></Box>
        <CardContent>
          <Fragment>
            {edicion ? (
              <Fragment>
                <Box align="right">
                  <DragHandleIcon className={`drag-handle ${classes.draggableIcon}`} />
                </Box>

                <Fragment>
                  {!editar ? (
                    <Box className={globalClasses.cursorPointer}>
                      <Typography
                        component="div"
                        fontWeight="fontWeightBold"
                        onClick={() => setEditar(true)}
                      >
                        <Box fontWeight="fontWeightBold" textAlign="center">
                          {item.pregunta === ''
                            ? 'Click aquí para escribir la pregunta'
                            : item.pregunta}
                        </Box>
                      </Typography>
                    </Box>
                  ) : (
                    <Box className={globalClasses.cursorPointer}>
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
                          })
                        }
                        onBlur={() => setEditar(false)}
                      />
                    </Box>
                  )}
                </Fragment>
              </Fragment>
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
            <Box mt={3}>
              <Grid
                container
                spacing={4}
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={item.required}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={e =>
                      actualizarDatoComponenteInterna({
                        index: index,
                        prop: 'value.desde',
                        valor: e.target.value,
                        esHijo: item.esHijo,
                      })
                    }
                    type="date"
                    disabled={edicion}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name={item.name2}
                    label={item.label2}
                    placeholder={item.placeholder2}
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="date"
                    required={item.required}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={e =>
                      actualizarDatoComponenteInterna({
                        index: index,
                        prop: 'value.hasta',
                        valor: e.target.value,
                        esHijo: item.esHijo,
                      })
                    }
                    disabled={edicion}
                  />
                </Grid>
              </Grid>
            </Box>
            {edicion && (
              <Box align="right">
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.required}
                      onChange={e =>
                        actualizarDatoComponente({
                          index: index,
                          prop: 'required',
                          valor: e.target.checked,
                        })
                      }
                      name="required"
                      color="primary"
                      size="small"
                    />
                  }
                  label="Requerido"
                  className={classes.switch}
                  classes={{label: classes.switchlabel}}
                />
              </Box>
            )}
          </Fragment>
        </CardContent>
        {edicion && (
          <Fragment>
            <CardActions disableSpacing>
              <IconButton
                aria-label="eliminar componente"
                onClick={() => setOpenDialogoEliminarComponente(true)}
              >
                <DeleteOutlineIcon color="primary" />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {[classes.expandOpen]: expandido})}
                onClick={handleExpandidoClick}
                aria-expanded={expandido}
                aria-label="mostrar mas"
              >
                <ExpandMoreIcon color="primary" />
              </IconButton>
            </CardActions>
            <Collapse in={expandido} timeout="auto" unmountOnExit>
              <CardContent className={classes.boxCollapse}>
                <Paper variant="outlined" className={classes.componenteRoot}>
                  <Fragment>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
                        <Box mt={2} ml={{xs: 0, sm: 2, md: 2}}>
                          <TextField
                            label="Descripción del campo"
                            value={item.placeholder}
                            onChange={e =>
                              actualizarDatoComponente({
                                index: index,
                                prop: 'placeholder',
                                valor: e.target.value,
                              })
                            }
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={3}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={7} lg={7} xl={7}>
                          <Box mt={2} ml={{xs: 0, sm: 2, md: 2}}>
                            <TextField
                              label="Descripción del campo"
                              value={item.placeholder2}
                              onChange={e =>
                                actualizarDatoComponente({
                                  index: index,
                                  prop: 'placeholder2',
                                  valor: e.target.value,
                                })
                              }
                              fullWidth
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Fragment>
                </Paper>
              </CardContent>
            </Collapse>
          </Fragment>
        )}
      </Card>

      <Dialog
        open={openDialogoEliminarOpcion}
        onClose={() => setOpenDialogoEliminarOpcion(false)}
        aria-labelledby="dialgo eliminar"
      >
        <DialogTitle id="">Eliminar opción</DialogTitle>
        <DialogContent>
          <DialogContentText>Realmente desea eliminar esta opción?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenDialogoEliminarOpcion(false)}
            color="default"
            className={globalClasses.estilosBoton}
            style={{color: 'black'}}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => eliminarOpcion()}
            color="primary"
            className={globalClasses.estilosBoton}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
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
    </Fragment>
  );
};

export default TipoDateRanger;
