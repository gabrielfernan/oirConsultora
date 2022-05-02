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

import 'suneditor/dist/css/suneditor.min.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoFile = ({
  item,
  index,
  classes,
  actualizarDatoComponente,
  eliminarComponente,
  edicion,
}) => {
  const globalClasses = useGlobalStyles();
  const [editar, setEditar] = useState(false);

  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const eliminarArchivo = () => {
    actualizarDatoComponente({index: index, prop: 'value', valor: ''});
    actualizarDatoComponente({index: index, prop: 'filename', valor: ''});
  };
  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      actualizarDatoComponente({
        index: index,
        prop: 'filename',
        valor: e.target.files[0].name,
      });
    }
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
                <CardContent id="file_contenedor">
                  <Grid container spacing={1} justifyContent="center">
                    {item.filename === '' ? (
                      <Box width="100%" display="flex" justifyContent="center">
                        <label
                          className={globalClasses.cursorPointer}
                          htmlFor="filecomponente"
                          style={{width: '100%', textAlign: 'center'}}
                        >
                          <CloudUploadIcon color="disabled" style={{fontSize: 96}} />
                          <Typography variant="body2" color="textSecondary" align="center">
                            Click aquí para subir un archivo.
                          </Typography>
                        </label>
                      </Box>
                    ) : (
                      <Fragment>
                        <Typography variant="body2" color="initial">
                          {item.filename}
                          <IconButton
                            aria-label="eliminar componente"
                            onClick={() => eliminarArchivo()}
                          >
                            <DeleteOutlineIcon color="error" />
                          </IconButton>
                        </Typography>
                      </Fragment>
                    )}
                  </Grid>
                  <input
                    id="filecomponente"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, audio/*"
                    type="file"
                    multiple
                    onChange={handleFile}
                    style={{display: 'none'}}
                    disabled={edicion}
                  />
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

export default TipoFile;
