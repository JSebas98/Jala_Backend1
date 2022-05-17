import { Game } from "../entity/game";
import { File, Rank } from "../shared/types";
import { Message } from '../entity/message';

export interface IGameService {
    
    createNewGame(): Game;    
    getCurrentGame(): Game;
    restartGame(): Game;
    updateGameStatus(): void;
    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Game | Message;

}