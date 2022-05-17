import "reflect-metadata";
import { Board } from "../entity/board";
import { Rook } from "../entity/rook";
import { Square } from "../entity/square";
import { File, Rank, Color } from '../shared/types';
import { Knight } from '../entity/knight';
import { Bishop } from '../entity/bishop';
import { Queen } from "../entity/queen";
import { King } from "../entity/king";
import { Pawn } from '../entity/pawn';
import { IBoardService } from './IBoardService';
import { inject, injectable } from "inversify";
import { Piece } from "../entity/piece";
import { DITypes } from "../shared/inversify.types";
import { IPieceService } from "./IPieceService";

@injectable()
export class BoardService implements IBoardService {
    
    private currentBoard!: Board;

    constructor(@inject(DITypes.IPieceService) private pieceService: IPieceService){}
    
    /**
     * Generates a new board with all the pieces in their initial squares.
     * @returns Board with all the pieces.
     */
    initBoard(): Board {
        // Creating board with 64 empty squares.
        const squares: Square[] = [];
        const CHAR_CODE_FOR_A = 65;

        for (let rank=1; rank<9; rank++) {
            for (let file=0; file<8; file++) {
                // Turning number into File type.
                let fileString: File = String.fromCharCode(CHAR_CODE_FOR_A+file) as File;
                squares.push(new Square(fileString, rank as Rank));        
            }
        }

        // Adding pieces in their initial position.
        // Adding Rook, Knight, Bishop, Queen, and King.
        const colors: Color[] = ['White', 'Black'];
        const distOppositePieces = 56; // # of squares between opposite color pieces at initial state.
        const distOppositePawns = 40; // # of squares between opposite color pawns at initial state.

        for(let c=0; c<2; c++) {
            let color = colors[c];

            let square = squares[(c*distOppositePieces)];
            square.setPiece(new Rook('Rook', color, square.getFile(), square.getRank()));
            
            square = squares[(c*distOppositePieces)+1]
            square.setPiece(new Knight('Knight', color, square.getFile(), square.getRank()));
            
            square = squares[(c*distOppositePieces)+2]
            square.setPiece(new Bishop('Bishop', color, square.getFile(), square.getRank()));

            square = squares[(c*distOppositePieces)+3]
            square.setPiece(new Queen('Queen', color, square.getFile(), square.getRank()));

            square = squares[(c*distOppositePieces)+4]
            square.setPiece(new King('King', color, square.getFile(), square.getRank()));

            square = squares[(c*distOppositePieces)+5]
            square.setPiece(new Bishop('Bishop', color, square.getFile(), square.getRank()));

            square = squares[(c*distOppositePieces)+6]
            square.setPiece(new Knight('Knight', color, square.getFile(), square.getRank()));

            square = squares[(c*distOppositePieces)+7]
            square.setPiece(new Rook('Rook', color, square.getFile(), square.getRank()));

            // Adding pawns
            let firstPositionPawn = (c*distOppositePawns)+8;
            let lastPositionPawn = firstPositionPawn+7;
            for(let p=firstPositionPawn; p<=lastPositionPawn; p++) {
                let square = squares[p];
                square.setPiece(new Pawn('Pawn', color, square.getFile(), square.getRank()));
            }
        }

        const initializedBoard = new Board(squares);
        this.currentBoard = initializedBoard;

        return initializedBoard;
    }

    getPiece(file: File, rank: Rank): Piece | undefined {
        const currentSquare: Square = this.getSquare(file, rank);
        
        return currentSquare.getPiece();
    }

    getSquare(file: File, rank: Rank): Square {
        // Get squares of current board.
        const squares: Square[] = this.currentBoard.getSquares();

        return squares[this.currentBoard.findIndexSquare(file, rank)];
    }

    isTargetSquareAvailable(targetSquare: Square, availableSquares: Square[]): boolean {
        const index: number = availableSquares.indexOf(targetSquare);
        if (index === -1) {
            return false;
        } else {
            return true;
        } 
    }

    movePiece(piece: Piece, targetFile: File, targetRank: Rank): Board | string {
        // Get current and goal squares.
        const currentSquare: Square = this.getSquare(piece.getFile(), piece.getRank());
        const targetSquare: Square = this.getSquare(targetFile, targetRank);
        const availableMoves: Square[] = this.pieceService.getPossibleMoves(piece, this.currentBoard);
        const pathToTarget: Square[] = this.pieceService.getPathToTargetSquare(piece, currentSquare, targetSquare, this.currentBoard);

        if (this.isTargetSquareAvailable(targetSquare, availableMoves) &&
            this.isPathToTargetFree(pathToTarget)) {
            currentSquare.removePiece();
            targetSquare.setPiece(piece);
            piece.moveTo(targetFile, targetRank);
            
            return this.currentBoard;
        } else {
            return "Invalid move. Try again with another Target square.";
        }
    }

    isPathToTargetFree(pathToTarget: Square[]): boolean {
        let isFree: boolean = true;
        pathToTarget.forEach((square) => {
            if (!square.isEmpty()) {
                isFree = false
            };
        });

        return isFree;
    }
}