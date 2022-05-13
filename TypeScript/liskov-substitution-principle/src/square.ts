
import { IQuadrilateral } from './quadrilateral';

export default class Square implements IQuadrilateral {

    constructor(public width: number) {

    }

    calculateArea(): number {
        return this.width * this.width;
    }

}
