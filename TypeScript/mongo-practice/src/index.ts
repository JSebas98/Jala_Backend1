import { DbConnection } from "./db-connection";
import { GridFS } from './data-access/grid-fs';
import BookDataAccess from "./data-access/book-data-access";
import { Book } from "./entity/bookModel";

class Test {
    async configureDb(){
        let dbConnection = new DbConnection();
        await dbConnection.connect();

        // Testing
        let bookDatAccess = new BookDataAccess();

        let book = new Book();
        book.author = 'test1';
        book.date = new Date();
        book.title = 'design patterns';

        let createdBook = await bookDatAccess.save(book);

        let readedBook = await bookDatAccess.read(createdBook.id);

        if (readedBook) {

            readedBook.title = 'UPDATED';

            await bookDatAccess.update(readedBook._id, readedBook);

            console.log(readedBook);
            
            await bookDatAccess.remove(readedBook._id);
        }


        //const gridFS = new GridFS();
        //await gridFS.upload('helloWorld.txt');

        //await gridFS.download('helloWorld.txt');

        //optional
        await dbConnection.disconnect();
        
    }
}

new Test().configureDb();