import King from "../src/king";
import Position from "../src/position";

const king = new King('White', 'E', 1)

// King tests
it('Should move one place forward', () =>{
    let position = new Position('E', 2);
    expect(king.canMove(position)).toBe(true);
});

it('Shouldn\'t move to its current place', () =>{
    let position = new Position('E', 1);
    expect(king.canMove(position)).toBe(false);
});

it('Should move one place to the left', () =>{
    let position = new Position('D', 1);
    expect(king.canMove(position)).toBe(true);
});

it('Shouldn\'t move two places forward', () =>{
    let position = new Position('E', 3);
    expect(king.canMove(position)).toBe(false);
});