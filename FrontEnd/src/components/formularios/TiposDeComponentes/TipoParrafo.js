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
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SunEditor from 'suneditor-react';
import clsx from 'clsx';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoParrafo = ({
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

  const handleExpandidoClick = () => {
    setExpandido(!expandido);
  };
  return (
    <Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box
          width="100%"
          height="11px"
          // className={item.errores ? globalClasses.fondoRojo : globalClasses.fondoVerde}
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
              <Paper variant="outlined" color="textSecondary" className={classes.componenteRoot}>
                <Box
                  dangerouslySetInnerHTML={{__html: item.value ? item.value : item.placeholder}}
                />
              </Paper>
            </Box>
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
            </CardActions>{' '}
            <Collapse in={expandido} timeout="auto" unmountOnExit>
              <CardContent className={classes.boxCollapse}>
                <Paper variant="outlined" className={classes.componenteRoot}>
                  <Fragment>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                        <TextField
                          label="Nombre del componente"
                          value={item.name}
                          onChange={(e) =>
                            actualizarDatoComponente({
                              index: index,
                              prop: 'name',
                              valor: e.target.value,
                            })
                          }
                          fullWidth
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <SunEditor
                        lang="es"
                        placeholder="Escriba aquí el texto del párrafo"
                        defaultValue={item.value}
                        onChange={(contenido) =>
                          actualizarDatoComponente({
                            index: index,
                            prop: 'value',
                            valor: contenido,
                          })
                        }
                        setOptions={{
                          buttonList: [
                            ['undo', 'redo'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                            ['removeFormat'],
                            ['outdent', 'indent'],
                          ],
                          showPathLabel: false,
                        }}
                      />
                    </Box>
                  </Fragment>
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

export default TipoParrafo;
