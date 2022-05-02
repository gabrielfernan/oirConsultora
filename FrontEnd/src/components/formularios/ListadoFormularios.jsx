import React, {useState, useEffect, Fragment} from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  //IconButton,
  //Tooltip,
} from '@material-ui/core';
import useGlobalStyles from '../../app/estilos/cssglobal';
import AddIcon from '@material-ui/icons/Add';
import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import PublicIcon from '@material-ui/icons/Public';
// import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
// import LockIcon from '@material-ui/icons/Lock';
import FormularioTarjeta from './FormularioTarjeta';
// import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import {Alert} from '@material-ui/lab';

const ListadoFormularios = props => {
  let {usuario} = props;
  const {formularios, cargandoFormularios, errorFormularios} = useSelector(
    state => state.ReducerFormularios
  );
  const [formulariosFiltrados, setFormulariosFiltrados] = useState([]);
  // const location = useLocation();

  // if (location.homeProps) {
  //   usuario = location.homeProps.usuario;
  // }

  const classes = useGlobalStyles();
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setFormulariosFiltrados(formularios);
  }, [formularios]);

  const handleBusqueda = e => {
    setBusqueda(e.target.value);
    setFormulariosFiltrados(
      formularios.filter(
        item =>
          (item.titulo && item.titulo.toLowerCase().includes(e.target.value.toLowerCase())) ||
          (item.subtitulo && item.subtitulo.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    );
  };

  /* const filtrar = (ambito) => {
    //TODO:Verificar esto

    if (ambito === 'todos') {
      setFormulariosFiltrados(formularios);
    } else {
      setFormulariosFiltrados(formularios.filter((item) => item.ambito === ambito));
    }
  }; */

  if (cargandoFormularios) {
    return <Cargando />;
  } else {
    if (errorFormularios) {
      return <ErrorGenerico mensaje={errorFormularios} />;
    } else {
      return (
        <Fragment>
          <Box mt={3} boxShadow={2}>
            <Paper elevation={0} variant="outlined" className={classes.padding15}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6} md={3} /* lg={3} xl={3} */>
                  <Typography variant="h6" color="initial">
                    MIS FORMULARIOS
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Cuenta total {formularios.length}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} /* md={3} lg={3} xl={3} */>
                  <Box boxShadow={2} borderRadius="5%">
                    <TextField
                      label="Búsqueda..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={busqueda}
                      onChange={e => handleBusqueda(e)}
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
                {/* <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <Box align="center">
                    <Tooltip title="Todos" arrow>
                      <IconButton aria-label="filtro todos" onClick={() => filtrar('todos')}>
                        <ListAltIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Públicos" arrow>
                      <IconButton aria-label="filtro publico" onClick={() => filtrar('publico')}>
                        <PublicIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Restringidos" arrow>
                      <IconButton
                        aria-label="filtro restringido"
                        onClick={() => filtrar('restringido')}
                      >
                        <PeopleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Privados" arrow>
                      <IconButton aria-label="filtro privado" onClick={() => filtrar('privado')}>
                        <LockIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid> */}
                {(usuario.rol ===1 || usuario.rol ===2) &&
                
                <Grid item xs={12} sm={6} md={3} /* lg={3} xl={3} */>

                  <NavLink to="/formularios/nuevo" className={classes.navlink}>
                    <Button
                      variant="contained"
                      className={`${classes.degradeVerde} ${classes.estilosBoton}`}
                      fullWidth
                      startIcon={<AddIcon />}
                    >
                      Crear Formulario
                    </Button>
                  </NavLink>
                </Grid>
                }
              </Grid>
            </Paper>
          </Box>
          <Box mt={3}>
            <Grid container spacing={3}>
              {formulariosFiltrados && formulariosFiltrados.length > 0 ? (
                formulariosFiltrados.map(formulario => (
                  <Grid item xs={12} sm={4} md={3} lg={3} xl={3} key={formulario._id}>
                    <FormularioTarjeta usuario={usuario} formulario={formulario} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Alert icon={false} severity="success">
                    Aún no hay formularios cargados.
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </Fragment>
      );
    }
  }
};

export default ListadoFormularios;
