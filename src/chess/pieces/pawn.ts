import { Board, CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Pawn extends Piece {
  type = PieceType.Pawn;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(board: Board): Position[] {
    const { x, y } = this.getPosition();

    const available: Position[] = [{ x, y: y - 1 }];

    if (board.getPosition(available[0])) return [];

    if (this.initial) {
      if (board.getPosition({ x, y: y - 2 })) return available;

      available.push({ x, y: y - 2 });
    }

    let enimy = board.getPosition({ x: x + 1, y: y - 1 });

    if (enimy && enimy.color !== this.color) {
      available.push({ x: x + 1, y: y - 1 });
    }

    enimy = board.getPosition({ x: x - 1, y: y - 1 });

    if (enimy && enimy.color !== this.color) {
      available.push({ x: x - 1, y: y - 1 });
    }

    return available;
  }
}
