import "reflect-metadata";
import { Board } from "../entity/board";
import { Rook } from "../entity/rook";
import { Square } from "../entity/square";
import { File, Rank, Color, GamePieces } from '../shared/types';
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
import { oppositeColor } from '../shared/oppositeColor.mapper';

@injectable()
export class BoardService implements IBoardService {
    
    private currentBoard!: Board;
    private capturedPieces: GamePieces = {
            'White': [],
            'Black': []
        };

    constructor(@inject(DITypes.IPieceService) private pieceService: IPieceService){}
    
    initBoard(): Board {
        const squares: Square[] = [];
        const CHAR_CODE_FOR_A = 65;

        for (let rank=1; rank<9; rank++) {
            for (let file=0; file<8; file++) {
                // Turning number into File type.
                let fileString: File = String.fromCharCode(CHAR_CODE_FOR_A+file) as File;
                squares.push(new Square(fileString, rank as Rank));        
            }
        }

        const colors: Color[] = ['White', 'Black'];
        const distOppositePieces = 56;
        const distOppositePawns = 40;

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

    emptyCapturedPieces(): void {
        this.capturedPieces = {
            'White': [],
            'Black': []
        }
    }

    getPiece(file: File, rank: Rank): Piece | undefined {
        const square: Square = this.getSquare(file, rank);
        return square.getPiece();
    }

    getSquare(file: File, rank: Rank): Square {
        const squares: Square[] = this.currentBoard.getSquares();

        return squares[this.currentBoard.findIndexSquare(file, rank)];
    }

    isMoveValid(piece: Piece, currentSquare: Square, targetSquare: Square): boolean {
        if (!this.doesMovePutKingOnCheck(currentSquare, targetSquare)) {
            return this.isSquareAvailable(piece, targetSquare);
        } else {
            return false;
        } 
    }

    movePiece(piece: Piece, targetFile: File, targetRank: Rank): Board | string {
        const currentSquare: Square = this.getSquare(piece.getFile(), piece.getRank());
        const targetSquare: Square = this.getSquare(targetFile, targetRank);

        if (this.isMoveValid(piece, currentSquare, targetSquare)) {
            if (targetSquare.isOccupiedByAdversary(piece.getColor())) {
                this.capturePiece(piece, targetSquare);
                return this.currentBoard;
            }

            currentSquare.removePiece();
            targetSquare.setPiece(piece);
            piece.moveTo(targetFile, targetRank);
            
            return this.currentBoard;
        } else {
            return "Invalid move. Try again with another Target square.";
        }
    }

    isSquareAvailable(piece: Piece, targetSquare: Square): boolean {
        const availableSquares: Square[] = this.pieceService.getPossibleMoves(piece, this.currentBoard);
        
        return availableSquares.includes(targetSquare);
    }

    getPlayingPieces(): GamePieces {
        const whitePieces: Piece[] = [];
        const blackPieces: Piece[] = [];

        this.currentBoard.getSquares().forEach((square) => {
            let piece: Piece | undefined = square.getPiece();
            if (piece?.getColor() === 'White') {
                whitePieces.push(piece);
            }
            if (piece?.getColor() === 'Black') {
                blackPieces.push(piece);
            }
        });

        let gamePieces: GamePieces = {
            'White': whitePieces,
            'Black': blackPieces
        };

        return gamePieces;
    }

    getKingSquare(color: Color): Square {
        const playingPieces: GamePieces = this.getPlayingPieces();
        const piecesToCheck: Piece[] = playingPieces[color];
        let king: Piece = piecesToCheck.filter((piece) => this.pieceService.isKing(piece))[0];
    
        return this.getSquare(king.getFile(), king.getRank());
    }

    getAttackedSquaresBy(color: Color): Square[] {
        const attackedSquares: Square[] = [];
        const playingPieces: GamePieces = this.getPlayingPieces();
        const piecesToCheck: Piece[] = playingPieces[color];

        piecesToCheck.forEach((piece) => {
            const possibleMoves: Square[] = this.pieceService.getPossibleMoves(piece, this.currentBoard); 
            possibleMoves.forEach((square) => {
                attackedSquares.push(square);
            })
        });

        return attackedSquares;
    }

    isKingOnCheck(kingSquare: Square, adversaryColor: Color): boolean {
        const attackedSquares: Square[] = this.getAttackedSquaresBy(adversaryColor);
        return attackedSquares.includes(kingSquare);
    }

    doesMovePutKingOnCheck(currentSquare: Square, targetSquare: Square): boolean {
        const piece: Piece | undefined = currentSquare.getPiece();
        
        if (piece) {
            if (this.isSquareAvailable(piece, targetSquare)) {
                const capturedPiece: Piece | undefined = targetSquare.removePiece();

                currentSquare.removePiece();
                targetSquare.setPiece(piece);
                piece.moveTo(targetSquare.getFile(), targetSquare.getRank());

                const kingSquare: Square = this.getKingSquare(piece.getColor());
                const isKingOnCheck: boolean = this.isKingOnCheck(kingSquare, oppositeColor[piece.getColor()]);
                
                targetSquare.removePiece();
                currentSquare.setPiece(piece);
                piece.moveTo(currentSquare.getFile(), currentSquare.getRank());
                
                if (capturedPiece) {
                    targetSquare.setPiece(capturedPiece);
                }                

                return isKingOnCheck;
            }
        }

        return false;
    }

    capturePiece(piece: Piece, targetSquare: Square): void {
        const currentSquare: Square = this.getSquare(piece.getFile(), piece.getRank());
        
        const capturedPiece: Piece | undefined = targetSquare.removePiece();
        currentSquare.removePiece();
        targetSquare.setPiece(piece);

        piece.moveTo(targetSquare.getFile(), targetSquare.getRank());

        this.updateCapturedPieces(capturedPiece!);
    }

    updateCapturedPieces(capturedPiece: Piece): void {
        if (capturedPiece.getColor() === 'White') {
            const whiteCapturedPieces: Piece[] = this.capturedPieces[capturedPiece.getColor()];
            whiteCapturedPieces.push(capturedPiece);
        }

        if (capturedPiece.getColor() === 'Black') {
            const blackCapturedPieces: Piece[] = this.capturedPieces[capturedPiece.getColor()];
            blackCapturedPieces.push(capturedPiece);
        }
    }

    getCapturedPieces(): GamePieces {
        return this.capturedPieces;
    }

}