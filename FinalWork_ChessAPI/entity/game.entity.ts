import { Column, Entity, PrimaryColumn } from "typeorm";
import { GameStatus } from '../src/types';
import { Board } from './board.entity';
import { Player } from "./player.entity";

@Entity()
export class Game {

    @PrimaryColumn()
    id!: number;

    @Column()
    board!: Board;

    @Column()
    players!: Player[];

    @Column()
    status!: GameStatus;
}