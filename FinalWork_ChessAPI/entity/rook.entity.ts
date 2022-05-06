import { ChildEntity } from "typeorm";
import { Piece } from './piece.entity';

@ChildEntity()
export class Rook extends Piece {

}