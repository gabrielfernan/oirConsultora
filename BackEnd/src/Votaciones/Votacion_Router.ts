import {Router} from 'express';
const router = Router();
import Validaciones from '../Config/validaciones';

const Certificados = new Validaciones();

const {CargarVotacionDeFormulario, ListarVotacionesDeFormulario} = require('./Votacion_Controller');

router.post('/cargar', CargarVotacionDeFormulario);
router.post('/listar', Certificados.ValidarTokenComun, ListarVotacionesDeFormulario);

module.exports = router;
