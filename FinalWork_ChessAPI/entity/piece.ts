import { Color, Rank, File, PieceType } from '../shared/types';

export abstract class Piece {

    constructor(private readonly pieceType: PieceType,
                private readonly color: Color,
                private file: File,
                private rank: Rank) {}

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