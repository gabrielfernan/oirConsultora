import {combineReducers} from 'redux';
import ReducerFormularios from './Formularios/ReducerFormularios';
import ReducerUsuarios from './Usuarios/ReducerUsuarios';
import ReducerReportes from './Reportes/ReducerReportes';

const RootReducers = combineReducers({
  ReducerUsuarios,
  ReducerFormularios,
  ReducerReportes,
});
export default RootReducers;
