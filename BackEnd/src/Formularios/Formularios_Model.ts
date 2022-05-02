import {model, Schema, Document} from 'mongoose';

export interface IFormulario extends Document {
  titulo: string;
  subtitulo: string;
  logo: {
    value: string;
    width: string;
    height: string;
  };
  condicion: string;
  valorCondicion: string;
  componentes: [{}];
  usuarioId: string;
  lugarDatosEncuestado: string;
  estado: string;
  publicado: boolean;
  cantidadDeVotos: number;
}

const FormularioSchema = new Schema({
  titulo: {type: String},
  subtitulo: {type: String},
  logo: {
    value: {type: String},
    width: {type: String},
    height: {type: String},
  },
  ambito: {type: String},
  condicion: {type: String},
  valorCondicion: {type: String},
  lugarDatosEncuestado: {type: String},
  estado: {type: String},
  cantidadDeVotos: {
    type: Number,
    default: 0,
  },
  publicado: {type: Boolean, default: false},
  componentes: [
    {
      type: Object,
    },
  ],
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
  },
});

export default model<IFormulario>('formularios', FormularioSchema);
