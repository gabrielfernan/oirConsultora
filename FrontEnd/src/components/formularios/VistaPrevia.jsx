import {Box, Button, Container, Divider, Grid, Paper, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {buscarFormulario} from '../../Redux/Formularios/AccionesFormularios';
import useStyles from './editorFormularioCSS';
import useGlobalStyles from '../../app/estilos/cssglobal';
import {NavLink} from 'react-router-dom';
import Cargando from '../Cargando/Cargando';
import ErrorGenerico from '../ErrorGenerico/ErrorGenerico';
import Componentes from './Componentes';

const VistaPrevia = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const {id} = useParams();
  const {unFormulario, cargandoUnFormulario, errorUnFormulario} = useSelector(
    (state) => state.ReducerFormularios
  );
  const [formulario, setFormulario] = useState(unFormulario);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(buscarFormulario(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (unFormulario) {
      setFormulario(unFormulario);
    }
  }, [unFormulario]);
  if (cargandoUnFormulario) {
    return <Cargando />;
  } else {
    return errorUnFormulario ? (
      <ErrorGenerico mensaje={errorUnFormulario} />
    ) : (
      <Container maxWidth="md" className={classes.containerCSS}>
        <Typography variant="h6" color="initial" align="center">
          VISTA PREVIA DEL FORMULARIO
        </Typography>
        <Paper elevation={3} className={classes.paperCSS}>
          <Grid container spacing={1}>
            {/* {Object.keys(unFormulario.logo).includes('value') && unFormulario.logo.value !== '' && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={1} justify="center" id="img_contenedor">
                      <img
                        src={unFormulario.logo.value}
                        alt={unFormulario.label}
                        className={classes.contenedorImg}
                      />
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )} */}
            <Grid item xs={12}>
              <Box mt={3}>
                <Typography variant="h5" color="primary" align="center">
                  {unFormulario.titulo}
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="subtitle1" color="initial" align="center">
                  {unFormulario.subtitulo}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {formulario.componentes.map((item, index) => (
                <Box mt={3} key={index}>
                  <Componentes
                    formulario={formulario}
                    setFormulario={setFormulario}
                    item={item}
                    index={index}
                    preview={false}
                    edicion={false}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Divider />
          </Grid>
          <Grid
            container
            spacing={5}
            className={`${classes.gridContainerCSS} ${globalClasses.maginTop20}`}
          >
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align="rigth">
              <NavLink to={`/`} className={globalClasses.navlink}>
                <Box pl={{xs: 3, sm: 0}}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
                  >
                    Salir
                  </Button>
                </Box>
              </NavLink>
            </Grid>
            {unFormulario.publicado ? (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                align="end"
                style={{paddingRight: '10px'}}
              >
                <NavLink to={`/configurar/${unFormulario._id}`} className={globalClasses.navlink}>
                  <Box pr={{xs: 3, sm: 0}}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
                    >
                      Configurar
                    </Button>
                  </Box>
                </NavLink>
              </Grid>
            ) : (
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} align="end" style={{paddingLeft: '0'}}>
                <NavLink to={`/formularios/${unFormulario._id}`} className={globalClasses.navlink}>
                  <Box pr={{xs: 3, sm: 0}}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={`${globalClasses.estilosBoton} ${globalClasses.degradeVerde}`}
                    >
                      Editar
                    </Button>
                  </Box>
                </NavLink>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    );
  }
};

export default VistaPrevia;
