import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors = require('cors');
import {Request, Response} from 'express';
import {instalarBD} from './src/Config/instalacionInicial';
import https from 'https';
import fs from 'fs';
import bd from './src/Config/mongoDB';
const formData = require('express-form-data');
setTimeout(() => {
  bd();
}, 5000);

const app = express();

const options = {
  uploadDir: 'fotos/',
  autoClean: true,
};

//inicializaciones
app.use(express.json());
app.use(cors());
app.use(formData.parse(options));
// app.use(formData.stream());
app.use(formData.union());

let version = 'Dep18 - 29-11-21';

app.listen(process.env.PORT, () => {
  console.log(`⚡️[oirbackend]: El servidor esta corriendo en el puerto ${process.env.PORT}`);
  console.log(version);
});

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      `<!DOCTYPE html><html lang="es"><body><h1>Servidor corriendo</h1> <br> <p> ${version} </p></body></html>`
    );
});
app.get('/instalar', (req: Request, res: Response) => {
  instalarBD()
    .then((respuesta: any) => {
      res.status(200).send(respuesta);
    })
    .catch((e: any) => {
      console.log(e);
      res.status(500).send('ocurrio un error');
    });
});

app.use('/prueba', require('./src/Prueba/Prueba_Router'));
app.use('/usuarios', require('./src/Usuarios/Usuario_Router'));
app.use('/departamentos', require('./src/Departamentos/Departamento_Router'));
app.use('/formularios', require('./src/Formularios/Formulario_Router'));
app.use('/sexo', require('./src/Sexo/Sexo_Router'));
app.use('/votacion', require('./src/Votaciones/Votacion_Router'));
app.use('/contacto', require('./src/Contacto/Contacto_Router'));
app.use('/suscribirse', require('./src/Suscribirse/Suscribirse_Router'));

app.get('*', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<!DOCTYPE html><html lang="es"><body><h1>404 - Página no encontrada</h1> </body></html>'
    );
});
