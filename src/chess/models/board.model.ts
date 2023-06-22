import { Position, Square } from "../types";
import { Piece } from "./piece.model";

export class Board {
  square: Square<Piece | null> = [];

  size: number = 8;

  deaths: Piece[] = [];

  constructor(size?: number) {
    if (size) this.size = size;

    this.setupSquares();
    this.fillSquares();
  }

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
    this.removePosition({ x: piece.x, y: piece.y });
  }

  outPut() {
    let string: string[] = "\t\t BOARD \n".split("");

    for (const ranks of this.square) {
      string.push("\n________________________________________\n");
      ranks.forEach((files) => {
        if (files !== null) {
          string.push(`| ${files.type} |`);
        } else {
          string.push(`| 0 |`);
        }
      });
    }

    string.push("\n________________________________________\n");

    return string.join("");
  }

  private getPosition({ x, y }: Position) {
    const position = this.square[y][x];

    if (position === undefined)
      throw new Error(
        `the position x: ${x}, y: ${y} \n exceeded the size ${this.size}X${this.size} of the board`
      );

    return this.square[y][x];
  }

  private removePosition({ x, y }: Position) {
    const position = this.getPosition({ x, y });

    this.square[y][x] = null;

    return position;
  }

  private setupSquares() {
    for (let i = 0; i < this.size; i++) {
      this.square[i] = [];
    }
  }

  private fillSquares() {
    for (let i = 0; i < this.size; i++) {
      for (let k = 0; k < this.size; k++) {
        this.square[i][k] = null;
      }
    }
  }
}
