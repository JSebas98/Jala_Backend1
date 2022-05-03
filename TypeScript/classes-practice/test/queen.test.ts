import Queen from "../src/queen";
import Position from '../src/position';

const queen = new Queen('White', 'D', 1);

describe('Test Queen movement', () => {

    it ('Should move vertically', () =>{
        let position = new Position('D', 8);
        expect(queen.canMove(position)).toBe(true);
    });

    it ('Should move horizontally', () =>{
        let position = new Position('A', 1);
        expect(queen.canMove(position)).toBe(true);
    });
    
    it ('Should move in right diagonal', () =>{
        let position = new Position('H', 5);
        expect(queen.canMove(position)).toBe(true);
    });

    it ('Should move in left diagonal', () =>{
        let position = new Position('A', 4);
        expect(queen.canMove(position)).toBe(true);
    });
    
    it ('Should not move in L', () =>{
        let position = new Position('C', 3);
        expect(queen.canMove(position)).toBe(false);
    });

    it ('Should not move in L 2', () =>{
        let position = new Position('E', 3);
        expect(queen.canMove(position)).toBe(false);
    });
    
    it ('Should not move other than vertically, horizontally, and diagonally', () =>{
        let position = new Position('C', 5);
        expect(queen.canMove(position)).toBe(false);
    });

    it ('Should not move other than vertically, horizontally, and diagonally 2', () =>{
        let position = new Position('F', 8);
        expect(queen.canMove(position)).toBe(false);
    });
});