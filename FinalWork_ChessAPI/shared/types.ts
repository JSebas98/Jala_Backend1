import { Piece } from '../entity/piece';

export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Color = 'Black' | 'White';
export type GameStatus = 'Ready to start' | 'Playing' | 'Check' | 'Checkmate';
export type PieceStatus = 'playing' | 'taken';
export type PieceType = 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn';
export type GamePieces = {
    'White': Piece[],
    'Black': Piece[]
}