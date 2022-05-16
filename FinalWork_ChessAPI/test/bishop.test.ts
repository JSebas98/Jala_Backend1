import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Bishop } from '../entity/bishop';

const bishop: Bishop = new Bishop('Bishop', 'Black', 'D', 4);

describe('Test Bishop moves', () =>{

    it('Should move right diagonal up', () => {
        let square = new Square('H', 8);
        expect(bishop.canMoveTo(square)).toBe(true);
    });

    it('Should move right diagonal down', () => {
        let square = new Square('G', 1);
        expect(bishop.canMoveTo(square)).toBe(true);
    });

    it('Should move left diagonal up', () => {
        let square = new Square('A', 7);
        expect(bishop.canMoveTo(square)).toBe(true);
    });

    it('Should move left diagonal down', () => {
        let square = new Square('A', 1);
        expect(bishop.canMoveTo(square)).toBe(true);
    });

    it('Should not move vertically up', () => {
        let square = new Square('D', 8);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move vertically down', () => {
        let square = new Square('D', 1);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally right', () => {
        let square = new Square('H', 4);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally left', () => {
        let square = new Square('A', 4);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move other than diagonally', () => {
        let square = new Square('E', 7);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move other than diagonally', () => {
        let square = new Square('A', 3);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move to its current position', () => {
        let square = new Square('D', 4);
        expect(bishop.canMoveTo(square)).toBe(false);
    });

    it('Should not move to an occupied square', () => {
        let square = new Square('E', 5, new Pawn('Pawn', 'White', 'E', 5));
        expect(bishop.canMoveTo(square)).toBe(false);
    });
});