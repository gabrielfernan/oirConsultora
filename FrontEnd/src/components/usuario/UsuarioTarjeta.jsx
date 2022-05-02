import React, {Fragment, useState} from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  CardActions,
  Tooltip,
  Box,
} from '@material-ui/core';
import constantes from '../../app/constantes';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import {NavLink} from 'react-router-dom';
import {eliminarUsuario} from '../../Redux/Usuarios/AccionesUsuarios';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import useGlobalStyles from '../../app/estilos/cssglobal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  derecha: {
    textDecoration: 'none',
    marginLeft: 'auto',
  },
  colorNaranja: {
    color: theme.palette.warning.main,
  },
  colorVerde: {
    color: theme.palette.success.main,
  },
}));

const UsuarioTarjeta = props => {
  const {usuario} = props;
  const idUsuarioLogueado = useSelector(state => state.ReducerUsuarios.usuario._id);
  const classes = useStyles();
  const classesGlobals = useGlobalStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const obtenerRol = clave => {
    const rol = constantes.ROLES.filter(item => item.clave === clave);
    if (rol.length > 0) {
      return rol[0].valor.charAt(0).toUpperCase() + rol[0].valor.slice(1);
    } else {
      return '';
    }
  };

  const abrirDialogo = id => {
    setOpen(true);
  };

  const eliminar = id => {
    dispatch(eliminarUsuario(id));
    setOpen(false);
  };
  return (
    <Fragment>
      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={2} sm={2}>
              {usuario.foto ? (
                <Avatar src={`data:image/${usuario.foto.tipo};base64,${usuario.foto.fileBase64}`} />
              ) : (
                <AccountCircleIcon color="secondary" style={{color: '#bdbdbd', fontSize: 47}} />
              )}
            </Grid>
            <Grid item xs={10} sm={10}>
              <Typography variant="subtitle1" color="initial">
                {usuario.apellido}, {usuario.nombre}
              </Typography>
              <Typography variant="subtitle2" color="initial">
                Email: {usuario.email}
              </Typography>
              <Typography variant="subtitle2" color="initial">
                Rol: {obtenerRol(usuario.rol)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          disableSpacing
          className={`${classesGlobals.fondoVerde} ${classesGlobals.tamañoCardActions}`}
        >
          <Tooltip title="Editar" placement="top" arrow>
            <NavLink to={`/usuarios/${usuario._id}`}>
              <IconButton aria-label="editar usuario" size="small" color="primary">
                <EditIcon className={classesGlobals.colorBlanco} />
              </IconButton>
            </NavLink>
          </Tooltip>
          {usuario._id !== idUsuarioLogueado ? (
            <Tooltip title="Eliminar" placement="top" arrow>
              <IconButton
                aria-label="eliminar usuario"
                size="small"
                color="secondary"
                onClick={() => abrirDialogo(usuario._id)}
              >
                <DeleteOutlineIcon className={classesGlobals.colorBlanco} />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="Lista Formularios" placement="top" arrow>
            <NavLink
              to={{
                pathname: '/',
                homeProps: {usuario: usuario},
              }}
              className={classes.derecha}
            >
              <Box mt={1}>
                <ListAltOutlinedIcon className={classesGlobals.colorBlanco} />
              </Box>
            </NavLink>
          </Tooltip>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="">
        <DialogTitle id="">Eliminar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Desea eliminar este usuario?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="secondary"
            className={`${classesGlobals.estilosBoton}`}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => eliminar(usuario._id)}
            color="primary"
            className={`${classesGlobals.estilosBoton}`}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UsuarioTarjeta;
