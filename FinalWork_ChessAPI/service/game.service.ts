import { IBoardService } from './IBoardService';
import { inject, injectable } from 'inversify';
import { IGameService } from './IGameService';
import { DITypes } from '../shared/inversify.types';
import { Game } from '../entity/game';
import { Player } from '../entity/player';
import { File, Rank, GameStatus } from '../shared/types';
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

        return this.currentGame;
    }

    updateGameStatus(): void {
        if (this.currentGame.getStatus() === 'Ready to start' && this.currentGame.getMove() > 0) {
            this.currentGame.setStatus('Playing');
        }
    }

    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Game | Message {
        // Get piece in initial square to check color.
        let piece: Piece | undefined = this.boardService.getPiece(initialFile, initialRank);
        let currentMove: number = this.currentGame.getMove();

        if (piece) {
            // If move is even and piece to be moved is white, try to move piece OR
            // If move is odd and piece to be moved is black, try to move piece
            if ((currentMove % 2 === 0 && piece.getColor() === 'White') ||
            (currentMove % 2 !== 0 && piece.getColor() === 'Black')) {
                let response: Board | string = this.boardService.movePiece(initialFile, initialRank, goalFile, goalRank); 
                // Move could not be made.
                if (typeof response === 'string') {
                    return new Message(response);
                } else { // Move has been done.
                    this.currentGame.setBoard(response);
                    this.currentGame.setMove(currentMove + 1);
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