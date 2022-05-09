import { Board } from './board';
import { Player } from './player';
import { Color } from '../shared/types';

export class Game {

    private move: number = 0;
    private turn: Color = 'White';

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

    getTurn(): Color {
        return this.turn;
    }

    setTurn(turn: Color): void {
        this.turn = turn;
    }
}