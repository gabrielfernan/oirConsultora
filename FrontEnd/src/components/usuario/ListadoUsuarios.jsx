import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listado} from '../../Redux/Usuarios/AccionesUsuarios';
import {NavLink} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {Box, Grid, InputAdornment, Paper, TextField, Typography, Tooltip} from '@material-ui/core';
import useGlobalStyles from '../../app/estilos/cssglobal';
import SearchIcon from '@material-ui/icons/Search';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PollIcon from '@material-ui/icons/Poll';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CreateIcon from '@material-ui/icons/Create';
import UsuarioTarjeta from './UsuarioTarjeta';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';

const ListadoUsuarios = () => {
  const {usuarios, cargandoUsuarios, errorUsuarios} = useSelector((state) => state.ReducerUsuarios);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const dispatch = useDispatch();
  const classes = useGlobalStyles();
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    dispatch(listado());
  }, [dispatch]);

  useEffect(() => {
    setUsuariosFiltrados(usuarios);
  }, [usuarios]);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setUsuariosFiltrados(
      usuarios.filter(
        (item) =>
          (item.nombre && item.nombre.toLowerCase().includes(e.target.value.toLowerCase())) ||
          (item.apellido && item.apellido.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    );
  };

  const filtrar = (rol) => {
    if (rol === 'todos') {
      setUsuariosFiltrados(usuarios);
    } else {
      setUsuariosFiltrados(usuarios.filter((item) => item.rol === rol));
    }
  };
  if (cargandoUsuarios) return <Cargando />;
  else {
    return errorUsuarios ? (
      <ErrorGenerico mensaje={errorUsuarios} />
    ) : (
      <Fragment>
        <Box mt={3}>
          <Paper elevation={0} variant="outlined" className={classes.padding15}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Typography variant="h6" color="initial">
                  USUARIOS
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Cuenta total {usuarios.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Box boxShadow={2} borderRadius="5%">
                  <TextField
                    label="Búsqueda..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={busqueda}
                    onChange={(e) => handleBusqueda(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Box align="center">
                  <Tooltip title="Todos" arrow>
                    <IconButton aria-label="filtro todos" onClick={() => filtrar('todos')}>
                      <ListAltIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Administradores" arrow>
                    <IconButton aria-label="filtro administradores" onClick={() => filtrar(1)}>
                      <PeopleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Consultores" arrow>
                    <IconButton aria-label="filtro consultores" onClick={() => filtrar(3)}>
                      <PollIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editores" arrow>
                    <IconButton aria-label="filtro editores" onClick={() => filtrar(2)}>
                      <CreateIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <NavLink to="/usuarios/nuevo" className={classes.navlink}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<AddIcon />}
                    className={`${classes.degradeVerde} ${classes.estilosBoton}`}
                  >
                    Nuevo usuario
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mt={3}>
          <Grid container spacing={3}>
            {usuariosFiltrados &&
              usuariosFiltrados.map((usuario) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={usuario._id}>
                  <UsuarioTarjeta usuario={usuario} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Fragment>
    );
  }
};

export default ListadoUsuarios;
