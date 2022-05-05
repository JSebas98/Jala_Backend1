import { Row, Column } from "../src/types";

export default class Position {
    constructor (
        private row: Row,
        private column: Column
    ) {}

    public getRow(): Row{
        return this.row;
    }

    public getColumn(): Column{
        return this.column;
    }
}