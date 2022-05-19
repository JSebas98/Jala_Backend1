import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Knight } from '../entity/knight';

const knight: Knight = new Knight('Knight', 'White', 'E', 4);

describe('Test Knigh moves', () =>{

    it('Should move two places up and one left', () => {
        let square = new Square('D', 6);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places up and one right', () => {
        let square = new Square('F', 6);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places down and one left', () => {
        let square = new Square('D', 2);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places down and one right', () => {
        let square = new Square('F', 2);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places left and one up', () => {
        let square = new Square('C', 5);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places right and one up', () => {
        let square = new Square('G', 5);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places left and one down', () => {
        let square = new Square('C', 3);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places right and one down', () => {
        let square = new Square('G', 3);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should not move vertically up', () => {
        let square = new Square('E', 6);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move vertically down', () => {
        let square = new Square('E', 2);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally right', () => {
        let square = new Square('G', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally left', () => {
        let square = new Square('C', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally left', () => {
        let square = new Square('D', 5);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally right', () => {
        let square = new Square('F', 3);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move to its current position', () => {
        let square = new Square('E', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move to a square occupied by a piece of its color', () => {
        let square = new Square('G', 5, new Pawn('Pawn', 'White', 'G', 5));
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should move to a square occupied by the adversary', () => {
        let square = new Square('G', 5, new Pawn('Pawn', 'Black', 'G', 5));
        expect(knight.canMoveTo(square)).toBe(true);
    });
});