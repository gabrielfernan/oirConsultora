import React, {useState} from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import PollIcon from '@material-ui/icons/Poll';
// import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {makeStyles} from '@material-ui/styles';
import {NavLink} from 'react-router-dom';
import {eliminarFormulario} from '../../Redux/Formularios/AccionesFormularios';
import {useDispatch} from 'react-redux';
import useGlobalStyles from '../../app/estilos/cssglobal';
/* import Dialogo from '../Dialogo/Dialogo'; */

moment.locale('es');

const useStyles = makeStyles(theme => ({
  tamañoContenido: {
    height: '100%',
    minHeight: '180px',
  },
  derecha: {
    marginLeft: 'auto',
  },
  posicionIconos: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const FormularioTarjeta = props => {
  const [openDialogoEliminarComponente, setOpenDialogoEliminarComponente] = useState(false);
  const {formulario, usuario} = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const classesGlobals = useGlobalStyles();
  /* const [isAbrirDialogo, setIsAbrirDialogo] = useState(false); */

  // const obtenerAmbito = (ambito) => {
  //   const ambitos = {
  //     publico: 'Público',
  //     restringido: 'Restringido',
  //     privado: 'Privado',
  //   };
  //   return ambitos[ambito];
  // };

  const obtenerEstado = (condicion, valorCondicion, cantidadDeVotos) => {
    let vigencia = '';
    switch (condicion) {
      case 'fecha':
        let f = moment().format('YYYY-MM-DD');
        if (moment(f).isSameOrBefore(moment(valorCondicion))) {
          vigencia = `Vigente hasta ${valorCondicion}`;
        } else {
          vigencia = 'Fecha Superada';
        }
        break;
      case 'cupo':
        if (valorCondicion >= cantidadDeVotos) {
          vigencia = `Cupos disponibles ${valorCondicion - cantidadDeVotos}`;
        } else {
          vigencia = 'Cupo lleno';
        }
        break;
      case 'manual':
        vigencia = 'Manual';

        break;
      default:
        break;
    }
    return vigencia;
  };
  const clickEliminarFormulario = id => {
    dispatch(eliminarFormulario(id));
  };

  return (
    <React.Fragment>
      <Card elevation={4} className={classes.root}>
        <CardContent className={classes.tamañoContenido}>
          <Typography noWrap={true} variant="h6" color="initial">
            {formulario.titulo}
          </Typography>
          <Typography noWrap={true} variant="body2" color="initial">
            {formulario.subtitulo}
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography variant="body2" color="secondary">
              {formulario.publicado ? 'Encuesta Publicada' : 'Encuesta no publicada'}
            </Typography>
            <Typography variant="body2" color="secondary">
              Estado: {formulario.estado}
            </Typography>

            {formulario.estado === 'habilitado' && (
              <Typography variant="body2" color="secondary">
                Vigencias:
                {obtenerEstado(
                  formulario.condicion,
                  formulario.valorCondicion,
                  formulario.cantidadDeVotos
                )}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions
          disableSpacing
          className={`${classesGlobals.fondoVerde} ${classes.posicionIconos} ${classesGlobals.tamañoCardActions}`}
        >
          {!formulario.publicado && [1, 2].includes(usuario.rol) && (
            <Tooltip title="Editar" placement="top" arrow>
              <NavLink to={`/formularios/${formulario._id}`}>
                <IconButton className={classes.fondoIconButton} aria-label="editar" size="small">
                  <EditIcon className={classesGlobals.colorBlanco} />
                </IconButton>
              </NavLink>
            </Tooltip>
          )}

          {usuario.rol === 3 && (
            <React.Fragment>
              <Tooltip title="Reportes" placement="top" arrow>
                <NavLink to={`/reportes/${formulario._id}`}>
                  <IconButton aria-label="reportes" size="small">
                    <PollIcon className={classesGlobals.colorBlanco} />
                  </IconButton>
                </NavLink>
              </Tooltip>
            </React.Fragment>
          )}
          {usuario.rol === 2 && (
            <React.Fragment>
              <Tooltip title="Vista previa" placement="top" arrow>
                <NavLink to={`/vistaprevia/${formulario._id}`}>
                  <IconButton aria-label="visualizar" size="small">
                    <VisibilityOutlinedIcon className={classesGlobals.colorBlanco} />
                  </IconButton>
                </NavLink>
              </Tooltip>
            </React.Fragment>
          )}
          {usuario.rol === 1 && (
            <React.Fragment>
              <Tooltip title="Vista previa" placement="top" arrow>
                <NavLink to={`/vistaprevia/${formulario._id}`}>
                  <IconButton aria-label="visualizar" size="small">
                    <VisibilityOutlinedIcon className={classesGlobals.colorBlanco} />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <Tooltip title="Configurar" placement="top" arrow>
                <NavLink to={`/configurar/${formulario._id}`}>
                  <IconButton aria-label="configurar" size="small">
                    <SettingsIcon className={classesGlobals.colorBlanco} />
                  </IconButton>
                </NavLink>
              </Tooltip>

              <Tooltip title="Reportes" placement="top" arrow>
                <NavLink to={`/reportes/${formulario._id}`}>
                  <IconButton aria-label="reportes" size="small">
                    <PollIcon className={classesGlobals.colorBlanco} />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <Tooltip title="Eliminar" placement="top" arrow>
                <IconButton
                  onClick={() =>
                    /* clickEliminarFormulario(formulario._id) */
                    setOpenDialogoEliminarComponente(true)
                  }
                  aria-label="eliminar"
                  size="small"
                  className={classes.derecha}
                >
                  <DeleteOutlineIcon className={classesGlobals.colorBlanco} />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
      {/* <Dialogo
        open={isAbrirDialogo}
        titulo="¿Desea eliminar éste Formulario?"
        funcionDelDialogo={() => clickEliminarFormulario(formulario._id)}
      /> */}
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
            className={classesGlobals.estilosBoton}
            style={{color: 'black'}}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => clickEliminarFormulario(formulario._id)}
            color="primary"
            className={classesGlobals.estilosBoton}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormularioTarjeta;
