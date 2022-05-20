import { Board } from './board';
import { Player } from './player';
import { GameStatus, Color, GamePieces } from '../shared/types';

export class Game {

    private move: number = 0;
    private status: GameStatus = 'Ready to start';
    private turn: Color = 'White';
    private capturedPieces: GamePieces = {
        'White': [],
        'Black': []
    };

    constructor(private id: number,
                private players: Player[],
                private board: Board){}

    getId(): number {
        return this.id;
    }

    getBoard(): Board {
        return this.board;
    }

    setBoard(board: Board): void {
        this.board = board;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getMove(): number {
        return this.move;
    }

    setMove(move: number): void {
        this.move = move;
    }

    getStatus(): GameStatus {
        return this.status;
    }

    setStatus(status: GameStatus): void {
        this.status = status;
    }

    getTurn(): Color {
        return this.turn;
    }

    setTurn(turn: Color): void {
        this.turn = turn;
    }

    getCapturedPieces(): GamePieces {
        return this.capturedPieces;
    }

    setCapturedPieces(capturedPieces: GamePieces): void {
        this.capturedPieces = capturedPieces;
    }
}