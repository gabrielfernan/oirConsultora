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
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Switch,
} from '@material-ui/core';

import DragHandleIcon from '@material-ui/icons/DragHandle';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';
import ShortTextIcon from '@material-ui/icons/ShortText';

import useGlobalStyles from '../../../app/estilos/cssglobal';

const TipoTex = ({item, index, classes, actualizarDatoComponente, eliminarComponente, edicion}) => {
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
                        <Box
                          fontWeight="fontWeightBold"
                          className={globalClasses.cursorPointer}
                          textAlign="center"
                        >
                          {item.pregunta === ''
                            ? 'Click aqu?? para escribir la pregunta'
                            : item.pregunta}
                        </Box>
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <TextField
                        value={item.pregunta}
                        placeholder="Click aqu?? para escribir la pregunta"
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
              <TextField
                error={item.errores ? true : false}
                helperText={item.errores ? item.errores : ''}
                placeholder={item.placeholder}
                name={item.name}
                variant="outlined"
                size="small"
                fullWidth
                required={item.required}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  maxLength: 150,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ShortTextIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={e => {
                  actualizarDatoComponente({
                    index: index,
                    prop: 'value',
                    valor: e.target.value,
                    esHijo: item.esHijo,
                  });
                }}
                disabled={edicion}
              />
              {!edicion && (
                <Box className={globalClasses.boxTextoInformativoCaracteres}>
                  <Typography
                    variant="subtitle1"
                    component="small"
                    fontWeight="fontWeightBold"
                    color="primary"
                    className={globalClasses.textoInformativoCaracteres}
                  >
                    {item.value ? item.value.length : 0}/150
                  </Typography>
                </Box>
              )}
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
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box mt={2} className={globalClasses.noMarginLeft}>
                          <TextField
                            label="Descripci??n del campo"
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

export default TipoTex;
