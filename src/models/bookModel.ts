import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  creator: string;
  createdAt: Date;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
