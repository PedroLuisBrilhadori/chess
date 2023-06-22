import { Bishop, King, Knigth, Pawn, Queen, Rook } from "./chess/";

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

const knights = [
  new Knigth({ y: 0, x: 1, color }),
  new Knigth({ y: 0, x: 6, color }),
];

const bishops = [
  new Bishop({ y: 0, x: 2, color }),
  new Bishop({ y: 0, x: 5, color }),
];

export const blackPieces = [
  ...pawns,
  ...rooks,
  ...knights,
  ...bishops,
  new King({ y: 0, x: 4, color }),
  new Queen({ y: 0, x: 3, color }),
];
