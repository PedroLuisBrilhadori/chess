import { Move } from "../types";
import { Piece } from "./piece.model";

export class Board {
  square: Piece[][];

  deaths: Piece[];

  move(piece: Piece, move: Move) {
    if (!this.availablePosition(piece, move)) return;

    piece.move(move);
  }

  availablePosition(piece: Piece, move: Move): boolean {
    const position = this.getPosition(move);

    if (!position) return true;

    if (position.color !== piece.color) return true;

    return false;
  }

  private getPosition({ x, y }: Move): Piece {
    return this.square[y][x];
  }
}
