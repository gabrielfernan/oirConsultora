import {Router} from 'express';
const router = Router();

const {enviarEmail} = require('./Contacto_Controller');

router.post('/enviar', enviarEmail);

module.exports = router;
