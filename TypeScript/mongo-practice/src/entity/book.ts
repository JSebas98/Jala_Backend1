import { model, Schema } from "mongoose";
import { IBook } from "./IBook";

const bookSchema = new Schema<IBook>({
    author: { type: String, required: true },
    title: { type: String, default: 'No title' },
    date: { type: Date, default: Date.now },
});

export const BookModel = model<IBook>('Book', bookSchema);