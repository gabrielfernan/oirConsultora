import {Router} from 'express';
const router = Router();
import Validaciones from '../Config/validaciones';
const Certificados = new Validaciones();

const {
  AltaFormulario,
  ListarFormularios,
  EliminarFormulario,
  ModificarFormulario,
  ObtenerFormulario,
  ConfigurarFormulario,
  ObtenerFormularioParaVotacion,
} = require('./Formulario_Controller');

router.get('/listar', Certificados.ValidarTokenComun, ListarFormularios);
router.post('/alta', Certificados.ValidarTokenComun, AltaFormulario);

router.post('/obtener', Certificados.ValidarTokenComun, ObtenerFormulario);
router.put('/modificar', Certificados.ValidarTokenComun, ModificarFormulario);
router.put('/configurar', Certificados.ValidarTokenComun, ConfigurarFormulario);

router.delete('/eliminar', Certificados.ValidarTokenComun, EliminarFormulario);
router.post('/obtenerParaVotacion', ObtenerFormularioParaVotacion);

module.exports = router;
