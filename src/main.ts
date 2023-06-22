import { Board } from "./chess/models";
import { Pawn } from "./chess/pieces/pawn";

const whitePawns = [
  new Pawn({ y: 6, x: 1, color: "white" }),
  new Pawn({ y: 6, x: 2, color: "white" }),
  new Pawn({ y: 6, x: 3, color: "white" }),
  new Pawn({ y: 6, x: 4, color: "white" }),
  new Pawn({ y: 6, x: 5, color: "white" }),
  new Pawn({ y: 6, x: 6, color: "white" }),
  new Pawn({ y: 6, x: 7, color: "white" }),
  new Pawn({ y: 6, x: 0, color: "white" }),
];

const blackPawns = [
  new Pawn({ y: 1, x: 1, color: "black" }),
  new Pawn({ y: 1, x: 2, color: "black" }),
  new Pawn({ y: 1, x: 3, color: "black" }),
  new Pawn({ y: 1, x: 4, color: "black" }),
  new Pawn({ y: 1, x: 5, color: "black" }),
  new Pawn({ y: 1, x: 6, color: "black" }),
  new Pawn({ y: 1, x: 7, color: "black" }),
  new Pawn({ y: 1, x: 0, color: "black" }),
];

const board = new Board([...whitePawns, ...blackPawns]);

console.log(board.outPut());
