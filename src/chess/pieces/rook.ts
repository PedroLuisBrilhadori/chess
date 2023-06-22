import { CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Rook extends Piece {
  type = PieceType.Rook;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(): Position[] {
    return [];
  }
}
