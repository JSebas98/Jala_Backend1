import { FileMapper } from '../shared/file.mapper';
import { Color, Rank, File, PieceType } from '../shared/types';
import { Square } from './square';

export abstract class Piece {

    constructor(private readonly pieceType: PieceType,
                private readonly color: Color,
                private file: File,
                private rank: Rank) {}

    abstract canMoveTo(targetSquare: Square): boolean;

    canMoveDiagonally(targetSquare: Square): boolean {
        return Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) ===
                Math.abs(targetSquare.getRank() - this.getRank());
    }

    canMoveOnePlaceAround(targetSquare: Square): boolean {
        return Math.abs(targetSquare.getRank() - this.getRank()) <= 1 &&
                Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) <=1;
    }

    canMoveInLShape(targetSquare: Square): boolean {
        const canMoveVerticalJump: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 1 &&
                                            Math.abs(targetSquare.getRank() - this.getRank()) === 2;
        
        const canMoveHorizontalJump: boolean = Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 2 &&
                                                Math.abs(targetSquare.getRank() - this.getRank()) === 1;
        
        return canMoveHorizontalJump || canMoveVerticalJump;
    }

    canMoveVertically(targetSquare: Square): boolean {
        return Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) === 0 &&
                Math.abs(targetSquare.getRank() - this.getRank()) > 0;
    }

    canMoveHorizontally(targetSquare: Square): boolean {
        return Math.abs(targetSquare.getRank() - this.getRank()) === 0 &&
                Math.abs(FileMapper[targetSquare.getFile()] - FileMapper[this.getFile()]) > 0;
    }

    isTargetSquareCurrentSquare(targetSquare: Square): boolean {
        return targetSquare.getFile() === this.file &&
                targetSquare.getRank() === this.rank;
    }

    moveTo(file: File, rank: Rank) {
        this.file = file;
        this.rank = rank;
    }

    getColor(): Color {
        return this.color;
    }

    getFile(): File {
        return this.file;
    }

    getRank(): Rank {
        return this.rank;
    }

    setFile(file: File): void {
        this.file = file;
    }

    setRank(rank: Rank): void {
        this.rank = rank;
    }

    getType(): PieceType {
        return this.pieceType;
    }
}