import { blackPieces } from "./black";
import { whitePieces } from "./white";
import { Board } from "./chess/models";

const board = new Board([...blackPieces, ...whitePieces]);

console.log(board.outPut());
