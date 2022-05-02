import {Request, Response} from 'express';
import path from 'path';
import {obtenerFormularioPorId} from '../Formularios/Formulario_Controller';
import VotacionModel, {IVotacion} from './Votacion_Model';
// import {enviarMailConfirmacion} from '../Config/SendMail';
import {envioMail} from '../Config/gestionMail';
const enviarMail = new envioMail();

exports.CargarVotacionDeFormulario = (req: Request, res: Response) => {
  try {
    if (!req.body.idFormulario) {
      res.status(400).send({message: 'Falta id de Formulario'});
    } else {
      const formularioDeVotacion = obtenerFormularioPorId(req.body.idFormulario);
      formularioDeVotacion
        .then((formulario: any) => {
          if (formulario) {
            VotacionModel.findOne({
              $and: [
                {idFormulario: formulario._id},
                {
                  $or: [
                    {keyDni: req.body.datosEncuestado.dni},
                    {keyEmail: req.body.datosEncuestado.email},
                  ],
                },
              ],
            })
              .then(votacionPorDniMail => {
                if (votacionPorDniMail) {
                  res.status(418).send({message: 'Dni o Email ya existente'});
                } else {
                  req.body.keyDni = req.body.datosEncuestado.dni;
                  req.body.keyEmail = req.body.datosEncuestado.email;

                  const nuevaVotacion: IVotacion = new VotacionModel(req.body);
                  nuevaVotacion
                    .save()
                    .then((doc: any) => {
                      if (doc) {
                        if (formulario.usuarioId && formulario.usuarioId.email) {
                          enviarMail.enviarMailUsuario(
                            formulario.usuarioId.email,
                            'confirmacionEncuesta'
                          );
                        }

                        formulario.cantidadDeVotos++;
                        //TODO:FALTA CONTROLAR QUE PASA SI LA VOTACION FUE GUARDADA PERO NO SE PUDO SUMAR LA CANTIDAD DE VOTOS AL FORMULARIO
                        formulario
                          .save()
                          .then(() => {
                            res.status(200).send({
                              message: 'Votacion cargada',
                              value: doc,
                            });
                          })
                          .catch((error: any) => {
                            console.log(error);
                            res.status(200).send({
                              message: 'Votacion cargada',
                              value: doc,
                            });
                          });

                        // enviarMailConfirmacion(
                        //   req.body.datosEncuestado.email,
                        //   req.body.datosEncuestado.nombre
                        // )
                        //   .then(() => {
                        //     res.status(200).send({message: 'Formulario insertado', formInsertado: doc});
                        //   })
                        //   .catch(() => {
                        //     console.log(doc);
                        //     res.status(200).send({message: 'Formulario insertado', formInsertado: doc});
                        //   });
                      } else {
                        res.status(500).send({message: 'Error al insertar el formulario'});
                      }
                    })
                    .catch((error: any) => {
                      console.log(error);
                      res.status(500).send({message: 'Error interno del servidor'});
                    });
                }
              })
              .catch();
          } else {
            res.status(400).send({
              message: 'No se encontro un formulario asociado a este id',
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
          res.status(500).send({message: 'Error interno del servidor'});
        });
    }
    // // let id = req.url.split('/');
    // // let idEncuesta = id[2];
    // // req.body.idEncuesta = idEncuesta;
    // req.body.keyDni = req.body.datosEncuestado.dni;
    // req.body.keyEmail = req.body.datosEncuestado.email;
    // let nuevoFormulario: IVotacion = new VotacionModel(req.body);
    // VotacionModel.findOne({
    //   $or: [{keyDni: nuevoFormulario.keyDni}, {keyEmail: nuevoFormulario.keyEmail}],
    // })
    //   .then((formBase: any) => {
    //     if (!formBase) {
    //       const nuevoForm: IVotacion = new VotacionModel(nuevoFormulario);
    //       nuevoForm
    //         .save()
    //         .then((doc: any) => {
    //           if (doc) {
    //             res.status(200).send({message: 'Votacion cargada', value: doc});
    //             // enviarMailConfirmacion(
    //             //   req.body.datosEncuestado.email,
    //             //   req.body.datosEncuestado.nombre
    //             // )
    //             //   .then(() => {
    //             //     res.status(200).send({message: 'Formulario insertado', formInsertado: doc});
    //             //   })
    //             //   .catch(() => {
    //             //     console.log(doc);
    //             //     res.status(200).send({message: 'Formulario insertado', formInsertado: doc});
    //             //   });
    //           } else {
    //             console.log(doc);
    //             res.status(500).send({message: 'Error al insertar el formulario'});
    //           }
    //         })
    //         .catch((error: any) => {
    //           console.log(error);
    //           res.status(500).send({message: 'Error interno del servidor'});
    //         });
    //     } else {
    //       res.status(418).send({message: 'Dni o Email ya existente'});
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     res.status(500).send({message: 'Error interno del servidor'});
    //   });
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.ListarVotacionesDeFormulario = (req: Request, res: Response) => {
  try {
    if (!req.body._id) {
      res.status(400).send({mesagge: 'Falta id de formulario'});
    } else {
      VotacionModel.find({idFormulario: req.body._id})
        .then((votaciones: any) => {
          res.status(200).send({value: votaciones});
        })
        .catch((error: any) => {
          console.error(error);
          res.status(500).send({message: 'Error interno del servidor'});
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};
