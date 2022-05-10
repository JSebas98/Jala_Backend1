import { Book } from "./entity/book";
import { Invoice } from './entity/invoice';

const book: Book = new Book('Clean Architecture', 'Robert C. Martin', 2017, 30.03, 'ABS47896');

const invoice: Invoice = new Invoice(book, 2, 1.78);

console.log(invoice.calculateTotal());

invoice.printInvoice('paper');
invoice.printInvoice('console');

invoice.saveToFile('png');
invoice.saveToFile('pdf');