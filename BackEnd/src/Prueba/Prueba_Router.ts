import {Router} from 'express';
const router = Router();

const {Listar, Crear, Obtener, Modificar, Eliminar} = require('./Prueba_Controller');

router.get('/listar', Listar);
router.post('/crear', Crear);
router.post('/obtener', Obtener);
router.put('/modificar', Modificar);
router.delete('/eliminar', Eliminar);

module.exports = router;
