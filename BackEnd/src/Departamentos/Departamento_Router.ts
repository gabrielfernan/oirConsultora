import {Router} from 'express';
const router = Router();

const {} = require('./Departamento_Controller');

router.get('/listar');
router.post('/crear');
router.post('/obtener');
router.put('/modificar');
router.delete('/eliminar');

module.exports = router;
