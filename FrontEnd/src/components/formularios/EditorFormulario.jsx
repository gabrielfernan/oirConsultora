import React, {Fragment, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Paper,
  Button,
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  // Card,
  // CardContent,
  // FormControl,
  // RadioGroup,
  // FormControlLabel,
  // Radio,
} from '@material-ui/core';
import useStyles from './editorFormularioCSS';
import useGlobalStyles from '../../app/estilos/cssglobal';

import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
// import TextFieldsIcon from '@material-ui/icons/TextFields';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
// import Looks5OutlinedIcon from '@material-ui/icons/Looks5Outlined';
// import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RemoveIcon from '@material-ui/icons/Remove';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import StarIcon from '@material-ui/icons/Star';
//import PostAddIcon from '@material-ui/icons/PostAdd';
import clsx from 'clsx';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Container as ContainerDraggable, Draggable} from 'react-smooth-dnd';
import {useHistory} from 'react-router';
import {nuevoFormulario, actualizarFormulario} from '../../Redux/Formularios/AccionesFormularios';
import {insertarComponente} from './insertarComponente';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Componentes from './Componentes';
import TableChartIcon from '@material-ui/icons/TableChart';

const EditorFormulario = props => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const history = useHistory();
  const {formularioSeleccionado, edicion} = props;
  const [formulario, setFormulario] = useState(formularioSeleccionado);
  const [isFormularioValido, setIsFormularioValido] = useState(true);
  const dispatch = useDispatch();
  const [openDialogoFaltanDatos, setOpenDialogoFaltanDatos] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [open, setOpen] = useState(false);
  const [activarTitulo, setActivarTitulo] = useState(false);
  const [activarSubtitulo, setActivarSubtitulo] = useState(false);

  // const [logo, setLogo] = useState(
  //   edicion && Object.keys(formulario.logo).length > 0
  //     ? formulario.logo
  //     : {
  //         value: '',
  //         width: 0,
  //         height: 0,
  //       }
  // );

  // const [activarLogo, setActivarLogo] = useState(
  //   edicion && Object.keys(formulario.logo).length > 0 && formulario.logo.value !== ''
  //     ? true
  //     : false
  // );

  const actualizarDatoUnFormulario = datos => {
    if (datos.prop === 'componente') {
      setFormulario({
        ...formulario,
        componentes: insertarComponente(formulario.componentes, datos.tipo),
      });
    } else {
      if (datos.prop === 'condicion') {
        switch (datos.value) {
          case 'manual':
            setFormulario({
              ...formulario,
              condicion: 'manual',
              valorCondicion: true,
            });
            break;
          case 'fecha':
            setFormulario({
              ...formulario,
              condicion: 'fecha',
              valorCondicion: new Date().toISOString().slice(0, 10),
            });
            break;
          case 'cupo':
            setFormulario({
              ...formulario,
              condicion: 'cupo',
              valorCondicion: 1,
            });
            break;
          default:
            break;
        }
      } else {
        setFormulario({
          ...formulario,
          [datos.prop]: datos.value,
        });
      }
    }
  };

  const guardarCambios = (data, e) => {
    //data.logo = logo;
    data.componentes = formulario.componentes;
    data.usuarioId = formulario.usuarioId;
    data._id = formulario._id;
    data.condicion = 'manual';
    data.valorCondicion = '';
    data.lugarDatosEncuestado = '';
    data.estado = 'deshabilitado';
    if (isFormularioValido) {
      if (data._id) {
        dispatch(actualizarFormulario(data));
        history.push('/');
      } else {
        dispatch(nuevoFormulario(data));
        history.push('/');
      }
    } else {
      setOpenDialogoFaltanDatos(true);
    }
  };

  const revisar = () => {
    var isValido = true;
    const componentesRevisadas = formulario.componentes.map(componente => {
      const componenteRevisada = {...componente, mensajeErrorComponente: null};
      switch (componente.type) {
        case 'text':
        case 'textarea':
          if (!componente.pregunta || componente.pregunta.trim() === '') {
            componenteRevisada.mensajeErrorComponente = 'Debe ingresar el titulo de la pregunta';
            isValido = false;
          }
          break;
        case 'select':
        case 'radio':
        case 'checkbox':
          if (
            (!componente.pregunta || componente.pregunta.trim() === '') &&
            (!componente.options || componente.options.length === 0)
          ) {
            componenteRevisada.mensajeErrorComponente =
              'Debe ingresar el titulo de la pregunta y sus opciones';
            isValido = false;
          } else {
            if (!componente.pregunta || componente.pregunta.trim() === '') {
              componenteRevisada.mensajeErrorComponente = 'Debe ingresar el titulo de la preguntaa';
              isValido = false;
            }
            if (!componente.options || componente.options.length === 0) {
              componenteRevisada.mensajeErrorComponente = 'Debe ingresar al menos una opcion';
              isValido = false;
            }
          }

          break;
        case 'table':
          if (componente.editando) {
            componenteRevisada.mensajeErrorComponente =
              'Debe guardar los cambios realizados en la tabla';
            isValido = false;
          } else {
            if (
              (!componente.pregunta || componente.pregunta.trim() === '') &&
              (!componente.filas || componente.filas.length === 0) &&
              (!componente.columnas || componente.columnas.length === 0)
            ) {
              componenteRevisada.mensajeErrorComponente =
                'Debe ingresar el titulo de la pregunta y sus opciones';
              isValido = false;
            } else {
              if (!componente.pregunta || componente.pregunta.trim() === '') {
                componenteRevisada.mensajeErrorComponente =
                  'Debe ingresar el titulo de la preguntaa';
                isValido = false;
              }
              if (!componente.filas || componente.filas.length === 0) {
                componenteRevisada.mensajeErrorComponente =
                  'Debe ingresar al menos una opcion en las filas';
                isValido = false;
              }
              if (!componente.columnas || componente.columnas.length === 0) {
                componenteRevisada.mensajeErrorComponente =
                  'Debe ingresar al menos una opcion en las columnas';
                isValido = false;
              }
            }
          }
          break;
        case 'rating':
          if (!componente.pregunta || componente.pregunta.trim() === '') {
            componenteRevisada.mensajeErrorComponente = 'Debe ingresar el titulo de la pregunta';
            isValido = false;
          }
          break;
        default:
          break;
      }
      return componenteRevisada;
    });
    setIsFormularioValido(isValido);
    setFormulario({...formulario, componentes: componentesRevisadas});
    if (errors.titulo) {
      setActivarTitulo(true);
    }

    return;
  };

  const onDrop = ({removedIndex, addedIndex}) => {
    let componentes = [...formulario.componentes];
    const componente = componentes[removedIndex];
    componentes[removedIndex] = componentes[addedIndex];
    componentes[addedIndex] = componente;
    setFormulario({...formulario, componentes: componentes});
  };

  // const handleImagen = (e) => {
  //   let img = new Image();
  //   img.src = URL.createObjectURL(e.target.files[0]);
  //   setLogo({...logo, value: img.src});
  // };

  // const eliminarImagen = () => {
  //   setLogo({});
  //   setActivarLogo(false);
  // };
  return (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        endIcon={open ? <ChevronLeftIcon /> : <AddIcon />}
        className={`${globalClasses.degradeVerde} ${globalClasses.estilosBoton} ${classes.botonFlotante}`}
        onClick={() => setOpen(!open)}
      >
        <Typography variant="subtitle2" component="span" color="initial">
          {open ? 'Ocultar panel' : 'Agregar componentes'}
        </Typography>
      </Button>
      <Drawer
        variant="persistent"
        anchor="left"
        elevation={3}
        open={open}
        classes={{
          root: classes.drawerRootCSS,
          paper: classes.drawerPaperCSS,
        }}
      >
        <Toolbar />
        <Toolbar />
        <List>
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'text'});
            }}
          >
            <ListItemIcon>
              <ShortTextIcon />
            </ListItemIcon>
            <ListItemText secondary="Texto corto" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'textarea'});
            }}
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="Texto largo" />
          </ListItem>
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'parrafo'});
            }}
          >
            <ListItemIcon>
              <TextFieldsIcon />
            </ListItemIcon>
            <ListItemText secondary="Párrafo" />
          </ListItem> */}
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'select'});
            }}
          >
            <ListItemIcon>
              <KeyboardArrowDownOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Desplegable" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'radio'});
            }}
          >
            <ListItemIcon>
              <RadioButtonCheckedOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Opción única" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'checkbox'});
            }}
          >
            <ListItemIcon>
              <CheckBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Opción múltiple" />
          </ListItem>
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'number'});
            }}
          >
            <ListItemIcon>
              <Looks5OutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Número" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'img'});
            }}
          >
            <ListItemIcon>
              <PanoramaOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Imagen" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'time'});
            }}
          >
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText secondary="Hora" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'userdata'});
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText secondary="Datos del encuestado" />
          </ListItem> */}
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'divider'});
            }}
          >
            <ListItemIcon>
              <RemoveIcon />
            </ListItemIcon>
            <ListItemText secondary="Separador" />
          </ListItem>
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'date'});
            }}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText secondary="Fecha" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'daterange'});
            }}
          >
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText secondary="Rango de fechas" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'recaptcha'});
            }}
          >
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            <ListItemText secondary="reCaptcha" />
          </ListItem> */}
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'file'});
            }}
          >
            <ListItemIcon>
              <AttachFileIcon />
            </ListItemIcon>
            <ListItemText secondary="Archivo" />
          </ListItem> */}
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'rating'});
            }}
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText secondary="Selector de puntaje" />
          </ListItem>
          {/* <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'condicional'});
            }}
          >
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText secondary="Campo condicional" />
          </ListItem> */}
          {/* TODO: Se comentó campo condicional */}
          <ListItem
            button
            onClick={() => {
              setOpen(!open);
              actualizarDatoUnFormulario({prop: 'componente', tipo: 'table'});
            }}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText secondary="Tabla de Entrada" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="lg" className={clsx(classes.containerCSS)}>
        <Typography variant="h6" color="initial" align="center">
          {edicion ? 'EDICIÓN DEL FORMULARIO DE ENCUESTA' : 'NUEVO FORMULARIO PARA ENCUESTA'}
        </Typography>
        <Paper elevation={3} className={classes.paperCSS}>
          <form onSubmit={handleSubmit(guardarCambios)} autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container item xs={12} wrap="nowrap">
                  <Grid item xs={12} /* sm={9} md={9} lg={9} xl={9} */ zeroMinWidth>
                    <Box mt={3}>
                      <Controller
                        name="titulo"
                        control={control}
                        defaultValue={formulario && formulario.titulo ? formulario.titulo : ''}
                        rules={{required: 'Título requerido'}}
                        render={({field: {onChange, value}, fieldState: {error}}) =>
                          !activarTitulo ? (
                            <Typography
                              variant="h5"
                              color="primary"
                              align="center"
                              onClick={() => setActivarTitulo(true)}
                              noWrap
                            >
                              {formulario.titulo
                                ? formulario.titulo
                                : 'Haga click aquí para ingresar el título '}
                            </Typography>
                          ) : (
                            <TextField
                              focused={true}
                              autoFocus={true}
                              label="Título"
                              variant="standard"
                              size="small"
                              fullWidth
                              value={value}
                              onChange={value => {
                                onChange(value);
                                actualizarDatoUnFormulario({
                                  prop: 'titulo',
                                  value: value.target.value,
                                });
                              }}
                              error={error}
                              helperText={error ? error.message : null}
                              onBlur={() => setActivarTitulo(false)}
                            />
                          )
                        }
                      />
                    </Box>
                    <Box mt={3}>
                      <Box>
                        <Controller
                          name="subtitulo"
                          control={control}
                          // defaultValue={formulario && formulario.titulo ? formulario.titulo : ''}
                          render={({field: {onChange, value}, fieldState: {error}}) =>
                            !activarSubtitulo ? (
                              <Typography
                                variant="subtitle1"
                                color="initial"
                                align="center"
                                className={clsx({
                                  [globalClasses.mostrar]: !activarSubtitulo,
                                  [globalClasses.ocultar]: activarSubtitulo,
                                })}
                                onClick={() => setActivarSubtitulo(true)}
                                noWrap
                              >
                                {formulario.subtitulo
                                  ? formulario.subtitulo
                                  : 'Haga click aquí para ingresar el subtítulo '}
                              </Typography>
                            ) : (
                              <TextField
                                autoFocus={true}
                                focused={true}
                                label="Subítulo"
                                variant="standard"
                                size="small"
                                fullWidth
                                value={value}
                                onChange={value => {
                                  onChange(value);
                                  actualizarDatoUnFormulario({
                                    prop: 'subtitulo',
                                    value: value.target.value,
                                  });
                                }}
                                helperText={error ? error.message : null}
                                onBlur={() => setActivarSubtitulo(false)}
                              />
                            )
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>

                  {/* <Grid align="center" item xs={12} sm={3} md={3} lg={3} xl={3}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.logo}
                      onClick={() => setActivarLogo(true)}
                    >
                      {logo.value !== '' && logo.value !== undefined ? (
                        <img src={logo.value} alt={logo.label} width="100%" height="100%" />
                      ) : (
                        <React.Fragment>
                          <label
                            htmlFor="imagenLogo"
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                            className={globalClasses.cursorPointer}
                          >
                            <PanoramaOutlinedIcon color="disabled" style={{fontSize: 96}} />
                            <Box mx={1} mb={1}>
                              <Typography variant="body2" color="textSecondary" align="center">
                                Click aquí para insertar un logo.
                              </Typography>
                            </Box>
                          </label>
                        </React.Fragment>
                      )}
                    </Box>

                    {activarLogo && (
                      <Box mt={1} display="flex" justifyContent="center">
                        <input
                          id="imagenLogo"
                          accept="image/*"
                          type="file"
                          multiple
                          onChange={handleImagen}
                          style={{display: 'none'}}
                        />
                        {logo.value && (
                          <Button
                            size="small"
                            color="default"
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            onClick={() => eliminarImagen()}
                            className={`${classes.immageButtonsCSS} ${classes.botonEliminarImg}`}
                          >
                            Eliminar
                          </Button>
                        )}
                      </Box>
                    )}
                  </Grid> */}
                </Grid>

                {/* <Box className={globalClasses.ocultar}>
                  <Controller
                    name="_id"
                    control={control}
                    defaultValue={formulario && formulario._id ? formulario._id : ''}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <TextField
                        variant="standard"
                        size="small"
                        fullWidth
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Box> */}

                <Box className={globalClasses.ocultar}></Box>
                {/* <Box mt={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Box mb={3} className={globalClasses.fondoVerde}>
                        <Typography
                          variant="h6"
                          className={globalClasses.colorBlanco}
                          align="center"
                        >
                          Condición de vigencia
                        </Typography>
                      </Box>
                      <Box mx={2}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs={12} sm={6} md={6}>
                            <FormControl component="fieldset">
                              <RadioGroup
                                aria-label="condicion"
                                name="condicion"
                                value={formulario.condicion}
                                onChange={(e) =>
                                  actualizarDatoUnFormulario({
                                    prop: 'condicion',
                                    value: e.target.value,
                                  })
                                }
                              >
                                <FormControlLabel
                                  value="manual"
                                  control={<Radio />}
                                  label="Manual"
                                />
                                <FormControlLabel
                                  value="fecha"
                                  control={<Radio />}
                                  label="Por fecha"
                                />
                                <FormControlLabel
                                  value="cupo"
                                  control={<Radio />}
                                  label="Por cupo"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Box
                              className={
                                formulario.condicion === 'fecha'
                                  ? globalClasses.mostrar
                                  : globalClasses.ocultar
                              }
                            >
                              <Controller
                                name="valorCondicion"
                                control={control}
                                defaultValue={
                                  formulario.valorCondicion
                                    ? formulario.valorCondicion
                                    : new Date().toISOString().slice(0, 10)
                                }
                                // TODO:CHEQUEAR VALIDACIONES
                                rules={
                                  formulario.condicion === 'fecha'
                                    ? {required: 'Valor requerido fecha'}
                                    : null
                                }
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                  <TextField
                                    label="Fecha de vigencia"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    value={
                                      formulario.valorCondicion
                                        ? formulario.valorCondicion
                                        : new Date().toISOString().slice(0, 10)
                                    }
                                    onChange={(value) => {
                                      onChange(value);
                                      setFormulario({
                                        ...formulario,
                                        valorCondicion: value.target.value,
                                      });
                                    }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    autoFocus
                                  />
                                )}
                              />
                            </Box>
                            <Box
                              className={
                                formulario.condicion === 'cupo'
                                  ? globalClasses.mostrar
                                  : globalClasses.ocultar
                              }
                            >
                              <Controller
                                name="valorCondicion"
                                control={control}
                                defaultValue={
                                  formulario.valorCondicion ? formulario.valorCondicion : 1
                                }
                                // TODO:CHEQUEAR VALIDACIONES
                                rules={
                                  formulario.condicion === 'cupo'
                                    ? {required: 'Valor requerido cupo'}
                                    : null
                                }
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                  <TextField
                                    label="Cantidad límite de votaciones"
                                    variant="outlined"
                                    size="small"
                                    value={
                                      formulario.valorCondicion ? formulario.valorCondicion : 1
                                    }
                                    onChange={(value) => {
                                      onChange(value);
                                      setFormulario({
                                        ...formulario,
                                        valorCondicion: parseInt(value.target.value),
                                      });
                                    }}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    InputLabelProps={{shrink: true}}
                                    autoFocus
                                  />
                                )}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box mt={3}>
                  <Card elevation={3}>
                    <CardContent>
                      <Box mb={3} className={globalClasses.fondoVerde}>
                        <Typography
                          variant="h6"
                          color="initial"
                          align="center"
                          className={globalClasses.colorBlanco}
                        >
                          Ámbito del formulario
                        </Typography>
                      </Box>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <Controller
                            name="ambito"
                            control={control}
                            defaultValue={
                              formulario && formulario.ambito ? formulario.ambito : 'publico'
                            }
                            rules={{required: 'Ámbito requerido'}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                              <TextField
                                label="Ámbito del formulario"
                                variant="outlined"
                                size="small"
                                type="date"
                                value={value}
                                onChange={(value) => {
                                  onChange(value);

                                  actualizarDatoUnFormulario({
                                    prop: 'ambito',
                                    value: value.target.value,
                                  });
                                }}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                select
                              >
                                <option style={{cursor: 'pointer'}} value="publico">
                                  Público
                                </option>
                                <option style={{cursor: 'pointer'}} value="restringido">
                                  Restringido
                                </option>
                                <option style={{cursor: 'pointer'}} value="privado">
                                  Privado
                                </option>
                              </TextField>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box> */}
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ContainerDraggable dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                  {formulario.componentes.map((item, index) => (
                    <Draggable key={index} className={classes.draggablePadding10}>
                      <Box mt={3}>
                        <Componentes
                          formulario={formulario}
                          setFormulario={setFormulario}
                          name={`componentes[${index}]`}
                          item={item}
                          index={index}
                          preview={false}
                          edicion={true}
                        />
                      </Box>
                    </Draggable>
                  ))}
                </ContainerDraggable>
              </Grid>
            </Grid>
            {formulario.componentes.length > 0 && (
              <Fragment>
                <Grid container spacing={1}>
                  <Divider />
                </Grid>
                <Grid
                  container
                  spacing={5}
                  className={`${classes.gridContainerCSS} ${globalClasses.maginTop20}`}
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={revisar}
                      className={`${globalClasses.degradeVerde} ${globalClasses.estilosBoton}`}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </form>
        </Paper>
        <Dialog
          open={openDialogoFaltanDatos}
          onClose={() => setOpenDialogoFaltanDatos(false)}
          aria-labelledby="dialgo eliminar"
        >
          <DialogTitle color="error">
            <Typography variant="h6" component="span" fontWeight="fontWeightBold" color="error">
              FALTAN DATOS REQUERIDOS
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="subtitle1" component="span" fontWeight="fontWeightBold">
                Por favor revisa el formulario,algunos datos son necesarios
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
            <Button
              variant="contained"
              onClick={() => setOpenDialogoFaltanDatos(false)}
              color="default"
              className={globalClasses.estilosBoton}
              style={{color: 'black'}}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  );
};

export default EditorFormulario;
