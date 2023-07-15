import { Color, Position } from "../types";
import { Board } from "./board.model";
import { Piece } from "./piece.model";

export type CreatePlayer = Pick<Player, "name" | "color">;

export class Player {
  name: string;

  color: Color;

  positions: Position[] = [];

  private board: Board | null = null;

  constructor({ name, color }: CreatePlayer) {
    this.name = name;
    this.color = color;
  }

  startGame(board: Board) {
    this.board = board;
  }

  // call the board to pick a Piece
  // call the piece to find and return available moves
  pickPiece(position: Position) {
    if (!this.board) return;

    const piece = this.board.getPosition(position);

    if (!piece) return [];

    if (piece.color !== this.color) return [];

    this.positions = piece.findPositions(this.board);
  }

  // call the board to move this piece to the move position
  move(piece: Piece, move: Position) {
    if (!this.board) return;

    this.board.move(piece, move);
  }
}
