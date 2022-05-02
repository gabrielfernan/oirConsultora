import {Router} from 'express';
const router = Router();
import validaciones from '../Config/validaciones';
const Certificados = new validaciones();
const {
  Login,
  AltaUsuario,
  ActualizarUsuario,
  ObtenerUsuarios,
  ObtenerUnUsuario,
  EliminarUsuario,
  CargarFotoPerfil,
  EditarFotoPerfil,
  ObtenerFotoPerfil,
  EliminarFotoPerfil,
} = require('./Usuario_Controller');

router.get('/listar', Certificados.ValidarTokenAdministrador, ObtenerUsuarios);
router.post('/obtener', Certificados.ValidarTokenAdministrador, ObtenerUnUsuario);
router.post('/login', Login);
router.post('/alta', Certificados.ValidarTokenAdministrador, AltaUsuario);
router.put('/actualizar', Certificados.ValidarTokenAdministrador, ActualizarUsuario);
router.delete('/eliminar', Certificados.ValidarTokenAdministrador, EliminarUsuario);
router.post('/cargarFoto', CargarFotoPerfil);
router.post('/obtenerFoto', ObtenerFotoPerfil);
router.delete('/eliminarFoto', EliminarFotoPerfil);
// router.put('/editarFoto', EditarFotoPerfil);
// router.post('/cargarFoto', Certificados.ValidarTokenAdministrador, CargarFotoPerfil);
// router.put('/editarFoto', Certificados.ValidarTokenAdministrador, EditarFoto);

module.exports = router;
