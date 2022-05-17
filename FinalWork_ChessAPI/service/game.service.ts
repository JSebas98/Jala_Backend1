import "reflect-metadata";
import { IBoardService } from './IBoardService';
import { inject, injectable } from 'inversify';
import { IGameService } from './IGameService';
import { DITypes } from '../shared/inversify.types';
import { Game } from '../entity/game';
import { Player } from '../entity/player';
import { File, Rank, GameStatus, Color } from '../shared/types';
import { Board } from '../entity/board';
import { Piece } from '../entity/piece';
import { Message } from '../entity/message';

@injectable()
export class GameService implements IGameService {

    private currentGame!: Game;

    constructor(@inject(DITypes.IBoardService) private boardService: IBoardService){}

    createNewGame(): Game {
        const player1: Player = new Player(1, 'White');
        const player2: Player = new Player(2, 'Black');
        this.currentGame = new Game(1, [player1, player2], this.boardService.initBoard());
        return this.currentGame;
    }

    getCurrentGame(): Game {
        return this.currentGame;
    }

    restartGame(): Game {
        this.currentGame.setBoard(this.boardService.initBoard());
        this.currentGame.setMove(0);
        this.currentGame.setTurn('White');

        return this.currentGame;
    }

    updateGameStatus(): void {
        if (this.currentGame.getStatus() === 'Ready to start' && this.currentGame.getMove() > 0) {
            this.currentGame.setStatus('Playing');
        }
    }

    isWhiteTurn(): boolean {
        return this.currentGame.getTurn() === 'White';
    }

    isBlackTurn(): boolean {
        return this.currentGame.getTurn() === 'Black';
    }

    updateTurn(move: number): void {
        if (move % 2 === 0) {
            this.currentGame.setTurn('White');
        } else {
            this.currentGame.setTurn('Black');
        }
    }

    movePiece(initialFile: File, initialRank: Rank, targetFile: File, targetRank: Rank): Game | Message {
        // Get piece in initial square.
        const piece: Piece | undefined = this.boardService.getPiece(initialFile, initialRank);

        if (piece) {
            if (this.isWhiteTurn() && piece.getColor() === 'White' ||
                this.isBlackTurn() && piece.getColor() === 'Black') {

                const response: Board | string = this.boardService.movePiece(piece, targetFile, targetRank);
                // Move could not be made.
                if (typeof response === 'string') {
                    return new Message(response);
                } else { // Move has been done.
                    const currentMove: number = this.currentGame.getMove();
                    this.currentGame.setBoard(response);
                    this.currentGame.setMove(currentMove+ 1);
                    this.updateTurn(currentMove+ 1);
                    this.updateGameStatus();
                    return this.currentGame;
                }
            } else {
                return new Message("Move cannot be made. It is the other player's turn.");
            }
        } else {
            return new Message("Current square is empty. Try again at another square.");
        }
    }
}