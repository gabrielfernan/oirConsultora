import {model, Schema, Document} from 'mongoose';

export interface ISuscripto extends Document {
  email: string;
}

const SuscriptoSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
});

export default model<ISuscripto>('suscripto', SuscriptoSchema);
