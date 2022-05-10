import { Exporter } from "../service/exporter";
import { IExporter } from "../service/IExporter";
import { Book } from "./book";
import { IPrinter } from '../service/IPrinter';
import { Printer } from '../service/printer';

export class Invoice {
    
    public exporter: IExporter;
    public printer: IPrinter;
    
    constructor(
        public book: Book,
        public quantity: number,
        public tax: number) {
            this.exporter = new Exporter();
            this.printer = new Printer();
    }

    calculateTotal(): number {
        const total = this.book.price * this.quantity;
        return total + this.tax;
    }

    printInvoice(medium: string): void {
        this.printer.printTo(medium);
    }

    saveToFile(format: string): void {
        this.exporter.saveTo(format);    
    }
}