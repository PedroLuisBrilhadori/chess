import { PieceType, Position } from "../types";
import { Board } from './board.model';

export abstract class Piece {
  x: number;

  y: number;

  death: boolean;

  initial: boolean;

  type: PieceType;

  color: "black" | "white";

  constructor(public boardService: Board) { }

  move({ x, y }: Position) {
    this.x = x;
    this.y = y;
  }

  abstract findPositions(): Position[];
}
