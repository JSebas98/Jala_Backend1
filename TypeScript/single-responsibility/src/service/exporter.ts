import { IExporter } from './IExporter';

export class Exporter implements IExporter {
    
    constructor() {}
    
    saveTo(format: string): void {
        switch(format){
            case 'png':
                console.log('Saving to png...');
                break;
            case 'pdf':
                console.log('Saving to pdf...');
                break;
            default:
                console.log('Format not supported. Try again.');
                break;
        }
    }

}