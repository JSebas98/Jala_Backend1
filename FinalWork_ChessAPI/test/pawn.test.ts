import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { PieceService } from '../service/piece.service';
import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { Game } from '../entity/game';
import { Message } from '../entity/message';

const whitePawn = new Pawn('Pawn', 'White', 'E', 2);
const blackPawn = new Pawn('Pawn', 'Black', 'E', 7);

const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const message: Message = new Message('Invalid move. Try again with another Target square.');

describe('Test Pawn moves', () => {
    
    it('White Pawn should move one place forward', () =>{
        let square = new Square('E', 3);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should move two places forward if it is first move', () =>{
        let square = new Square('E', 4);
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should not move two places forward if it is not first move', () =>{
        let movedPawn: Pawn = new Pawn('Pawn', 'White', 'E', 3);
        let square = new Square('E', 5);
        expect(movedPawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should move one place diagonally left if there is an adversary', () =>{
        let square = new Square('D', 3, new Pawn('Pawn', 'Black', 'D', 3));
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });

    it('White Pawn should move one place diagonally right if there is an adversary', () =>{
        let square = new Square('F', 3, new Pawn('Pawn', 'Black', 'F', 3));
        expect(whitePawn.canMoveTo(square)).toBe(true);
    });
    
    it('White Pawn should not move one place diagonally left if there is a white piece', () =>{
        let square = new Square('D', 3, new Pawn('Pawn', 'White', 'D', 3));
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move one place diagonally right if there is a white piece', () =>{
        let square = new Square('F', 3, new Pawn('Pawn', 'White', 'F', 3));
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move one place diagonally left if it is empty', () =>{
        let square = new Square('D', 3);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should move one place diagonally right if it is empty', () =>{
        let square = new Square('F', 3);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move more than two places forward', () =>{
        let square = new Square('E', 8);
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move more than one place diagonally left', () =>{
        let square = new Square('A', 6, new Pawn('Pawn', 'Black', 'A', 6));
        expect(whitePawn.canMoveTo(square)).toBe(false);
    });

    it('White Pawn should not move more than one place diagonally right', () =>{
        let square = new Square('H', 5, new Pawn('Pawn', 'Black', 'H', 5));
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
        let square = new Square('E', 3, new Pawn('Pawn', 'Black', 'E', 3));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('White should not move two places if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('F', 2, 'F', 3);
        gameService.movePiece('E', 7, 'E', 5);
        gameService.movePiece('F', 3, 'F', 4);
        gameService.movePiece('E', 5, 'E', 4);
        gameService.movePiece('F', 4, 'F', 5);
        gameService.movePiece('E', 4, 'E', 3);
        expect(gameService.movePiece('E', 2, 'E', 4)).toStrictEqual(message);
    });

    it('White should not move if its move puts his king in danger', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        gameService.movePiece('E', 7, 'E', 6);
        gameService.movePiece('D', 2, 'D', 3);
        gameService.movePiece('D', 8, 'H', 4);
        expect(gameService.movePiece('F', 2, 'F', 3)).toStrictEqual(message);
    });

    it('Black Pawn should move one place forward', () =>{
        let square = new Square('E', 6);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should move two places forward if it is first move', () =>{
        let square = new Square('E', 5);
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should not move two places forward if it is not first move', () =>{
        let movedPawn: Pawn = new Pawn('Pawn', 'Black', 'E', 6);
        let square = new Square('E', 4);
        expect(movedPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should move one place diagonally left if there is an adversary', () =>{
        let square = new Square('D', 6, new Pawn('Pawn', 'White', 'D', 6));
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });

    it('Black Pawn should move one place diagonally right if there is an adversary', () =>{
        let square = new Square('F', 6, new Pawn('Pawn', 'White', 'F', 6));
        expect(blackPawn.canMoveTo(square)).toBe(true);
    });
    
    it('Black Pawn should not move one place diagonally left if there is a black piece', () =>{
        let square = new Square('D', 6, new Pawn('Pawn', 'Black', 'D', 6));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move one place diagonally right if there is a black piece', () =>{
        let square = new Square('F', 6, new Pawn('Pawn', 'Black', 'F', 6));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move one place diagonally left if it is empty', () =>{
        let square = new Square('D', 6);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should move one place diagonally right if it is empty', () =>{
        let square = new Square('F', 6);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move more than two places forward', () =>{
        let square = new Square('E', 1);
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move more than one place diagonally left', () =>{
        let square = new Square('A', 3, new Pawn('Pawn', 'White', 'A', 3));
        expect(blackPawn.canMoveTo(square)).toBe(false);
    });

    it('Black Pawn should not move more than one place diagonally right', () =>{
        let square = new Square('H', 4, new Pawn('Pawn', 'White', 'H', 4));
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
    
    it('Black should not move two places if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 4);
        gameService.movePiece('F', 7, 'F', 6);
        gameService.movePiece('E', 4, 'E', 5);
        gameService.movePiece('F', 6, 'F', 5);
        gameService.movePiece('E', 5, 'E', 6);
        expect(gameService.movePiece('E', 7, 'E', 5)).toStrictEqual(message);
    });

    it('Black should not move if its move puts his king in danger', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        gameService.movePiece('E', 7, 'E', 6);
        gameService.movePiece('D', 1, 'H', 5);
        expect(gameService.movePiece('F', 7, 'F', 6)).toStrictEqual(message);
    });
})
