import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Queen } from '../entity/queen';
import { PieceService } from '../service/piece.service';
import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { Game } from '../entity/game';
import { Message } from '../entity/message';

const queen: Queen = new Queen('Queen', 'Black', 'D', 4);
const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const message: Message = new Message('Invalid move. Try again with another Target square.');

describe('Test Queen moves', () =>{

    // it('Should move up', () => {
    //     let square = new Square('D', 8);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move down', () => {
    //     let square = new Square('D', 1);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move left', () => {
    //     let square = new Square('A', 4);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move right', () => {
    //     let square = new Square('H', 4);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move diagonally up left', () => {
    //     let square = new Square('A', 7);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move diagonally up right', () => {
    //     let square = new Square('H', 8);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move diagonally down left', () => {
    //     let square = new Square('A', 1);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should move diagonally down right', () => {
    //     let square = new Square('G', 1);
    //     expect(queen.canMoveTo(square)).toBe(true);
    // });

    // it('Should not move to its current position', () => {
    //     let square = new Square('D', 4);
    //     expect(queen.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move to an occupied square', () => {
    //     let square = new Square('D', 5, new Pawn('Pawn', 'White', 'D', 5));
    //     expect(queen.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move other than vertically, horizontally, and diagonally', () => {
    //     let square = new Square('E', 7);
    //     expect(queen.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move in L', () => {
    //     let square = new Square('C', 6);
    //     expect(queen.canMoveTo(square)).toBe(false);
    // });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        expect(gameService.movePiece('D', 1, 'D', 4)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        expect(gameService.movePiece('D', 1, 'A', 4)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        expect(gameService.movePiece('D', 1, 'H', 5)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('D', 8, 'D', 5)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('D', 8, 'A', 5)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('D', 8, 'H', 4)).toStrictEqual(message);
    });
});