import { King } from "../entity/king";
import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';

const king = new King('King', 'White', 'E', 2);

describe('Test King moves', () => {
    
    it('Should move one place forward', () =>{
        let square = new Square('E', 3);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place to the left', () =>{
        let square = new Square('D', 1);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place to the right', () =>{
        let square = new Square('F', 1);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place backward', () =>{
        let square = new Square('E', 1);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place diagonally to the upper left', () =>{
        let square = new Square('D', 3);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place diagonally to the upper right', () =>{
        let square = new Square('F', 3);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place diagonally to the down left', () =>{
        let square = new Square('D', 1);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Should move one place diagonally to the down right', () =>{
        let square = new Square('F', 1);
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Shouldn\'t move to its current place', () =>{
        let square = new Square('E', 2);
        expect(king.canMoveTo(square)).toBe(false);
    });
    
    it('Should not move to a square occupied by a piece of its color', () =>{
        let square = new Square('E', 3, new Pawn('Pawn', 'White', 'E', 3));
        expect(king.canMoveTo(square)).toBe(false);
    });
    
    it('Should move to a square occupied by the adversary', () =>{
        let square = new Square('E', 3, new Pawn('Pawn', 'Black', 'E', 3));
        expect(king.canMoveTo(square)).toBe(true);
    });
    
    it('Shouldn\'t move two places forward', () =>{
        let square = new Square('E', 4);
        expect(king.canMoveTo(square)).toBe(false);
    });

    it('Shouldn\'t move one place forward, two places left', () =>{
        let square = new Square('C', 3);
        expect(king.canMoveTo(square)).toBe(false);
    });
})
