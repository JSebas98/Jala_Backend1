import { File, Rank } from "../shared/types";
import { Piece } from "./piece";

export class Square {
    
    constructor(private file: File, private rank: Rank, private piece?: Piece) {
    }

    getFile(): File{
        return this.file;
    }

    getRank(): Rank {
        return this.rank;
    }

    getPiece(): Piece | undefined {
        return this.piece;
    }

    setPiece(piece: Piece): void {
        this.piece = piece;
    }

    removePiece(): Piece | undefined {
        let removedPiece = this.piece;
        this.piece = undefined;

        return removedPiece;
    }

    isEmpty(): boolean {
        return this.piece === undefined;
    }
}