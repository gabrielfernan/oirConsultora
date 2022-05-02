import React, {Fragment, useEffect, useState} from 'react';
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
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';

import 'suneditor/dist/css/suneditor.min.css';
import {loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha} from 'react-simple-captcha';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoRecaptcha = ({
  item,
  index,
  classes,
  actualizarDatoComponente,
  eliminarComponente,
  edicion,
}) => {
  const globalClasses = useGlobalStyles();
  const [editar, setEditar] = useState(false);
  const [opciones, setOpciones] = useState([]);
  const [indiceOpcion /*setIndiceOpcion*/] = useState(null);
  const [openDialogoEliminarOpcion, setOpenDialogoEliminarOpcion] = useState(false);
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const comprobar = () => {
    let user_captcha = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha) === true) {
      alert('Captcha coincide');
      loadCaptchaEnginge(6);
      document.getElementById('user_captcha_input').value = '';
    } else {
      alert('Captcha no coincide');
      document.getElementById('user_captcha_input').value = '';
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6, '#f50057', 'white');
  });
  const eliminarOpcion = () => {
    let tmpOpciones = [...opciones];
    tmpOpciones.splice(indiceOpcion, 1);
    setOpciones(tmpOpciones);
    setOpenDialogoEliminarOpcion(false);
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
            <Box mt={3} align="center">
              <LoadCanvasTemplate reloadText="Recargar Captcha" />
              <br />
              <TextField
                id="user_captcha_input"
                name="user_captcha_input"
                placeholder="Escribe el valor del captcha"
                variant="outlined"
                size="small"
                required
              />
              <br />
              <br />
              <Button
                variant="contained"
                onClick={() => comprobar()}
                color="primary"
                className={globalClasses.estilosBoton}
              >
                Comprobar
              </Button>
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

export default TipoRecaptcha;
