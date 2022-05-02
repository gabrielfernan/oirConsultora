import {model, Schema, Document} from 'mongoose';

export interface IVotacion extends Document {
  datosEncuestado: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    departamento: string;
    sexo: string;
    edad: number;
    dni: number;
  };
  idFormulario: string;
  keyDni: number;
  keyEmail: number;
}

const FormularioSchema = new Schema(
  {
    datosEncuestado: {
      nombre: {type: String, require: true},
      apellido: {type: String, require: true},
      email: {type: String, require: true},
      telefono: {type: Number, require: true},
      departamento: {type: String, require: true},
      sexo: {type: String, require: true},
      edad: {type: Number, require: true},
      dni: {type: Number, require: true},
    },
    idFormulario: {
      type: Schema.Types.ObjectId,
      ref: 'formularios',
      required: true,
    },
    keyDni: {
      type: Number,
    },
    keyEmail: {
      type: String,
    },
  },
  {strict: false}
);

export default model<IVotacion>('votaciones', FormularioSchema);
