import { PieceType, Move } from "../types";

export abstract class Piece {
  x: number;

  y: number;

  death: boolean;

  initial: boolean;

  type: PieceType;

  color: "black" | "white";

  constructor(public boardService: any) {}

  move({ x, y }: Move) {
    this.x = x;
    this.y = y;
  }

  abstract findMoves(): Move[];
}
