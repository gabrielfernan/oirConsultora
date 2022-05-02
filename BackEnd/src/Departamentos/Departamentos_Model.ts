import {model, Schema, Document} from 'mongoose';

export interface IDepartamento extends Document {
  valor: number;
  etiqueta: string;
}

const DepartamentosSchema = new Schema({
  valor: {type: Number},
  etiqueta: {type: String},
});

export default model<IDepartamento>('departamentos', DepartamentosSchema);
