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

import {Rating} from '@material-ui/lab';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoRating = ({
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

  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);

  const [, /*hover*/ setHover] = useState(-1);
  const [escala, setEscala] = useState(item.scale ? Object.keys(item.scale).length - 1 : 0);

  const handleExpandidoClick = () => {
    setExpandido(!expandido);
  };
  const handleEscala = e => {
    if (e.target.value < 3) {
      setEscala(3);
      let tempEscala = {};
      for (let index = 0; index <= 3; index++) {
        tempEscala[index] = index;
      }
      actualizarDatoComponente({index: index, prop: 'scale', valor: tempEscala});
    } else {
      if (e.target.value > 10) {
        setEscala(10);
        let tempEscala = {};
        for (let index = 0; index <= 10; index++) {
          tempEscala[index] = index;
        }
        actualizarDatoComponente({index: index, prop: 'scale', valor: tempEscala});
      } else {
        setEscala(e.target.value);
        let tempEscala = {};
        for (let index = 0; index <= e.target.value; index++) {
          tempEscala[index] = index;
        }
        actualizarDatoComponente({index: index, prop: 'scale', valor: tempEscala});
      }
    }
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
            <Box mt={3} display="flex" alignItems="center" flexDirection="column">
              <Rating
                name={item.name}
                value={item.value}
                max={Object.keys(item.scale).length - 1}
                onChange={(e, newValue) =>
                  actualizarDatoComponente({
                    index: index,
                    prop: 'value',
                    valor: newValue,
                  })
                }
                disabled={edicion}
                onChangeActive={(e, newHover) => setHover(newHover)}
                size="large"
              />
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
                  <Grid container spacing={1}>
                    <Box mt={2}>
                      <TextField
                        label="Escala"
                        value={escala}
                        onChange={handleEscala}
                        type="number"
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled={!edicion}
                      />
                    </Box>
                  </Grid>
                </Paper>
              </CardContent>
            </Collapse>
          </Fragment>
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

export default TipoRating;
