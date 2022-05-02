import UsuarioModel, {IUsuario} from './Usuarios_Model';
import {Request, Response} from 'express';
import Validaciones from '../Config/validaciones';
import {binaryToBase64, comprimir, descomprimir} from '../Config/comprimirArchivo';
// import responder from '../Config/responder';
import fs from 'fs';
import path from 'path';

const Certificados = new Validaciones();

exports.ObtenerUsuarios = (req: Request, res: Response) => {
  try {
    UsuarioModel.find({})
      .then((usuarios: any[]) => {
        if (usuarios.length) {
          res.status(200).send(usuarios);
        } else {
          res.status(404).send({message: 'No hay datos para mostrar'});
        }
      })
      .catch((error: any) => {
        console.error(error);

        res.status(500).send({message: 'Error interno del servidor'});
      });
  } catch (error) {
    console.error(error);

    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.Login = (req: Request, res: Response) => {
  try {
    if (!req.body.password) {
      res.status(400).send({message: 'Falta password'});
    } else {
      if (req.body.usuario) {
        UsuarioModel.findOne({usuario: req.body.usuario})
          .then((doc: any) => {
            if (doc) {
              let contraseñaCorrecta = Certificados.CompararHash(req.body.password, doc.password);
              if (contraseñaCorrecta) {
                var token = Certificados.GenerarToken({
                  _id: doc._id,
                  nombre: doc.nombre,
                  apellido: doc.apellido,
                  usuario: doc.usuario,
                  email: doc.email,
                  rol: doc.rol,
                });

                res.status(200).send(token);
              } else {
                res.status(400).send({message: 'Clave incorrecta'});
              }
            } else {
              res.status(400).send({message: 'Usuario no encontrado'});
            }
          })
          .catch((error: any) => {
            throw error;
          });
      } else {
        res.status(400).send({message: 'Falta usuario'});
      }
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.AltaUsuario = (req: Request, res: Response) => {
  try {
    if (!req.body.usuario) {
      res.status(400).send({message: 'No se ingreso usuario'});
    } else {
      UsuarioModel.findOne({usuario: req.body.usuario})
        .then((usuario: any) => {
          if (usuario) {
            res.status(400).send({message: 'Ya existe este usuario'});
          } else {
            const contraseñaCifrada = Certificados.GenerarHash(req.body.password);
            req.body.password = contraseñaCifrada;
            const newUsuario: IUsuario = new UsuarioModel({
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              usuario: req.body.usuario,
              password: req.body.password,
              email: req.body.email,
              rol: req.body.rol,
              foto: {
                nombre: '',
                nombreComprimido: '',
                fileBase64: '',
                tamanio: 0,
                tipo: '',
                id: '',
              },
            });
            newUsuario
              .save()
              .then((ususarioNuevo: IUsuario) => {
                // const obj: Object = {
                //   nombre: ususarioNuevo.nombre,
                //   apellido: ususarioNuevo.apellido,
                //   usuario: ususarioNuevo.usuario,
                //   password: ususarioNuevo.password,
                //   email: ususarioNuevo.email,
                //   rol: ususarioNuevo.rol,
                //   foto: ususarioNuevo.foto,
                //   _id: ususarioNuevo._id,
                // };

                res.status(200).send({
                  nombre: ususarioNuevo.nombre,
                  apellido: ususarioNuevo.apellido,
                  usuario: ususarioNuevo.usuario,
                  password: ususarioNuevo.password,
                  email: ususarioNuevo.email,
                  rol: ususarioNuevo.rol,
                  foto: ususarioNuevo.foto,
                  _id: ususarioNuevo._id,
                });
              })
              .catch((error: any) => {
                console.log(error);

                res.status(500).send({message: 'Error interno del servidor'});
              });
          }
        })
        .catch((error: any) => {
          console.log(error);

          res.status(500).send({message: 'Error interno del servidor'});
        });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.ActualizarUsuario = (req: Request, res: Response) => {
  try {
    if (!req.body._id) {
      res.status(400).send({message: 'No se ingreso id de usuario'});
    } else {
      UsuarioModel.findById(req.body._id)
        .then((usuario: any) => {
          if (!usuario) {
            res.status(400).send({message: 'No se encontro el usuario'});
          } else {
            if (usuario.usuario !== req.body.usuario || usuario.email !== req.body.email) {
              UsuarioModel.findOne({
                $or: [{usuario: req.body.usuario}, {email: req.body.email}],
              })
                .then((usuarioDuplicado: any) => {
                  if (usuarioDuplicado && !usuarioDuplicado._id.equals(usuario._id)) {
                    res.status(400).send({
                      message: 'Ya existe un usuario con ese nombre de usuario o email',
                    });
                  } else {
                    var NuevaContraseña;
                    if (!Certificados.CompararHash(req.body.password, usuario.password)) {
                      NuevaContraseña = Certificados.GenerarHash(req.body.password);
                    }
                    UsuarioModel.updateOne(
                      {_id: usuario._id},
                      {
                        $set: {
                          nombre: req.body.nombre,
                          apellido: req.body.apellido,
                          usuario: req.body.usuario,
                          password: NuevaContraseña ? NuevaContraseña : usuario.password,
                          email: req.body.email,
                          rol: req.body.rol,
                          // foto: req.body.foto,
                        },
                      }
                    )
                      .then((doc: any) => {
                        if (doc) {
                          if (req.body.miPerfil) {
                            var token = Certificados.GenerarToken({
                              nombre: req.body.nombre,
                              apellido: req.body.apellido,
                              usuario: req.body.usuario,
                              email: req.body.email,
                              rol: req.body.rol,
                              // foto: req.body.foto,
                              _id: req.body._id,
                            });

                            res.status(200).send(token);
                          } else {
                            res.status(200).send({
                              nombre: req.body.nombre,
                              apellido: req.body.apellido,
                              usuario: req.body.usuario,
                              rol: req.body.rol,
                              // foto: req.body.foto,
                              _id: req.body._id,
                            });
                          }
                        } else {
                          res.status(500).send({
                            message: 'No se pudo actualizar el usuario',
                          });
                        }
                      })
                      .catch((error: any) => {
                        console.log(error);

                        res.status(500).send({message: 'Error interno del servidor'});
                      });
                  }
                })
                .catch((error: any) => {
                  console.log(error);

                  res.status(500).send({message: 'Error interno del servidor'});
                });
            } else {
              var NuevaContraseña;

              if (!Certificados.CompararHash(req.body.password, usuario.password)) {
                const contraseñaCifrada = Certificados.GenerarHash(req.body.password);
                req.body.password = contraseñaCifrada;
              }
              UsuarioModel.updateOne(
                {_id: usuario._id},
                {
                  $set: {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    password: NuevaContraseña ? NuevaContraseña : usuario.password,
                    email: req.body.email,
                    rol: req.body.rol,
                    // foto: req.body.foto,
                  },
                }
              )
                .then((doc: any) => {
                  if (doc) {
                    if (req.body.miPerfil) {
                      var token = Certificados.GenerarToken({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        usuario: req.body.usuario,
                        email: req.body.email,
                        rol: req.body.rol,
                        // foto: req.body.foto,
                        _id: req.body._id,
                      });

                      res.status(200).send(token);
                    } else {
                      res.status(200).send({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        usuario: req.body.usuario,
                        email: req.body.email,
                        rol: req.body.rol,
                        // foto: req.body.foto,
                        _id: req.body._id,
                      });
                    }
                  } else {
                    res.status(500).send({message: 'No se pudo actualizar el usuario'});
                  }
                })
                .catch((error: any) => {
                  console.log(error);

                  res.status(500).send({message: 'Error interno del servidor'});
                });
            }
          }
        })
        .catch((error: any) => {
          console.log(error);
          res.status(500).send({message: 'Error interno del servidor'});
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.ObtenerUnUsuario = (req: Request, res: Response) => {
  try {
    if (!req.body._id) {
      res.status(400).send({message: 'No se ingreso id de usuario'});
    } else {
      UsuarioModel.findById(req.body._id)
        .then((usuario: any) => {
          if (usuario) {
            res.status(200).send({
              nombre: usuario.nombre,
              apellido: usuario.apellido,
              usuario: usuario.usuario,
              email: usuario.email,
              rol: usuario.rol,
              foto: usuario.foto,
              _id: usuario._id,
            });
          } else {
            res.status(404).send({message: 'No se encontro el usuario'});
          }
        })
        .catch(error => {
          console.error(error);
          res.status(500).send({message: 'Error interno del servidor'});
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.EliminarUsuario = (req: Request, res: Response) => {
  try {
    if (!req.body._id) {
      res.status(400).send({message: 'No se ingreso el id'});
    } else {
      UsuarioModel.findByIdAndDelete(req.body._id)
        .then((usuarioEliminado: any) => {
          if (usuarioEliminado) {
            res.status(200).send(usuarioEliminado._id);
          } else {
            res.status(404).send({message: 'El usuario no existe en la base de datos'});
          }
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

export const obtenerUsuarioPorId = (usuarioId: string) => {
  return UsuarioModel.findById(usuarioId);
};

// exports.CargarFotoPerfil = async (req: Request, res: Response) => {
//   try {
//     const datosBody: any = req.body;
//     let fileBase64: string = '';
//     let fileBinary: string = '';
//     if (datosBody) {
//       const usuario = await UsuarioModel.findById(datosBody.usuarioId, {password: 0});
//       if (usuario) {
//         if (!datosBody.archivos) {
//           res.status(400).send({message: 'No se ingresaron archivos.'});
//           // responder.error(req, res, 'No se ingresaron archivos.');
//         }

//         const resultadoComprimir = await comprimir(datosBody.archivos);
//         const archivoDescomprimidoEnBinario = await descomprimir(resultadoComprimir);
//         const arrayPropiedades = Object.values(archivoDescomprimidoEnBinario);
//         arrayPropiedades.forEach((item: any) => {
//           usuario.foto.nombre = item.name;
//           fileBinary = item._data;
//         });

//         fileBase64 = await binaryToBase64(fileBinary);

//         let file = datosBody.archivos.path.split('\\');
//         let extension = file[1].split('.')[1];

//         usuario.foto.nombreComprimido = resultadoComprimir.nombreArchivo;
//         usuario.foto.tamanio = datosBody.archivos.bytesRead;
//         usuario.foto.tipo = extension;
//         usuario.foto.fileBase64 = fileBase64;

//         const resultado = await usuario.save();
//         if (resultado) {
//           res.status(200).send({message: 'Foto cargada', value: resultado});
//         } else {
//           res.status(400).send({message: 'Ocurrió un error al intentar cargar la foto'});
//         }
//       } else {
//         res.status(400).send({message: 'El usuario ingresado no existe'});
//       }
//     } else {
//       res.status(400).send({message: 'No se ingresaron datos'});
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({message: 'Error interno del servidor'});
//   }
// };

const agregarFoto = (files: any, usuario: any) => {
  try {
    let retorno = {status: 0, dato: {}};
    let fileBinary: string = '';
    let fileBase64: string = '';
    const pr = new Promise(async (resolve: any, reject: any) => {
      const resultadoComprimir = await comprimir(files);
      const archivoDescomprimidoEnBinario = await descomprimir(resultadoComprimir);
      const arrayPropiedades = Object.values(archivoDescomprimidoEnBinario);
      arrayPropiedades.forEach((item: any) => {
        // usuario.foto.nombre = item.name;
        fileBinary = item._data;
      });

      fileBase64 = await binaryToBase64(fileBinary);

      let file: any;
      if (files.path.includes('\\')) {
        file = files.path.split('\\');
      } else {
        file = files.path.split('/');
      }

      let extension = file[1].split('.')[1];

      usuario.foto.nombreComprimido = resultadoComprimir.nombreArchivo;
      usuario.foto.tamanio = files.bytesRead;
      usuario.foto.tipo = extension;
      usuario.foto.fileBase64 = fileBase64;

      const resultado = await usuario.save();
      if (resultado) {
        retorno.status = 200;
        retorno.dato = resultado;
      } else {
        retorno.status = 500;
      }
      resolve(retorno);
    });
    return pr;
  } catch (error) {
    return new Promise((reject: any) => {
      console.log(error);
      reject(error);
    });
  }
};

const eliminarFoto = (archivoOld: string, files: any, usuario: any) => {
  try {
    const pr = new Promise(async (resolve: any, reject: any) => {
      const rutaArchivo = path.join(__dirname, '../../fotos', archivoOld);
      if (fs.existsSync(rutaArchivo)) {
        fs.unlinkSync(rutaArchivo);
      }

      usuario.foto.nombre = '';
      usuario.foto.nombreComprimido = '';
      usuario.foto.tamanio = 0;
      usuario.foto.tipo = '';
      usuario.foto.fileBase64 = '';

      const resultado = await usuario.save();
      if (resultado) {
        resolve(agregarFoto(files, usuario));
      } else {
        reject(new Error('Error al eliminar la foto de la BD'));
      }
    });

    return pr;
  } catch (error) {
    return new Promise((reject: any) => {
      reject(error);
    });
  }
};

exports.CargarFotoPerfil = async (req: Request, res: Response) => {
  try {
    const datosBody = req.body;

    if (!datosBody) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      const usuario: any = await UsuarioModel.findById(datosBody.usuarioId, {
        password: 0,
      });
      if (!usuario) {
        res.status(400).send({message: 'Usuario no encontrado'});
      }

      if (usuario.foto && usuario.foto.nombreComprimido) {
        const resultado: any = await eliminarFoto(
          usuario.foto.nombreComprimido,
          datosBody.archivos,
          usuario
        );

        if (resultado && resultado.status === 200) {
          res.status(200).send({message: 'Foto actualizada', value: resultado.dato});
        } else {
          console.log(resultado);
          res.status(500).send({message: 'Error al intentar actualizar la foto'});
        }
      } else {
        // No tiene foto, la agrego
        const respuesta: any = await agregarFoto(datosBody.archivos, usuario);

        if (respuesta && respuesta.status === 200) {
          res.status(200).send({message: 'Foto cargada', value: respuesta.dato});
        } else {
          console.log(respuesta);
          res.status(500).send({message: 'Error al intentar cargar la foto'});
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.ObtenerFotoPerfil = async (req: Request, res: Response) => {
  try {
    const datosBody = req.body;
    if (!datosBody) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      const usuario: any = await UsuarioModel.findById(datosBody.usuarioId, {
        password: 0,
      });
      if (!usuario) {
        res.status(400).send({message: 'El usuario ingresado no existe'});
      }

      if (usuario.foto && usuario.foto.nombreComprimido) {
        const rutaArchivo = path.join(__dirname, '../../fotos', usuario.foto.nombreComprimido);
        fs.readFile(rutaArchivo, (error: any, file: any) => {
          if (error) {
            console.log(error);
            res.status(500).send({message: 'Error al intentar recuperar el archivo'});
          } else {
            // const obj = {usuario: usuario, file: file};
            res.status(200).send({message: 'Archivo encontrado', value: usuario});
          }
        });
      } else {
        res.status(400).send({message: 'El usuario no posee foto de perfil'});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.EliminarFotoPerfil = async (req: Request, res: Response) => {
  try {
    const datosBody = req.body;
    if (!datosBody) {
      res.status(400).send({message: 'No se ingresaron datos'});
    } else {
      const usuario: any = await UsuarioModel.findById(datosBody.usuarioId, {
        password: 0,
      });

      if (!usuario) {
        res.status(400).send({message: 'Usuario no encontrado'});
      }

      if (usuario.foto && usuario.foto.nombreComprimido) {
        const rutaArchivo = path.join(__dirname, '../../fotos', usuario.foto.nombreComprimido);
        if (fs.existsSync(rutaArchivo)) {
          fs.unlinkSync(rutaArchivo);
        }

        usuario.foto.nombre = '';
        usuario.foto.nombreComprimido = '';
        usuario.foto.tamanio = 0;
        usuario.foto.tipo = '';
        usuario.foto.fileBase64 = '';

        const resultado = await usuario.save();
        if (resultado) {
          res.status(200).send({message: 'Foto de perfil eliminada'});
        } else {
          console.log(resultado);
          res.status(400).send({message: 'Error al intentar eliminar la foto de perfil'});
        }
      } else {
        res.status(400).send({message: 'El usuario no posee foto de perfil'});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};
