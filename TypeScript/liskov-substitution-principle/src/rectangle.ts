import { IQuadrilateral } from './quadrilateral';
export default class Rectangle implements IQuadrilateral {

    constructor(public length: number, public width: number) {

    }

    calculateArea(): number {
        return this.length * this.width;
    }

}
