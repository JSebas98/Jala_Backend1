import { Column } from "typeorm";
import { Square } from './square.entity';

export class Board {
    
    @Column()
    squares!: Square[];

}