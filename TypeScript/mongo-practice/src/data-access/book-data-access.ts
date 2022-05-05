import BookSchema from '../entity/book';
import { Book } from '../entity/bookModel';
export default class BookDataAccess {

    async save(bookToSave: Book) {
        try {
            const bookSchema = new BookSchema(bookToSave);
            return await bookSchema.save();
        } catch (error) {
            console.log(error);
        }
    }
}