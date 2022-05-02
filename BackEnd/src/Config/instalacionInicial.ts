// INSTALACION DE LOS DATOS INICIALES EN LA BD
import RolModel, {IRol} from '../Rol/Rol_model';

import Usuario_Models, {IUsuario} from '../Usuarios/Usuarios_Model';
import Validaciones from '../Config/validaciones';

let inicializarRol = async () => {
  let administrador: IRol = new RolModel({
    nombreRol: 'Administrador',
    keyRol: 1,
  });
  await administrador.save();

  let prensa: IRol = new RolModel({
    nombreRol: 'Editor',
    keyRol: 2,
  });
  await prensa.save();

  let productor: IRol = new RolModel({
    nombreRol: 'Consultor',
    keyRol: 3,
  });
  await productor.save();
};

let inicializarUsuarios = async () => {
  const Certificados = new Validaciones();

  const administrador: IUsuario = new Usuario_Models({
    nombre: 'Administrador',
    apellido: 'Uno',
    usuario: 'Admin',
    email: 'administrador@oir.com',
    rol: 1,
  });
  administrador.password = Certificados.GenerarHash('0000');
  administrador.save().then(() => {
    console.log('Usuario Admin creado.');
  });

  const editor: IUsuario = new Usuario_Models({
    nombre: 'Editor',
    apellido: 'Uno',
    usuario: 'Editor',
    email: 'editor@oir.com',
    rol: 2,
  });
  editor.password = Certificados.GenerarHash('0000');
  editor.save().then(() => {
    console.log('Usuario Editor creado.');
  });

  const consultor: IUsuario = new Usuario_Models({
    nombre: 'Consultor',
    apellido: 'Uno',
    usuario: 'Consultor',
    email: 'consultor@oir.com',
    rol: 3,
  });
  consultor.password = Certificados.GenerarHash('0000');
  consultor.save().then(() => {
    console.log('Usuario Consultor creado.');
  });
};

export const instalarBD = async () => {
  try {
    console.log('instalacion en progreso');
    await inicializarRol();
    console.log('instalacion en progreso: 0%');
    await inicializarUsuarios();
    console.log('instalacion en progreso: 25%');
    return 'Instalacion finalizada';
  } catch (error) {
    console.log('Ocurrio un error: ' + error);
    return 'Ocurrio un error';
  }
};
