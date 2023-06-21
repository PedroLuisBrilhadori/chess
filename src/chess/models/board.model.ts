import { Position } from "../types";
import { Piece } from "./piece.model";

export class Board {
  square: Piece[][];

  deaths: Piece[];

  move(piece: Piece, move: Position) {
    if (!this.availablePosition(piece, move)) return;

    piece.move(move);
  }

  availablePosition(piece: Piece, move: Position): boolean {
    const position = this.getPosition(move);

    if (!position) return true;

    if (position.color !== piece.color) return true;

    return false;
  }


  kill(piece: Piece) {

  }

  private getPosition({ x, y }: Position): Piece {
    return this.square[y][x];
  }

  private RemovePosition({ x, y }: Position) {

  }
}
