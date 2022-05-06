import { ChildEntity } from "typeorm";
import { Piece } from './piece.entity';

@ChildEntity()
export class King extends Piece {

}