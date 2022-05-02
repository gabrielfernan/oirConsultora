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
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoImg = ({item, index, classes, actualizarDatoComponente, eliminarComponente, edicion}) => {
  const globalClasses = useGlobalStyles();
  const [editar, setEditar] = useState(false);

  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const handleImagen = (e) => {
    if (e.target.files.length > 0) {
      const maxWidth = document.getElementById('img_contenedor').clientWidth;
      let img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      actualizarDatoComponente({index: index, prop: 'value', valor: img.src});
      img.onload = () => {
        if (img.width > maxWidth) {
          let porcentaje = (maxWidth * 100) / img.width;
          let maxHeight = Math.trunc((img.height * porcentaje) / 100);
          actualizarDatoComponente({index: index, prop: 'width', valor: maxWidth});
          actualizarDatoComponente({index: index, prop: 'height', valor: maxHeight});
        } else {
          actualizarDatoComponente({index: index, prop: 'width', valor: img.width});
          actualizarDatoComponente({index: index, prop: 'height', valor: img.height});
        }
      };
    }
  };
  const eliminarImagen = () => {
    actualizarDatoComponente({index: index, prop: 'value', valor: ''});
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
                    <Box>
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
                    <Box>
                      <TextField
                        value={item.pregunta}
                        placeholder="Click aquí para escribir la pregunta"
                        variant="standard"
                        fullWidth
                        size="small"
                        onChange={(e) =>
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
              <Card>
                <CardContent id="img_contenedor">
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                  >
                    {item.value === '' ? (
                      <Box width="100%">
                        <label htmlFor="imagencomponente" className={globalClasses.cursorPointer}>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <PanoramaOutlinedIcon color="disabled" style={{fontSize: 96}} />
                            <Typography variant="body2" color="textSecondary" align="center">
                              Click aquí para insertar una imagen.
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                    ) : (
                      <React.Fragment>
                        <Grid item>
                          <Box display="flex" justifyContent="center">
                            <img
                              src={item.value}
                              alt={item.label}
                              className={classes.contenedorImg}
                            />
                          </Box>
                        </Grid>
                        <Grid item>
                          {item.value && (
                            <Box>
                              <Button
                                size="small"
                                color="default"
                                startIcon={<DeleteOutlineOutlinedIcon />}
                                onClick={() => eliminarImagen()}
                                className={`${classes.immageButtonsCSS} ${classes.botonEliminarImg}`}
                                disabled={edicion}
                              >
                                Eliminar
                              </Button>
                            </Box>
                          )}
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
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
          </CardActions>
        )}
        <Box>
          <input
            id="imagencomponente"
            accept="image/*"
            type="file"
            multiple
            onChange={handleImagen}
            style={{display: 'none'}}
            disabled={edicion}
          />
        </Box>
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

export default TipoImg;
