import { ChildEntity } from "typeorm";
import { Piece } from './piece.entity';

@ChildEntity()
export class Bishop extends Piece {

}