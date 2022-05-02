import {model, Schema, Document} from 'mongoose';

// Para poder acceder de manera externa a las propiedades del modelo se realiza una interfaz
export interface IPrueba extends Document {
  clave: string;
  valor: string;
}

// Esquema para la colección (tabla) de la base de datos
const PruebaSchema = new Schema({
  clave: {type: String},
  valor: {type: String},
});

// Exportamos el esquema como modelo para poder enviar los datos a la base de datos
export default model<IPrueba>('pruebas', PruebaSchema);
