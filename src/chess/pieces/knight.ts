import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Knigth extends Piece {
  type = PieceType.Knight;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
