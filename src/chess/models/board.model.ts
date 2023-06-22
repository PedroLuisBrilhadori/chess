import chalk from "chalk";
import { Color, Position, Square } from "../types";
import { Piece } from "./piece.model";

export class Board {
  square: Square<Piece | null> = [];

  size: number = 8;

  constructor(pieces: Piece[], size?: number) {
    if (size) this.size = size;

    this.setupSquares();
    this.fillSquares(pieces);
  }

  getPosition({ x, y }: Position) {
    const position = this.square[y][x];

    return position;
  }

  removePosition({ x, y }: Position) {
    this.square[y][x] = null;
  }

  availablePosition(piece: Piece, move: Position) {
    const possibleMoviment = this.getPosition(move);

    if (!possibleMoviment) return true;

    if (possibleMoviment.color !== piece.color) return true;

    return false;
  }

  move(piece: Piece, { x, y }: Position) {
    if (!this.availablePosition(piece, { x, y })) return;

    piece.move({ x, y });
    this.square[y][x] = piece;
  }

  getPieces(color: Color) {
    const pieces: Piece[] = [];

    for (const ranks of this.square) {
      const filtered = ranks.filter((piece) => {
        if (piece === null) return;
        if (piece.color === color) return piece;
      }) as Piece[];

      pieces.push(...filtered);
    }

    return pieces;
  }

  outPut() {
    let string: string[] = "\t\t BOARD \n".split("");

    string.push("\n__0____1____2____3____4____5____6____7__");
    string.push(`\n________________________________________\n`);
    let i = 0;
    for (const ranks of this.square) {
      ranks.forEach((files) => {
        if (files !== null) {
          string.push(chalk.green(`| ${files.type} |`));
        } else {
          string.push(`| 0 |`);
        }
      });

      string.push(`| ${i} \n________________________________________ \n`);

      i++;
    }

    return string.join("");
  }

  private setupSquares() {
    for (let i = 0; i < this.size; i++) {
      this.square[i] = [];
    }
  }

  private fillSquares(pieces: Piece[]) {
    for (let i = 0; i < this.size; i++) {
      for (let k = 0; k < this.size; k++) {
        this.square[i][k] = null;
      }
    }

    pieces.forEach((piece) => {
      const { x, y } = piece.getPosition();

      this.square[y][x] = piece;
    });
  }
}
