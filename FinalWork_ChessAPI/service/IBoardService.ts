import { Board } from '../entity/board';
import { Piece } from '../entity/piece';
import { File, Rank } from '../shared/types';
import { Message } from '../entity/message';
import { Square } from '../entity/square';

export interface IBoardService {
    
    initBoard(): Board;
    getPiece(file: File, rank: Rank): Piece | undefined;
    getSquare(file: File, rank: Rank): Square;
    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Board | string;

}