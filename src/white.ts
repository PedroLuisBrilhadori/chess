import { Pawn, Rook } from "./chess/pieces/";

const color = "white";

const pawns = [
  new Pawn({ y: 6, x: 1, color }),
  new Pawn({ y: 6, x: 2, color }),
  new Pawn({ y: 6, x: 3, color }),
  new Pawn({ y: 6, x: 4, color }),
  new Pawn({ y: 6, x: 5, color }),
  new Pawn({ y: 6, x: 6, color }),
  new Pawn({ y: 6, x: 7, color }),
  new Pawn({ y: 6, x: 0, color }),
];

const rooks = [
  new Rook({ y: 7, x: 0, color }),
  new Rook({ y: 7, x: 7, color }),
];

export const whitePieces = [...pawns, ...rooks];
