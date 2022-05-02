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
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core';

import 'suneditor/dist/css/suneditor.min.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import {Container as ContainerDraggable, Draggable} from 'react-smooth-dnd';
import {v4} from 'uuid';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoRadio = ({
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
  const [errorEtiqueta, setErrorEtiqueta] = useState();

  const [etiqueta, setEtiqueta] = useState('');
  const [indiceOpcion, setIndiceOpcion] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [openDialogoEliminarOpcion, setOpenDialogoEliminarOpcion] = useState(false);
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const handleExpandidoClick = () => {
    setExpandido(!expandido);
  };

  const handleEtiqueta = e => {
    setErrorEtiqueta(null);
    setEtiqueta(e.target.value);
  };

  const agregarOpcion = () => {
    if (etiqueta) {
      let tmpOpciones = [...item.options, {etiqueta: etiqueta}];
      actualizarDatoComponente({
        index: index,
        prop: 'options',
        valor: tmpOpciones,
      });
      setEtiqueta('');
    } else {
      setErrorEtiqueta('No puede ingrear una opcion vacia');
    }
  };
  const onDrop = ({removedIndex, addedIndex}) => {
    let tmpOpciones = [...item.options];
    const componentAux = tmpOpciones[removedIndex];
    tmpOpciones[removedIndex] = tmpOpciones[addedIndex];
    tmpOpciones[addedIndex] = componentAux;
    actualizarDatoComponente({
      index: index,
      prop: 'options',
      valor: tmpOpciones,
    });
    // setOpciones(tmpOpciones);
  };

  const editarOpcion = i => {
    setModoEdicion(true);
    setEtiqueta(item.options[i]['etiqueta']);
    setIndiceOpcion(i);
    setModoEdicion(true);
  };

  const guardarOpcion = () => {
    setModoEdicion(false);
    let tmpOpciones = [...item.options];
    tmpOpciones[indiceOpcion] = {etiqueta: etiqueta};
    actualizarDatoComponente({
      index: index,
      prop: 'options',
      valor: tmpOpciones,
    });
    setEtiqueta('');
  };

  const eliminarOpcion = () => {
    let tmpOpciones = [...item.options];
    tmpOpciones.splice(indiceOpcion, 1);
    actualizarDatoComponente({
      index: index,
      prop: 'options',
      valor: tmpOpciones,
    });
    setOpenDialogoEliminarOpcion(false);
  };
  return (
    <Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box
          width="100%"
          height="11px"
          className={
            item.errores || item.mensajeErrorComponente
              ? globalClasses.fondoRojo
              : globalClasses.fondoVerde
          }
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
                    <Box textAlign="center">
                      {item.mensajeErrorComponente && (
                        <Typography
                          variant="subtitle2"
                          component="span"
                          fontWeight="fontWeightBold"
                          color="error"
                        >
                          {item.mensajeErrorComponente}
                        </Typography>
                      )}
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
                    <Box>
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
              <Paper variant="outlined" className={classes.componenteRoot}>
                <FormControl
                  component="fieldset"
                  // error={item.errores.length > 0 && item.value === ''}
                >
                  <FormLabel component="legend">{item.placeholder}</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name={item.name}
                    value={item.value}
                    onChange={e =>
                      actualizarDatoComponente({
                        index: index,
                        prop: 'value',
                        valor: e.target.value,
                        esHijo: item.esHijo,
                      })
                    }
                  >
                    {item.options.map((opcion, i) => (
                      <FormControlLabel
                        value={opcion.etiqueta}
                        control={<Radio />}
                        label={opcion.etiqueta}
                        key={i}
                        disabled={edicion}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText>
                    {/* {item.errores.length > 0 && item.value === ''
                      ? item.errores.length === 0 || item.value !== ''
                        ? ''
                        : item.errores.join(' ')
                      : item.placeholder} */}
                  </FormHelperText>
                </FormControl>
              </Paper>
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
                      <Grid item xs={12}>
                        <Box mt={2} className={globalClasses.noMarginLeft}>
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

                    <Box mt={3} style={{marginLeft: '3px', marginRight: '3px'}}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            className={classes.boxBordered}
                          >
                            <Grid item xs={12}>
                              <Box display="flex" alignItems="center" p={1}>
                                <Typography variant="subtitle2" color="initial">
                                  {modoEdicion ? 'Editar opción' : 'Nueva opción'}
                                </Typography>
                                {!modoEdicion ? (
                                  <IconButton
                                    onClick={() => agregarOpcion()}
                                    style={{padding: 0, marginLeft: '10px'}}
                                  >
                                    <AddCircleOutlineIcon color="primary" />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    onClick={() => guardarOpcion()}
                                    style={{padding: 0, marginLeft: '10px'}}
                                  >
                                    <CheckCircleOutlineIcon color="primary" />
                                  </IconButton>
                                )}
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <TextField
                                  value={etiqueta}
                                  onChange={handleEtiqueta}
                                  label={modoEdicion ? 'Editar etiqueta' : 'Nueva etiqueta'}
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                />
                              </Box>
                              {errorEtiqueta && (
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="inherit" color="error">
                                    {errorEtiqueta}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <Box ml={{lg: 1}}>
                            <Paper>
                              <Box
                                p={2}
                                className={`${globalClasses.borderRadiusSuperiores} ${globalClasses.fondoVerde} ${globalClasses.colorBlanco}`}
                              >
                                <Typography variant="subtitle2" color="initial">
                                  Lista de Opciones
                                </Typography>
                              </Box>
                              <Divider />
                              <TableContainer>
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className={classes.tableCellCSS}>
                                        Etiqueta
                                      </TableCell>
                                      <TableCell align="right" className={classes.tableCell}>
                                        Acciones
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              {item.options.length > 0 && (
                                <ContainerDraggable
                                  onDrop={onDrop}
                                  dragHandleSelector=".drag-handle"
                                  lockAxis="y"
                                >
                                  {item.options.map((opcion, i) => (
                                    <Draggable key={v4()}>
                                      <TableContainer>
                                        <Table>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell className={classes.tableCellCSS}>
                                                <Box mx={{xs: 1}}>{opcion.etiqueta}</Box>
                                              </TableCell>
                                              <TableCell
                                                align="right"
                                                className={classes.tableCell}
                                              >
                                                <Box
                                                  display="flex"
                                                  alignItems="center"
                                                  justifyContent="flex-end"
                                                >
                                                  <IconButton onClick={() => editarOpcion(i)}>
                                                    <EditIcon color="primary" />
                                                  </IconButton>
                                                  <IconButton
                                                    onClick={() => {
                                                      setOpenDialogoEliminarOpcion(true);
                                                      setIndiceOpcion(i);
                                                    }}
                                                  >
                                                    <HighlightOffIcon color="secondary" />
                                                  </IconButton>
                                                  <DragHandleIcon
                                                    className={`drag-handle ${classes.draggableIconOptions}`}
                                                  />
                                                </Box>
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Draggable>
                                  ))}
                                </ContainerDraggable>
                              )}
                            </Paper>
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

export default TipoRadio;
