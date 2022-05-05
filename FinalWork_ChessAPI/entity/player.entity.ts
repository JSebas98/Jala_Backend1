import { Column, PrimaryColumn } from 'typeorm';
import { Color } from '../src/types';

export class Player {
    
    @PrimaryColumn()
    id!: number;

    @Column()
    piecesColor!: Color;
}