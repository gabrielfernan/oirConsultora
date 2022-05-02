import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Compartir from '../components/formularios/Compartir';
import EditarFormularjo from '../components/formularios/EditarFormularjo';
import NuevoFormulario from '../components/formularios/NuevoFormulario';
import VistaPrevia from '../components/formularios/VistaPrevia';
import Votacion from '../components/formularios/Votacion';
import Home from '../components/home/Home';
import Reportes from '../components/reportes/Reportes';
import ListadoUsuarios from '../components/usuario/ListadoUsuarios';
import NuevoUsuario from '../components/usuario/NuevoUsuario';
import Perfil from '../components/usuario/Perfil';
import Usuario from '../components/usuario/Usuario';
import ControlConfigurarFormulario from '../components/formularios/ControlConfigurarFormulario';
import {listado} from '../Redux/Formularios/AccionesFormularios';
const RutasPrivadas = ({usuario}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listado({usuarioId: usuario.id, rol: usuario.rol}));
  }, [dispatch, usuario]);
  switch (usuario.rol) {
    case 1:
      return (
        <Switch>
          <Route path="/" render={props => <Home {...props} usuario={usuario} />} exact />
          <Route path="/perfil" render={props => <Perfil {...props} usuario={usuario} />} exact />
          <Route path="/formularios/nuevo" component={NuevoFormulario} exact />
          <Route path="/formularios/:id" component={EditarFormularjo} exact />
          <Route path="/vistaprevia/:id" component={VistaPrevia} exact />
          <Route path="/compartir/:id" component={Compartir} exact />
          <Route path="/configurar/:id" component={ControlConfigurarFormulario} exact />
          <Route path="/usuarios" component={ListadoUsuarios} exact />
          <Route path="/usuarios/nuevo" component={NuevoUsuario} exact />
          <Route path="/usuarios/:id" component={Usuario} exact />
          <Route path="/reportes/:id" component={Reportes} exact />
          <Route path="/votacion/:id" component={Votacion} exact />

          <Route exact path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      );

    case 2:
      return (
        <Switch>
          <Route path="/" render={props => <Home {...props} usuario={usuario} />} exact />
          <Route path="/formularios/nuevo" component={NuevoFormulario} exact />
          <Route path="/perfil" render={props => <Perfil {...props} usuario={usuario} />} exact />

          <Route path="/formularios/:id" component={EditarFormularjo} exact />
          <Route path="/vistaprevia/:id" component={VistaPrevia} exact />
          <Route exact path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      );

    case 3:
      return (
        <Switch>
          <Route path="/" render={props => <Home {...props} usuario={usuario} />} exact />
          <Route path="/reportes/:id" component={Reportes} exact />
          <Route path="/perfil" render={props => <Perfil {...props} usuario={usuario} />} exact />
          <Route exact path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      );

    default:
      return (
        <Switch>
          <Redirect to="/" />
        </Switch>
      );
  }
};

export default RutasPrivadas;
