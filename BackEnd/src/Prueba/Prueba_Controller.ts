import PruebaModel, {IPrueba} from './Prueba_Model';
import {Request, Response} from 'express';

exports.Listar = (req: Request, res: Response) => {
  try {
    PruebaModel.find({}).then((docs: IPrueba[]) => {
      if (docs.length) {
        res.status(200).json(docs);
      } else {
        res.status(400).send({message: 'No hay datos para mostrar'});
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.Crear = (req: Request, res: Response) => {
  try {
    let datosBody = req.body;
    if (!datosBody) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      const nuevoDato: IPrueba = new PruebaModel(datosBody);

      nuevoDato
        .save()
        .then((resultado: any) => {
          if (resultado) {
            res.status(200).send({message: 'Datos insertados'});
          } else {
            console.error(resultado);
            res.status(500).send({message: 'Ocurrió un error al insertar los datos'});
          }
        })
        .catch((error: any) => {
          console.error(error);
          res.status(500).send({message: ''});
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.Obtener = (req: Request, res: Response) => {
  try {
    if (!req.body.clave) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      // Si lo que enviamos por request es clave primaria en la bd, podemos buscar directamente con findById(id), sino con find({campo:valor})
      PruebaModel.find({clave: req.body.clave}).then((doc: IPrueba[]) => {
        if (doc.length) {
          res.status(200).send({message: 'Dato encontrado', datoEncontrado: doc[0]});
        } else {
          res.status(400).send({message: 'No hay datos para mostrar'});
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.Modificar = (req: Request, res: Response) => {
  try {
    if (!req.body.clave) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      PruebaModel.find({clave: req.body.clave}).then((doc: IPrueba[]) => {
        if (doc.length) {
          // En mongoose para actualizar se usa tambien la funcion save() previamente asignando al objeto devuelto de la base de datos el nuevo valor enviado en la request
          doc[0].valor = req.body.nuevoValor;

          doc[0].save().then((resultado: any) => {
            if (resultado) {
              res.status(200).send({message: 'Dato actualizado', datoActualizado: resultado});
            } else {
              console.error(resultado);
              res.status(500).send({message: 'Ocurrió un error al actualizar el dato'});
            }
          });
        } else {
          res.status(400).send({message: 'No hay datos para mostrar'});
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.Eliminar = (req: Request, res: Response) => {
  try {
    if (!req.body.clave) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      PruebaModel.findOneAndDelete({clave: req.body.clave}).then((doc: any) => {
        if (doc) {
          res.status(200).send({message: 'Dato eliminado'});
        } else {
          res.status(400).send({message: 'Dato no encontrado'});
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};
