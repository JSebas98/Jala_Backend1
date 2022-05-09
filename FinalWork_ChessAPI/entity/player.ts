import { Color } from '../shared/types';

export class Player {

    constructor(private id: number,
                private color: Color) {}

    getId(): number {
        return this.id;
    }

    getColor(): Color {
        return this.color;
    }
}