import { File } from "./types";
import { Rank } from "./types";

export default class Position {
    constructor (
        private file: File,
        private rank: Rank
    ) {}

    public getFile(): File{
        return this.file;
    }

    public getRank(): Rank{
        return this.rank;
    }
}