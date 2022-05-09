import { Game } from "../entity/game";
import { Square } from "../entity/square";
import { File, Rank } from "../shared/types";

export interface IGameService {
    
    createNewGame(): Game;
    restartGame(): Game;
    getCurrentGame(): Game;
    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Game;

}