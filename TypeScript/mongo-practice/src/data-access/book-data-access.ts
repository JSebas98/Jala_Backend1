import { Types } from 'mongoose';
import { BookModel } from '../entity/book';
import { Book } from '../entity/bookModel';

export default class BookDataAccess {

    async save(bookToSave: Book) {
        const bookDoc = new BookModel(bookToSave);
        return await bookDoc.save();
    }

    async read(id: string) {
        return await BookModel.findById(id).lean();
    }

    async update(id: string | Types.ObjectId, bookToSave: Book) {
        return await BookModel
            .findByIdAndUpdate(id, bookToSave)
            .lean();
    }

    async remove(id: string | Types.ObjectId) {
        return await BookModel
            .findByIdAndRemove(id)
            .lean();
    }

}