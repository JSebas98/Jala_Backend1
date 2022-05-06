import { ChildEntity } from "typeorm";
import { Piece } from './piece.entity';

@ChildEntity()
export class Pawn extends Piece {

}