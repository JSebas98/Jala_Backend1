import Bishop from '../src/Entities/bishop';
import Position from '../src/position';

const bishop = new Bishop('Black', 'D', 4);

describe('Test Bishop moves', () =>{

    it('Should move right diagonal up', () => {
        let position = new Position('H', 8);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should move right diagonal down', () => {
        let position = new Position('G', 1);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should move left diagonal up', () => {
        let position = new Position('A', 7);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should move left diagonal down', () => {
        let position = new Position('A', 1);
        expect(bishop.canMove(position)).toBe(true);
    });

    it('Should not move vertically up', () => {
        let position = new Position('D', 8);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move vertically down', () => {
        let position = new Position('D', 1);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move horizontally right', () => {
        let position = new Position('H', 4);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move horizontally left', () => {
        let position = new Position('A', 4);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move other than diagonally', () => {
        let position = new Position('E', 7);
        expect(bishop.canMove(position)).toBe(false);
    });

    it('Should not move other than diagonally', () => {
        let position = new Position('A', 3);
        expect(bishop.canMove(position)).toBe(false);
    });
});
