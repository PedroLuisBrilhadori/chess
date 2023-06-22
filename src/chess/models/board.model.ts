import { Position, Square } from "../types";
import { Piece } from "./piece.model";

export class Board {
  square: Square<Piece | undefined>;

  deaths: Piece[];

  move(piece: Piece, move: Position) {
    if (!this.availablePosition(piece, move)) return;

    const position = this.getPosition(move);

    if (position) this.kill(position);

    piece.move(move);
  }

  availablePosition(piece: Piece, move: Position) {
    const position = this.getPosition(move);

    if (!position) return true;

    if (position.color !== piece.color) return true;

    return false;
  }


  kill(piece: Piece) {
    this.deaths.push(piece);
    this.removePosition({ x: piece.x, y: piece.y })
  }

  private getPosition({ x, y }: Position) {
    return this.square[y][x];
  }

  private removePosition({ x, y }: Position) {
    const position = this.getPosition({ x, y });

    this.square[y][x] = undefined;

    return position;
  }
}
