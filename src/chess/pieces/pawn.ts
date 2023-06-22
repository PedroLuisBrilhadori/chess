import { Board, CreatePiece, Piece } from "../models";
import { PieceType, Position } from "../types";

export class Pawn extends Piece {
  type = PieceType.Pawn;

  constructor({ x, y, color }: CreatePiece) {
    super({ x, y, color });
  }

  findPositions(board: Board): Position[] {
    if (this.color === "white") return this.white(board);

    return this.black(board);
  }

  private white(board: Board) {
    const { x, y } = this.getPosition();
    const possible = [
      { x, y: y - 1 },
      { x, y: y - 2 },
    ];

    const attacks = [
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y - 1 },
    ];

    const available: Position[] = this.walk(board, possible);

    attacks.forEach((attack) => {
      if (board.getPosition(attack)) available.push(attack);
    });

    return available;
  }

  private black(board: Board) {
    const { x, y } = this.getPosition();
    const possible = [
      { x, y: y + 1 },
      { x, y: y + 2 },
    ];
    const available: Position[] = this.walk(board, possible);

    const attacks = [
      { x: x + 1, y: y + 1 },
      { x: x - 1, y: y + 1 },
    ];

    attacks.forEach((attack) => {
      if (board.getPosition(attack)) available.push(attack);
    });

    return available;
  }

  private walk(board: Board, possible: Position[]) {
    const available: Position[] = [];
    let walk = true;

    if (board.getPosition(possible[0])) walk = false;

    if (walk) available.push(possible[0]);

    if (this.initial && walk) {
      if (board.getPosition(possible[1])) return available;

      available.push(possible[1]);
    }

    return available;
  }
}
