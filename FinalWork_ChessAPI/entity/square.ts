import { File, Rank, Color } from '../shared/types';
import { Piece } from "./piece";

export class Square {
    
    private controlledByWhite: boolean = false;
    private controlledByBlack: boolean = false;

    constructor(private file: File,
                private rank: Rank,
                private piece?: Piece) {
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

    setControlledBy(color: Color): void {
        if(color === 'White') {
            this.controlledByWhite = true;
        }

        if(color === 'Black') {
            this.controlledByBlack = true;
        }
    }

    getControlledBy(): Color[] {
        let controlledBy: Color[] = [];
        
        if(this.controlledByBlack) {
            controlledBy.push('Black');
        }

        if(this.controlledByWhite) {
            controlledBy.push('White');
        }

        return controlledBy;
    }

    removeControlledBy(color: Color): void {
        if(color === 'White') {
            this.controlledByWhite = false;
        }

        if(color === 'Black') {
            this.controlledByBlack = false;
        }
    }
}