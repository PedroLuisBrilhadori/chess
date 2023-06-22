import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Queen extends Piece {
  type = PieceType.Queen;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
