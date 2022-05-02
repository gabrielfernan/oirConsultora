import {Request, Response} from 'express';
import {enviarMailContactanos} from '../Config/SendMail';
import SuscriptoModel, {ISuscripto} from './Suscribirse_Model';
import {envioMail} from '../Config/gestionMail';
const enviarMail = new envioMail();

exports.agregar = (req: Request, res: Response) => {
  try {
    if (req.body.email) {
      SuscriptoModel.find({email: req.body.email})
        .then((suscriptor: any) => {
          if (suscriptor.length) {
            res.status(200).send({message: 'Este email ya se encuentra suscripto'});
          } else {
            const nuevoSuscriptor = new SuscriptoModel({email: req.body.email});
            nuevoSuscriptor
              .save()
              .then(() => {
                enviarMail.enviarMailUsuario(req.body.email, 'suscripcion');
                res.status(200).send({message: 'Email suscripto'});
              })
              .catch((error: any) => {
                console.log(error);
                res.status(500).send({message: 'Error interno en el servidor'});
              });
          }
        })
        .catch((error: any) => {
          console.error(error);
          res.status(500).send({message: 'Error interno en el servidor'});
        });
    } else {
      res.status(400).send({message: 'No se ingreso email'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno en el servidor'});
  }
};
