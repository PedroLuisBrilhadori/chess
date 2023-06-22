import { Color, Position } from "../types";
import { Board } from "./board.model";
import { Piece } from "./piece.model";

export type CreatePlayer = Pick<Player, "name" | "color" | "pieces" | "board">;

export class Player {
  name: string;

  color: Color;

  pieces: Pick<Piece, "x" | "y">[] = [];

  deadPieces: Piece[] = [];

  board: Board;

  piece: Piece;

  positions: Position[] = [];

  constructor({ name, color, pieces, board }: CreatePlayer) {
    this.name = name;
    this.color = color;
    this.pieces = pieces;
    this.board = board;
  }

  // call the board to pick a Piece
  // call the piece to find and return available moves
  pickPiece(position: Position) {
    const piece = this.board.getPosition(position);

    if (!piece) return [];

    if (piece.color !== this.color) return [];

    this.piece = piece;

    this.positions = piece.findPositions(this.board);
  }

  // call the board to move this piece to the move position
  move(piece: Piece, move: Position) {
    this.board.move(piece, move);
  }
}
