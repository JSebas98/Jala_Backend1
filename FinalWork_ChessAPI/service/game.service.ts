import { IBoardService } from './IBoardService';
import { inject, injectable } from 'inversify';
import { IGameService } from './IGameService';
import { DITypes } from '../shared/inversify.types';
import { Game } from '../entity/game';
import { Player } from '../entity/player';
import { Square } from '../entity/square';
import { File, Rank } from '../shared/types';
import { Board } from '../entity/board';

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
        return this.currentGame;
    }

    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Game | string {
        let response: Board | string = this.boardService.movePiece(initialFile, initialRank, goalFile, goalRank); 
        if (typeof response === 'string') {
            return response;
        } else {
            this.currentGame.setBoard(response);
            return this.currentGame;
        }
    }
}