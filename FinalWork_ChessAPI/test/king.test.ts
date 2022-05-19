import { King } from "../entity/king";
import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { PieceService } from "../service/piece.service";
import { BoardService } from "../service/board.service";
import { GameService } from "../service/game.service";
import { Message } from "../entity/message";

const king = new King('King', 'White', 'E', 2);
const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const message: Message = new Message('Invalid move. Try again with another Target square.');

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
    
    it('Should not move to its current place', () =>{
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
    
    it('Should not move two places forward', () =>{
        let square = new Square('E', 4);
        expect(king.canMoveTo(square)).toBe(false);
    });

    it('Should not move one place forward, two places left', () =>{
        let square = new Square('C', 3);
        expect(king.canMoveTo(square)).toBe(false);
    });

    it('White king should not move if target square is attacked by adversary', () =>{
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        gameService.movePiece('B', 7, 'B', 6);
        gameService.movePiece('F', 2, 'F', 3);
        gameService.movePiece('C', 8, 'A', 6);
        expect(gameService.movePiece('E', 1, 'E', 2)).toStrictEqual(message);
    });

    it('Black king should not move if target square is attacked by adversary', () =>{
        gameService.createNewGame();
        gameService.movePiece('B', 2, 'B', 3);
        gameService.movePiece('E', 7, 'E', 6);
        gameService.movePiece('C', 1, 'A', 3);
        expect(gameService.movePiece('E', 8, 'E', 7)).toStrictEqual(message);
    });

})
