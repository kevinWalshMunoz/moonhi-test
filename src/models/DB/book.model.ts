import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: number;
}

const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true }
});

const BookModel: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);
export { IBook, BookModel };