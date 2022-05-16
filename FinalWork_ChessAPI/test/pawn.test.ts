import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';

const whitePawn = new Pawn('Pawn', 'White', 'E', 2);
const blackPawn = new Pawn('Pawn', 'Black', 'E', 7);

describe('Test Pawn moves', () => {
    
    it('White Pawn should move one place forward', () =>{
        let square = new Square('E', 3);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should move two places forward', () =>{
        let square = new Square('E', 4);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should move one place diagonally left', () =>{
        let square = new Square('D', 3);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should move one place diagonally right', () =>{
        let square = new Square('F', 3);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should not move more than two places forward', () =>{
        let square = new Square('E', 8);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move more than one place diagonally left', () =>{
        let square = new Square('A', 6);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move more than one place diagonally right', () =>{
        let square = new Square('H', 5);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });
    
    it('White Pawn should not move one place backward', () =>{
        let square = new Square('E', 1);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move in L', () =>{
        let square = new Square('F', 4);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move to its current position', () =>{
        let square = new Square('E', 2);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });
    
    it('White Pawn should not move to an occupied square', () =>{
        let square = new Square('E', 3, new Pawn('Pawn', 'White', 'E', 3));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should move one place forward', () =>{
        let square = new Square('E', 6);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should move two places forward', () =>{
        let square = new Square('E', 5);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should move one place diagonally left', () =>{
        let square = new Square('D', 6);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should move one place diagonally right', () =>{
        let square = new Square('F', 6);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should not move more than two places forward', () =>{
        let square = new Square('E', 1);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move more than one place diagonally left', () =>{
        let square = new Square('A', 3);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move more than one place diagonally right', () =>{
        let square = new Square('H', 4);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });
    
    it('Black Pawn should not move one place backward', () =>{
        let square = new Square('E', 8);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move in L', () =>{
        let square = new Square('D', 5);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move to its current position', () =>{
        let square = new Square('E', 7);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });
    
    it('Black Pawn should not move to an occupied square', () =>{
        let square = new Square('E', 6, new Pawn('Pawn', 'White', 'E', 6));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

})
