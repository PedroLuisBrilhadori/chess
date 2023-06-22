import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class King extends Piece {
  type = PieceType.King;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
