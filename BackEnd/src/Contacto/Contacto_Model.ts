import {model, Schema, Document} from 'mongoose';

export interface IContacto extends Document {
  email: string;
}

const ContactoSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    require: true,
  },
});

export default model<IContacto>('contactos', ContactoSchema);
