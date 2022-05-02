import {Toolbar, Container, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useSelector} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Barramenu from './components/barramenu/Barramenu';
import Votacion from './components/formularios/Votacion';
// import Votacion from './components/formularios/Votacion';
import Login from './components/login/Login';
import useGlobalStyles from './app/estilos/cssglobal';
import imagenFondo from './Static/Img/semicirculorotado90.png';
import RutasPrivadas from './Rutas/RutasPrivadas';
import circleIzq from './Static/Img/CIRCULOIZQUIERDOLOGIN.svg';
import circleDer from './Static/Img/CIRCULODERECHOLOGIN.svg';
import './App.css';

///////// Seguimiento de #Deploy ////////////
console.log('Dep17 - 30-11-21');
////////////////////////////////////////////

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 15,
    paddingTop: 7,
    paddingBottom: 31,
    paddingLeft: 31,
    paddingRight: 31,
    background: 'white',
    boxShadow: '0px 10px 15px 0px rgba(0,0,0,0.2)',
  },
  circleLeftSectionLogin: {
    width: 200,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  circleRightSectionLogin: {
    width: 200,
    height: 250,
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'start',
  },
}));

function App() {
  const {usuario} = useSelector(state => state.ReducerUsuarios);
  const classes = useStyles();
  const globalClasees = useGlobalStyles();
  return (
    <div className="App">
      <div className="container-Imagenes" style={{display: `${usuario ? 'flex' : 'none'}`}}>
        <img alt="" src={imagenFondo} className={`imagenIzquierda noMostrarImagen`}></img>
        <img alt="" src={imagenFondo} className={`imagenFondoDerecha noMostrarImagen`}></img>
      </div>
      {usuario ? (
        <BrowserRouter>
          <Barramenu usuario={usuario} />
          <Toolbar />
          <Container maxWidth="md" className={`${classes.container} posicionContainerPrincipal`}>
            <RutasPrivadas usuario={usuario} />
          </Container>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Switch>
            <Box className="container-sectionLogin">
              <Box className="containerImagnes-Login">
                <div className={classes.circleLeftSectionLogin}>
                  <img alt="" src={circleIzq} className="circleSectionLogin"></img>
                </div>
                <div className={classes.circleRightSectionLogin}>
                  <img alt="" src={circleDer} className="circleSectionLogin"></img>
                </div>
                <Route path="/votacion/:id" component={Votacion} exact />
              </Box>
              <div className={`${globalClasees.degradeVerde} containerCard-Login`}>
                <Route path="/" component={Login} exact />
              </div>
            </Box>
            <Route exact path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
