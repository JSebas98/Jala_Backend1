import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Rook } from '../entity/rook';
import { PieceService } from '../service/piece.service';
import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { Game } from '../entity/game';
import { Message } from '../entity/message';

const rook: Rook = new Rook('Bishop', 'Black', 'D', 4);
const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const game: Game = gameService.createNewGame();
const message: Message = new Message('Invalid move. Try again with another Target square.');

describe('Test Rook moves', () =>{

    // it('Should move up', () => {
    //     let square = new Square('D', 8);
    //     expect(rook.canMoveTo(square)).toBe(true);
    // });

    // it('Should move down', () => {
    //     let square = new Square('D', 1);
    //     expect(rook.canMoveTo(square)).toBe(true);
    // });

    // it('Should move left', () => {
    //     let square = new Square('A', 4);
    //     expect(rook.canMoveTo(square)).toBe(true);
    // });

    // it('Should move right', () => {
    //     let square = new Square('H', 4);
    //     expect(rook.canMoveTo(square)).toBe(true);
    // });

    // it('Should not move diagonally up left', () => {
    //     let square = new Square('C', 5);
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move diagonally up right', () => {
    //     let square = new Square('E', 5);
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move diagonally down left', () => {
    //     let square = new Square('C', 3);
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move diagonally down right', () => {
    //     let square = new Square('E', 3);
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move to its current position', () => {
    //     let square = new Square('D', 4);
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move to an occupied square', () => {
    //     let square = new Square('D', 5, new Pawn('Pawn', 'White', 'D', 5));
    //     expect(rook.canMoveTo(square)).toBe(false);
    // });

    it('Should not move if there is any piece blocking its way', () => {
        expect(gameService.movePiece('A', 1, 'A', 4)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        expect(gameService.movePiece('H', 1, 'H', 4)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('A', 2, 'A', 4);
        gameService.movePiece('A', 7, 'A', 6);
        gameService.movePiece('B', 2, 'B', 3);
        gameService.movePiece('B', 7, 'B', 6);
        gameService.movePiece('A', 1, 'A', 3);
        gameService.movePiece('C', 7, 'C', 6);
        expect(gameService.movePiece('A', 3, 'D', 3)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('H', 2, 'H', 4);
        gameService.movePiece('H', 7, 'H', 6);
        gameService.movePiece('G', 2, 'G', 3);
        gameService.movePiece('B', 7, 'B', 6);
        gameService.movePiece('H', 1, 'H', 3);
        gameService.movePiece('C', 7, 'C', 6);
        expect(gameService.movePiece('H', 3, 'D', 3)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('A', 8, 'A', 5)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('H', 8, 'H', 5)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('A', 2, 'A', 3);
        gameService.movePiece('A', 7, 'A', 5);
        gameService.movePiece('B', 2, 'B', 3);
        gameService.movePiece('B', 7, 'B', 6);
        gameService.movePiece('C', 2, 'C', 3);
        gameService.movePiece('A', 8, 'A', 6);
        gameService.movePiece('D', 2, 'D', 3);
        expect(gameService.movePiece('A', 6, 'D', 6)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.movePiece('A', 2, 'A', 3);
        gameService.movePiece('H', 7, 'H', 5);
        gameService.movePiece('B', 2, 'B', 3);
        gameService.movePiece('G', 7, 'G', 6);
        gameService.movePiece('C', 2, 'C', 3);
        gameService.movePiece('H', 8, 'H', 6);
        gameService.movePiece('D', 2, 'D', 3);
        expect(gameService.movePiece('H', 6, 'D', 6)).toStrictEqual(message);
    });
});