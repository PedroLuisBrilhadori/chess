import chalk from "chalk";
import { Color, Position, Square } from "../types";
import { Piece } from "./piece.model";

export type CreateBoard = Pick<Board, 'name' | 'size' | 'players'>

export class Board {
  name: string;

  players?: string[];

  square: Square<Piece | null> = [];

  size: number = 8;

  constructor(pieces: Piece[], { name, size, players }: CreateBoard) {
    if (size) this.size = size;

    this.setupSquare();
    this.fillSquare(pieces);

    this.name = name;

    if (players && this.playersValid(players))
      this.players = players
  }

  private playersValid({ length }: string[]) {
    if (length < 3 || length >= 1) return true

    return false;
  }

  setPlayers(players: string[]) {
    if (!this.playersValid(players))
      throw new Error('Invalid Players')

    this.players = players;
  }

  getPosition({ x, y }: Position) {
    const position = this.square[y][x];

    return position;
  }

  removePosition({ x, y }: Position) {
    this.square[y][x] = null;
  }

  availableMoviment(piece: Piece, move: Position) {
    const possibleMoviment = this.getPosition(move);

    if (!possibleMoviment) return true;

    if (possibleMoviment.color !== piece.color) return true;

    return false;
  }

  move(piece: Piece, { x, y }: Position) {
    if (!this.availableMoviment(piece, { x, y })) return;

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

  private setupSquare(): void {
    for (let i = 0; i < this.size; i++) {
      this.square[i] = [];
    }
  }

  private fillSquare(pieces: Piece[]): void {
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
