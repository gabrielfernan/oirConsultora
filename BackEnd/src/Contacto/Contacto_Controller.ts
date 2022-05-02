import {Request, Response} from 'express';
import {enviarMailContactanos} from '../Config/SendMail';
import ContactoModel, {IContacto} from './Contacto_Model';
import {envioMail} from '../Config/gestionMail';
const enviarMail = new envioMail();

exports.enviarEmail = (req: Request, res: Response) => {
  try {
    if (req.body.email) {
      if (req.body.mensaje) {
        const nuevoContacto: IContacto = new ContactoModel(req.body);
        nuevoContacto
          .save()
          .then((doc: any) => {
            if (doc) {
              res.status(200).send({message: 'Contacto registrado'});
              // // enviarMailContactanos(req.body.email, req.body.mensaje)
              // //   .then(() => {
              //     res.status(200).send({message: 'Email enviado'});
              //   })
              //   .catch(error => {
              //     console.error(error);
              //     res.status(500).send({message: 'Error interno en el servidor,no se envio mail'});
              //   });
            } else {
              console.log(doc);
              res.status(500).send({message: 'Error interno del servidor'});
            }
          })
          .catch((error: any) => {
            console.log(error);
            res.status(500).send({message: 'Error interno del servidor'});
          });
      } else {
        res.status(400).send({message: 'No se ingreso un mensaje'});
      }
    } else {
      res.status(400).send({message: 'No se ingreso email'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno en el servidor'});
  }
};
