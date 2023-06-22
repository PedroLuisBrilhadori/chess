import { blackPieces } from "./black";
import { whitePieces } from "./white";
import { Board, Player } from "./chess/";

const board = new Board([...blackPieces, ...whitePieces]);

const whitePlayer = new Player({
  name: "whiter",
  color: "white",
  pieces: whitePieces,
  board,
});

const response = whitePlayer.pickPiece({
  x: 1,
  y: 6,
});

console.log(`input: `, { x: 1, y: 6 });
console.log(`response: `, whitePlayer.positions);
console.log("\n\n");

console.log(board.outPut());
