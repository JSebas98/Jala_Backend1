import Rectangle from "./rectangle";
import Square from "./square";
import { IQuadrilateral } from './quadrilateral';

let rectangle: IQuadrilateral = new Rectangle(10, 6);

console.log(rectangle.calculateArea());

test(rectangle);

function test(rectangle: IQuadrilateral): void {
    // rectangle.width = 5;
    // rectangle.length = 4;

    // if(rectangle.calculateArea() != 20) {
    //     console.log('Error!');
    // }
}