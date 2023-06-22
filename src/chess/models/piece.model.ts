import { Color, PieceType, Position } from "../types";
import { Board } from "./board.model";

export type CreatePiece = Pick<Piece, "x" | "y" | "color">;

export abstract class Piece {
  x: number;

  y: number;

  death: boolean = false;

  initial: boolean = true;

  type: PieceType;

  color: Color;

  constructor({ x, y, color }: CreatePiece) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  move({ x, y }: Position) {
    this.x = x;
    this.y = y;
  }

  getPosition(): Position {
    return {
      x: this.x,
      y: this.y,
    };
  }

  abstract findPositions(board: Board): Position[];
}
