import {model, Schema, Document} from 'mongoose';

export interface ISexo extends Document {
  valor: number;
  etiqueta: string;
}

const SexoSchema = new Schema({
  valor: {type: Number},
  etiqueta: {type: String},
});

export default model<ISexo>('sexo', SexoSchema);
