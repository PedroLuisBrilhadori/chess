import { blackPieces } from "./black";
import { whitePieces } from "./white";
import { Board, Player } from ".";

const board = new Board([...blackPieces, ...whitePieces], { name: 'Test', size: 8 });

const whitePlayer = new Player({
  name: "whiter",
  color: "white",
});

const blackPlayer = new Player({
  name: "blacker",
  color: "black",
});

blackPlayer.startGame(board);
whitePlayer.startGame(board);

const input = { x: 1, y: 6 };

whitePlayer.pickPiece(input);
blackPlayer.pickPiece(input);

console.log(`input: `, input);
console.log(`white response: `, whitePlayer.positions);
console.log(`black response: `, blackPlayer.positions);
console.log("\n\n");

console.log(board.outPut());
