import { Column, Entity } from "typeorm";
import { Color } from "../src/types";

@Entity()
export class King {

    @Column()
    color!: Color;
}