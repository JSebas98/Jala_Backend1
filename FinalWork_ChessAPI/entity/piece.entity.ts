import { Color, File, PieceName, PieceStatus, Rank } from "../src/types";
import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "pieces"} })
export class Piece {
    
    @PrimaryColumn()
    name!: PieceName;
    
    @Column()
    color!: Color;

    @Column()
    file!: File;

    @Column()
    rank!: Rank;

    @Column()
    status!: PieceStatus;
}