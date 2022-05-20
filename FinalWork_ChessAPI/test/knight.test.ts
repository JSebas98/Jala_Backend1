import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Knight } from '../entity/knight';
import { PieceService } from '../service/piece.service';
import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { Message } from '../entity/message';
import { Game } from '../entity/game';

const knight: Knight = new Knight('Knight', 'White', 'E', 4);

const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const message: Message = new Message('Invalid move. Try again with another Target square.');

describe('Test Knigh moves', () =>{

    it('Should move two places up and one left', () => {
        let square = new Square('D', 6);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places up and one right', () => {
        let square = new Square('F', 6);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places down and one left', () => {
        let square = new Square('D', 2);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places down and one right', () => {
        let square = new Square('F', 2);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places left and one up', () => {
        let square = new Square('C', 5);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places right and one up', () => {
        let square = new Square('G', 5);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places left and one down', () => {
        let square = new Square('C', 3);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should move two places right and one down', () => {
        let square = new Square('G', 3);
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should not move vertically up', () => {
        let square = new Square('E', 6);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move vertically down', () => {
        let square = new Square('E', 2);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally right', () => {
        let square = new Square('G', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move horizontally left', () => {
        let square = new Square('C', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally left', () => {
        let square = new Square('D', 5);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move diagonally right', () => {
        let square = new Square('F', 3);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move to its current position', () => {
        let square = new Square('E', 4);
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should not move to a square occupied by a piece of its color', () => {
        let square = new Square('G', 5, new Pawn('Pawn', 'White', 'G', 5));
        expect(knight.canMoveTo(square)).toBe(false);
    });

    it('Should move to a square occupied by the adversary', () => {
        let square = new Square('G', 5, new Pawn('Pawn', 'Black', 'G', 5));
        expect(knight.canMoveTo(square)).toBe(true);
    });

    it('Should capture a piece of the adversary', () => {
        gameService.createNewGame();
        gameService.movePiece('G', 1, 'F', 3);
        gameService.movePiece('E', 7, 'E', 6);
        gameService.movePiece('F', 3, 'G', 5);
        gameService.movePiece('F', 7, 'F', 6);
        expect(gameService.movePiece('G', 5, 'E', 6)).toBeInstanceOf(Game);
    });
});