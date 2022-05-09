import { Board } from '../entity/board';
import { Square } from '../entity/square';
import { File, Rank } from '../shared/types';

export interface IBoardService {
    
    initBoard(): Board;
    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Board | string;

}