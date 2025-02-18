import mongoose, { Schema, Document, Model } from 'mongoose';

interface ILog extends Document {
  operation: string;
  number1: number;
  number2: number;
  result: number;
  timestamp: Date;
  responseTime: number;
}

const logSchema: Schema = new Schema({
  operation: { type: String, required: true },
  number1: { type: Number, required: true },
  number2: { type: Number, required: true },
  result: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
  responseTime: { type: Number, required: true }
});

const LogModel: Model<ILog> = mongoose.model<ILog>('Logs', logSchema);
export { ILog, LogModel };
