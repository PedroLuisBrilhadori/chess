import { Pawn, Rook } from "./chess/pieces";

const color = "black";

const pawns = [
  new Pawn({ y: 1, x: 1, color }),
  new Pawn({ y: 1, x: 2, color }),
  new Pawn({ y: 1, x: 3, color }),
  new Pawn({ y: 1, x: 4, color }),
  new Pawn({ y: 1, x: 5, color }),
  new Pawn({ y: 1, x: 6, color }),
  new Pawn({ y: 1, x: 7, color }),
  new Pawn({ y: 1, x: 0, color }),
];

const rooks = [
  new Rook({ y: 0, x: 0, color }),
  new Rook({ y: 0, x: 7, color }),
];

export const blackPieces = [...pawns, ...rooks];
