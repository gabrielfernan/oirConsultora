import React, {Fragment, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  Switch,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Tooltip,
  TableFooter,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ClearIcon from '@material-ui/icons/Clear';
import useStyles from './componenteCSS';

import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoTablaDobleEntrada = ({
  item,
  index,
  actualizarDatoComponente,
  eliminarComponente,
  edicion,
}) => {
  const classes = useStyles();

  const globalClasses = useGlobalStyles();
  const [editar, setEditar] = useState(false);
  const [datosIniciales, setDatosIniciales] = useState(item);
  const [editarCol, setEditarCol] = useState(false);
  const [editarFila, setEditarFila] = useState(false);
  const [editarComponente, setEditarComponente] = useState(false);
  const [error, setError] = useState();
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);
  const insertarElementoArreglo = datos => {
    setError();
    setDatosIniciales({
      ...datosIniciales,
      [datos.prop]: [...datosIniciales[datos.prop], datos.valor],
    });
  };
  const eliminarElementoArreglo = datos => {
    const datosAEnviar = [...datosIniciales[datos.prop]];
    datosAEnviar.splice(datos.indexArray, 1);
    setDatosIniciales({...datosIniciales, [datos.prop]: datosAEnviar});
  };
  const actualizarDatoComponenteInterna = datos => {
    const propiedad = datos.prop.split('.');
    const datosAEnviar = [...datosIniciales[propiedad[0]]];
    datosAEnviar[propiedad[1]] = datos.valor;

    setDatosIniciales({...datosIniciales, [propiedad[0]]: [...datosAEnviar]});
  };
  const votar = datos => {
    const propiedad = datos.prop.split('.');
    var datosAEnviar = {};
    Object.assign(datosAEnviar, {...datosIniciales[propiedad[0]], [propiedad[1]]: datos.valor});
    setDatosIniciales({...datosIniciales, [propiedad[0]]: datosAEnviar});

    actualizarDatoComponente({
      index: index,
      prop: [propiedad[0]],
      valor: datosAEnviar,
    });
  };
  const eventoGuardarDatosDeNuevaComponente = () => {
    var datosAEnviar = {};
    if (datosIniciales.filas && datosIniciales.filas.length > 0) {
      if (datosIniciales.columnas && datosIniciales.columnas.length > 0) {
        datosIniciales.filas.map(valor => {
          return (datosAEnviar = {...datosAEnviar, [valor]: ''});
        });
        actualizarDatoComponente({
          index: index,
          prop: 'value',
          valor: datosAEnviar,
        });
        actualizarDatoComponente({
          index: index,
          prop: 'filas',
          valor: datosIniciales.filas,
        });
        actualizarDatoComponente({
          index: index,
          prop: 'columnas',
          valor: datosIniciales.columnas,
        });
        actualizarDatoComponente({
          index: index,
          prop: 'editando',
          valor: false,
        });

        setEditarComponente(false);
      } else {
        setError('Debe agregar al menos una columna');
      }
    } else {
      if (!datosIniciales.columnas || datosIniciales.columnas.length === 0) {
        setError('Debe agregar al menos una fila y una columna');
      } else {
        setError('Debe agregar al menos una fila');
      }
    }
  };
  const eventoBotonEditarComponente = filaOColumna => {
    setError();
    if (filaOColumna === 'columna') {
      setEditarCol(true);
    }
    if (filaOColumna === 'fila') {
      setEditarFila(true);
    }
    setDatosIniciales({...datosIniciales, editando: true});
    actualizarDatoComponente({
      index: index,
      prop: 'editando',
      valor: true,
    });
    setEditarComponente(true);
  };
  const eventoBotonCancelarEditarComponente = () => {
    setError();
    setDatosIniciales({...item, editando: false});
    actualizarDatoComponente({
      index: index,
      prop: 'editando',
      valor: false,
    });
    setEditarComponente(false);
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
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>

                      {datosIniciales.columnas.map((columna, indexc) => (
                        <TableCell key={indexc} align="center">
                          {editarCol ? (
                            <React.Fragment>
                              <TextField
                                value={columna}
                                placeholder="Editar Texto"
                                onChange={e =>
                                  actualizarDatoComponenteInterna({
                                    index: index,
                                    prop: `columnas.${indexc}`,
                                    valor: e.target.value,
                                    esHijo: item.esHijo,
                                  })
                                }
                                // onChange={e => dispatch(actions.actualizarDatoComponente({index:index, prop:`columnas.${indexc}`, valor:e.target.value, esHijo:item.esHijo}))}
                                onBlur={() => setEditarCol(false)}
                                size="small"
                              />
                            </React.Fragment>
                          ) : (
                            <Typography
                              variant="body2"
                              color="initial"
                              onClick={
                                edicion && editarComponente
                                  ? () => eventoBotonEditarComponente('columna')
                                  : null
                              }
                            >
                              {columna ? columna : 'Editar Texto'}
                            </Typography>
                          )}
                        </TableCell>
                      ))}

                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datosIniciales.filas.map((fila, indexf) => (
                      <TableRow key={indexf}>
                        <TableCell>
                          {editarFila ? (
                            <TextField
                              value={fila}
                              placeholder="Editar Texto"
                              onChange={e =>
                                actualizarDatoComponenteInterna({
                                  index: index,
                                  prop: `filas.${indexf}`,
                                  valor: e.target.value,
                                  esHijo: item.esHijo,
                                })
                              }
                              // onChange={e => dispatch(actions.actualizarDatoComponente({index:index, prop:`filas.${indexf}`, valor:e.target.value, esHijo:item.esHijo}))}
                              onBlur={() => setEditarFila(false)}
                              size="small"
                            />
                          ) : (
                            <Typography
                              variant="body2"
                              color="initial"
                              onClick={
                                edicion && editarComponente
                                  ? () => eventoBotonEditarComponente('fila')
                                  : null
                              }
                            >
                              {fila ? fila : 'Editar Texto'}
                            </Typography>
                          )}
                        </TableCell>
                        {datosIniciales.columnas.map((columna, indexc) => (
                          <TableCell key={indexc} align="center">
                            <Radio
                              id={`${fila}_${columna}`}
                              checked={datosIniciales.value[fila] === columna}
                              placeholder="Editar Texto"
                              value={columna}
                              name={fila}
                              onChange={e =>
                                votar({
                                  index: index,
                                  prop: `value.${fila}`,
                                  valor: columna,
                                  esHijo: item.esHijo,
                                })
                              }
                              disabled={edicion}
                              // onChange={e => dispatch(actions.actualizarDatoComponente({index:index, prop:`value.${fila}`, valor:columna, esHijo:item.esHijo}))}
                            />
                          </TableCell>
                        ))}
                        {edicion && editarComponente ? (
                          <TableCell>
                            <Tooltip title="Eliminar fila" arrow>
                              <ClearIcon
                                className={globalClasses.cursorPointer}
                                color="error"
                                onClick={() =>
                                  eliminarElementoArreglo({
                                    index: index,
                                    prop: 'filas',
                                    indexArray: indexf,
                                    esHijo: item.esHijo,
                                  })
                                }
                                //onClick={() => dispatch(actions.eliminarElementoArreglo({index:index, prop:'filas', indexArray:indexf, esHijo:item.esHijo}))}
                              />
                            </Tooltip>
                          </TableCell>
                        ) : null}
                        {indexf === 0 && edicion && editarComponente ? (
                          <TableCell rowSpan={datosIniciales.filas.length}>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              className={classes.textRotate}
                              onClick={e =>
                                insertarElementoArreglo({
                                  index: index,
                                  prop: 'columnas',
                                  valor: 'Editar texto',
                                  esHijo: item.esHijo,
                                })
                              }
                              //onClick={() => dispatch(actions.insertarElementoArreglo({index:index, prop:'columnas', valor:'Editar texto', esHijo:item.esHijo}))}
                              style={{cursor: 'pointer'}}
                            >
                              + agregar una columna
                            </Typography>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      {edicion && editarComponente ? (
                        <TableCell>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            onClick={e =>
                              insertarElementoArreglo({
                                index: index,
                                prop: 'filas',
                                valor: 'Editar texto',
                                esHijo: item.esHijo,
                              })
                            }
                            // onClick={() =>
                            //   dispatch(
                            //     actions.insertarElementoArreglo({
                            //       index: index,
                            //       prop: 'filas',
                            //       valor: 'Editar texto',
                            //       esHijo: item.esHijo,
                            //     })
                            //   )
                            // }
                            style={{cursor: 'pointer'}}
                          >
                            + agregar una fila
                          </Typography>
                        </TableCell>
                      ) : null}

                      {datosIniciales.columnas.map((columna, indexc) =>
                        edicion && editarComponente ? (
                          <TableCell key={indexc} align="center">
                            <Tooltip title="Eliminar columna" arrow>
                              <ClearIcon
                                className={globalClasses.cursorPointer}
                                color="error"
                                onClick={() =>
                                  eliminarElementoArreglo({
                                    index: index,
                                    prop: 'columnas',
                                    indexArray: indexc,
                                    esHijo: item.esHijo,
                                  })
                                }

                                // onClick={() =>
                                //   dispatch(
                                //     actions.eliminarElementoArreglo({
                                //       index: index,
                                //       prop: 'columnas',
                                //       indexArray: indexc,
                                //       esHijo: item.esHijo,
                                //     })
                                //   )
                                // }
                              />
                            </Tooltip>
                          </TableCell>
                        ) : null
                      )}
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
            {edicion ? (
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
                          esHijo: item.esHijo,
                        })
                      }
                      //onChange={(e) => dispatch(actions.actualizarDatoComponente({index:index, prop:'required', valor:e.target.checked, esHijo:item.esHijo}))}
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
            ) : null}
          </Fragment>
        </CardContent>
        {edicion && (
          <CardActions disableSpacing>
            <IconButton
              aria-label="eliminar componente"
              onClick={() => setOpenDialogoEliminarComponente(true)}
            >
              <DeleteOutlineIcon color="primary" />
            </IconButton>
            {editarComponente ? (
              <Fragment>
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
              </Fragment>
            ) : (
              <IconButton
                aria-label="editar componente"
                onClick={() => eventoBotonEditarComponente()}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
            {error && <span style={{color: 'red'}}>{error}</span>}
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
    </Fragment>
  );
};

export default TipoTablaDobleEntrada;

//export default TipoTablaDobleEntrada;
