import {Router} from 'express';
const router = Router();

const {agregar} = require('./Suscribirse_Controller');

router.post('/agregar', agregar);

module.exports = router;
