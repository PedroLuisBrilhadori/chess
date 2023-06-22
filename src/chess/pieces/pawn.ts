import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Pawn extends Piece {
  type = PieceType.Pawn;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
