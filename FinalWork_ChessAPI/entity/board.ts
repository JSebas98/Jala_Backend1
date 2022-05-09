import { File, Rank } from '../shared/types';
import { Square } from './square';
import { FileMapper } from '../shared/file.mapper';

export class Board {
    
    constructor(private squares: Square[]){}

    setSquares(squares: Square[]): void {
        this.squares = squares;
    }

    getSquares(): Square[] {
        return this.squares;
    }

    findIndexSquare(file: File, rank: Rank): number {
        return FileMapper[file] + ((rank-1) * 8);
    }
}