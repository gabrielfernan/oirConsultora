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
  Divider,
  IconButton,
} from '@material-ui/core';
import 'suneditor/dist/css/suneditor.min.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoDivider = ({item, classes, eliminarComponente, edicion}) => {
  const globalClasses = useGlobalStyles();
  const [opciones, setOpciones] = useState([]);
  const [indiceOpcion /*setIndiceOpcion*/] = useState(null);
  const [openDialogoEliminarOpcion, setOpenDialogoEliminarOpcion] = useState(false);
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const eliminarOpcion = () => {
    let tmpOpciones = [...opciones];
    tmpOpciones.splice(indiceOpcion, 1);
    setOpciones(tmpOpciones);
    setOpenDialogoEliminarOpcion(false);
  };
  return (
    <Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box width="100%" height="11px" className={globalClasses.fondoVerde}></Box>
        <CardContent>
          <Fragment>
            {edicion && (
              <Box align="right">
                <DragHandleIcon className={`drag-handle ${classes.draggableIcon}`} />
              </Box>
            )}
            <Box>
              <Divider style={{height: '2px', backgroundColor: '#707070'}} />
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

export default TipoDivider;
