export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Color = 'Black' | 'White'
export type GameStatus = 'ready' | 'playing' | 'draw' | 'white-victory' | 'black-victory';
export type PieceStatus = 'playing' | 'taken';
export type PieceName = 'W_King' | 'W_Queen' | 'W_Bishop_L' | 'W_Bishop_R' | 'W_Knight_L' |
'W_Knight_R' | 'W_Rook_L' | 'W_Rook_R' | 'W_Pawn_1' | 'W_Pawn_2' | 'W_Pawn_3' | 'W_Pawn_4' |
'W_Pawn_5' | 'W_Pawn_6' | 'W_Pawn_7' | 'W_Pawn_8' | 'B_King' | 'B_Queen' | 'B_Bishop_L' |
'B_Bishop_R' | 'B_Knight_L' | 'B_Knight_R' | 'B_Rook_L' | 'B_Rook_R' | 'B_Pawn_1' | 'B_Pawn_2' |
'B_Pawn_3' | 'B_Pawn_4' | 'B_Pawn_5' | 'B_Pawn_6' | 'B_Pawn_7' | 'B_Pawn_8';