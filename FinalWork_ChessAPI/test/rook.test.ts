import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Rook } from '../entity/rook';

const rook: Rook = new Rook('Bishop', 'Black', 'D', 4);

describe('Test Rook moves', () =>{

    it('Should move up', () => {
        let square = new Square('D', 8);
        expect(rook.canMoveTo(square)).toBe(true);
    });

    it('Should move down', () => {
        let square = new Square('D', 1);
        expect(rook.canMoveTo(square)).toBe(true);
    });

    it('Should move left', () => {
        let square = new Square('A', 4);
        expect(rook.canMoveTo(square)).toBe(true);
    });

    it('Should move right', () => {
        let square = new Square('H', 4);
        expect(rook.canMoveTo(square)).toBe(true);
    });

    it('Should not move diagonally up left', () => {
        let square = new Square('C', 5);
        expect(rook.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally up right', () => {
        let square = new Square('E', 5);
        expect(rook.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally down left', () => {
        let square = new Square('C', 3);
        expect(rook.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally down right', () => {
        let square = new Square('E', 3);
        expect(rook.canMoveTo(square)).toBe(false);
    });

    it('Should not move to its current position', () => {
        let square = new Square('D', 4);
        expect(rook.canMoveTo(square)).toBe(false);
    });

    it('Should not move to an occupied square', () => {
        let square = new Square('D', 5, new Pawn('Pawn', 'White', 'D', 5));
        expect(rook.canMoveTo(square)).toBe(false);
    });
});