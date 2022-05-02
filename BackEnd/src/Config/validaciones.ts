const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
import {NextFunction, Request, Response} from 'express';
import {Rol} from './enumeradores';

export default class Certificados {
  GenerarHash = (clave: string) => {
    let datos = bcrypt.hashSync(clave, 5);
    return datos;
  };

  CompararHash = (Clave: string, ClaveCifrada: string) => {
    let result = bcrypt.compareSync(Clave, ClaveCifrada);
    return result;
  };

  GenerarToken = (datos: object) => {
    let token = jwt.sign(datos, process.env.TOKEN_SECRET);
    return token;
  };

  ValidarTokenComun = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err: string, decoded: string) => {
        if (err) {
          return res.status(403).json({message: 'TOKEN INVALIDO'});
        } else {
          next();
        }
      });
    } else {
      res.status(403).send({message: 'SIN TOKEN'});
    }
  };
  ValidarTokenAdministrador = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['access-token'];
    var datosToken = jwt.decode(token, {complete: true});
    if (token) {
      if (datosToken.payload) {
        if (datosToken.payload.rol === Rol.Administrador) {
          jwt.verify(token, process.env.TOKEN_SECRET, (err: string, decoded: string) => {
            if (err) {
              res.status(403).json({message: 'TOKEN INVALIDO'});
            } else {
              next();
            }
          });
        } else {
          res.status(401).json({message: 'NO TIENE PERMISOS DE ADMINISTRADOR'});
        }
      } else {
        res.status(403).json({message: 'TOKEN INVALIDO'});
      }
    } else {
      res.status(403).send({message: 'SIN TOKEN'});
    }
  };
}
