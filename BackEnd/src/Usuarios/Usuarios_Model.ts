import {model, Schema, Document} from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
  email: string;
  rol: number;
  foto: {
    nombre: string;
    nombreComprimido: string;
    fileBase64: string;
    tamanio: number;
    tipo: string;
  };
}

const UsuarioSchema = new Schema({
  nombre: {type: String},
  apellido: {type: String},
  usuario: {type: String, unique: true},
  password: {type: String},
  email: {type: String, unique: true},
  rol: {type: Number},
  foto: {
    nombre: {type: String},
    nombreComprimido: String,
    fileBase64: String,
    tamanio: {type: Number},
    tipo: {type: String},
  },
});

export default model<IUsuario>('usuarios', UsuarioSchema);
