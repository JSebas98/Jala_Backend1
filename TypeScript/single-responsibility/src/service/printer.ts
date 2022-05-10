import { IPrinter } from './IPrinter';

export class Printer implements IPrinter {
    
    constructor() {}
    
    printTo(medium: string): void {
        switch(medium) {
            case 'paper':
                console.log('Printing on paper...');
                break;
            case 'console':
                console.log('Printing on console...');
                break;
            default:
                console.log('Medium not available. Try again.');
                break;
        }
    }

}