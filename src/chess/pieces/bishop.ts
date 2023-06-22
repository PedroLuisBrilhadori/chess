import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Bishop extends Piece {
  type = PieceType.Bishop;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
