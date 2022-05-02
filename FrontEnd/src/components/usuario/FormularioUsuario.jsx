import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, TextField, Button, IconButton} from '@material-ui/core';
import {useForm, Controller} from 'react-hook-form';
import useGlobalStyles from '../../app/estilos/cssglobal';
import constantes from '../../app/constantes';
import {
  editarUsuario,
  eliminarFotoDeUsuario,
  nuevoUsuario,
  valoresDefaultFotoDeUsuario_Accion,
} from '../../Redux/Usuarios/AccionesUsuarios';
import {editarFotoDeUsuario} from '../../Redux/Usuarios/AccionesUsuarios';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {makeStyles} from '@material-ui/styles';
/* import imagenUsuarioDefault from '../../Static/Img/usuario.png'; */
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './FormularioUsuario.css';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paddingIconoUsuario: {
    padding: 20,
  },
  gridItemFoto: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
const FormularioUsuario = props => {
  const {usuario, edicion, isNuevoUsuario} = props;
  const classes = useGlobalStyles();
  const classesComponent = useStyles();

  const {control, handleSubmit} = useForm();
  const [editar, setEditar] = useState(edicion);
  const idUsuarioLogueado = useSelector(state => state.ReducerUsuarios.usuario._id);
  const usuarioLogueado = useSelector(state => state.ReducerUsuarios.usuario);

  const {cargandoFotoDeUsuario, errorFotoDeUsuario} = useSelector(state => state.ReducerUsuarios);
  const dispatch = useDispatch();
  const history = useHistory();
  //const location = useLocation();

  const guardarCambios = (data, e) => {
    if (data._id) {
      if (idUsuarioLogueado === data._id) {
        data.miPerfil = true;
      } else {
        data.miPerfil = false;
      }
      dispatch(editarUsuario(data));
      //TODO controlar redirecciones despues de las respuestas
      history.push(data.miPerfil ? '/login' : '/usuarios');
    } else {
      dispatch(nuevoUsuario(data));
      //TODO controlar redirecciones despues de las respuestas
      history.push('/usuarios');
    }
  };

  const cambiarEdicion = () => {
    setEditar(!editar);
  };
  const actualizarFoto = value => {
    // console.log(value);
    if (value.target.files.length > 0) {
      dispatch(editarFotoDeUsuario(usuario, value.target.files));
    }
  };

  const eliminarImagen = () => {
    dispatch(eliminarFotoDeUsuario(usuario));
  };
  useEffect(() => {
    return () => {
      dispatch(valoresDefaultFotoDeUsuario_Accion());
    };
  }, [dispatch]);
  /* const reestablecerValorDeInput = e => {
    const element = document.querySelector('#foto');
    element.value = null;
  }; */
  return (
    <Box mt={3}>
      <Paper variant="outlined" className={classes.padding15}>
        <form className={classes.root} onSubmit={handleSubmit(guardarCambios)} autoComplete="off">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={3}
              className={classesComponent.gridItemFoto}
            >
              <div className="contenedorFotoUsuario overflowHidden">
                {errorFotoDeUsuario ? (
                  <AccountCircleIcon style={{fontSize: 160, color: 'red'}} />
                ) : cargandoFotoDeUsuario ? (
                  <Cargando />
                ) : usuario ? (
                  usuario.foto && Object.keys(usuario.foto).length > 0 ? (
                    <img
                      src={`data:image/${usuario.foto.tipo};base64,${usuario.foto.fileBase64}`}
                      alt=""
                      className={classes.imagenResponsive}
                    />
                  ) : (
                    <AccountCircleIcon color="primary" style={{fontSize: 160}} />
                  )
                ) : (
                  <AccountCircleIcon color="primary" style={{fontSize: 160}} />
                )}
              </div>
              <Grid item sm={3} md={3} lg={3} xl={3}>
                <Box className={editar ? `${classes.mostrar} ` : classes.ocultar}>
                  <Controller
                    name="foto"
                    control={control}
                    defaultValue=""
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <input
                        id="foto"
                        accept="image/*"
                        type="file"
                        multiple
                        value={value}
                        onChange={value => {
                          onChange(value);
                          actualizarFoto(value);
                        }}
                        style={{display: 'none'}}
                        /* onClick={e => reestablecerValorDeInput(e)} */
                      />
                    )}
                  />
                  <Grid container>
                    <Grid item xs={12}>
                      {isNuevoUsuario ? (
                        <Box display="flex" justifyContent="center">
                          <IconButton
                            size="small"
                            color="primary"
                            component="span"
                            className="fontSizeIconButton"
                            disabled={
                              isNuevoUsuario ||
                              (usuario && idUsuarioLogueado !== usuario._id ? true : false)
                            }
                          >
                            Subir imagen
                          </IconButton>
                        </Box>
                      ) : (
                        <label htmlFor="foto">
                          <Box display="flex" justifyContent="center">
                            <IconButton
                              size="small"
                              color="primary"
                              component="span"
                              className="fontSizeIconButton"
                              disabled={
                                isNuevoUsuario ||
                                (usuario && idUsuarioLogueado !== usuario._id ? true : false)
                              }
                            >
                              Subir imagen
                            </IconButton>
                          </Box>
                        </label>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Box mb={3} display="flex" justifyContent="center">
                        <IconButton
                          size="small"
                          color="secondary"
                          component="span"
                          onClick={() => eliminarImagen()}
                          className="fontSizeIconButton"
                          disabled={
                            isNuevoUsuario ||
                            (usuario && idUsuarioLogueado !== usuario._id ? true : false) ||
                            (usuario.foto && Object.keys(usuario.foto).length > 0 ? false : true)
                          }
                        >
                          Eliminar imagen
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            {/* GRID ITEM FORM IMPUT */}
            <Grid container item xs={12} sm={8} md={9} lg={9} xl={9}>
              <Box className={classes.ocultar}>
                <Controller
                  name="_id"
                  control={control}
                  defaultValue={usuario && usuario._id ? usuario._id : ''}
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
              </Box>
              <Controller
                name="usuario"
                control={control}
                defaultValue={usuario && usuario.usuario ? usuario.usuario : ''}
                rules={{required: 'Usuario requerido'}}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    label="Usuario"
                    /* placeholder="Usuario" */
                    variant="outlined"
                    type="text"
                    size="small"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!editar || (usuario && idUsuarioLogueado !== usuario._id)}
                    className=/* {classes.maginTop20} */ {`${classes.maginTop20} paddingBottomInput`}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue={usuario && usuario.password ? usuario.password : ''}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextField
                    label="Contraseña"
                    /* placeholder="Contraseña" */
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={value}
                    type="password"
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!editar || (usuario && idUsuarioLogueado !== usuario._id)}
                    className={classes.maginTop20}
                  />
                )}
              />
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="paddingRightGridItem"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Controller
                    name="nombre"
                    control={control}
                    defaultValue={usuario && usuario.nombre ? usuario.nombre : ''}
                    rules={{required: 'Nombre requerido'}}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <TextField
                        label="Nombre"
                        /* placeholder="Nombre" */
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        disabled={!editar || (usuario && idUsuarioLogueado !== usuario._id)}
                        className={classes.maginTop20}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={usuario && usuario.email ? usuario.email : ''}
                    rules={{required: 'Correo electrónico requerido'}}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={value}
                        type="email"
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        disabled={!editar || (usuario && idUsuarioLogueado !== usuario._id)}
                        className={classes.maginTop20}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="paddingLeftGridItem"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Controller
                    name="apellido"
                    control={control}
                    defaultValue={usuario && usuario.apellido ? usuario.apellido : ''}
                    rules={{required: 'Apellido requerido'}}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <TextField
                        label="Apellido"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        disabled={!editar || (usuario && idUsuarioLogueado !== usuario._id)}
                        className={classes.maginTop20}
                      />
                    )}
                  />

                  <Controller
                    name="rol"
                    control={control}
                    defaultValue={usuario && usuario.rol ? usuario.rol : ''}
                    rules={{required: 'Rol de usuario requerido'}}
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                      <TextField
                        variant="outlined"
                        label="Rol de usuario"
                        size="small"
                        select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        SelectProps={{
                          native: true,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={!editar || usuarioLogueado.rol !== 1}
                        className={classes.maginTop20}
                      >
                        <option value="">Elija un rol de usuario</option>
                        {constantes.ROL.map(rol => (
                          <option value={rol.key} key={rol.key}>
                            {rol.nombre}
                          </option>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} align="right" className={classes.maginTop20}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={
                  !editar
                    ? `${classes.ocultar}`
                    : `${classes.mostrar} ${classes.degradeVerde} ${classes.estilosBoton}`
                }
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                className={
                  editar
                    ? classes.ocultar
                    : `${classes.mostrar} ${classes.degradeVerde} ${classes.estilosBoton}`
                }
                onClick={cambiarEdicion}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {errorFotoDeUsuario && <ErrorGenerico mensaje={'No se logró cargar foto de Usuario'} />}
    </Box>
  );
};

export default FormularioUsuario;
