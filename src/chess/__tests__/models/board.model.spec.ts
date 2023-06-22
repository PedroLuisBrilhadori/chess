import { describe, it, expect } from "vitest";
import { Board } from "../../models";

const makeBoard = () => new Board();

describe("Board class", () => {
  it("should create a new Board", () => {
    const board = makeBoard();

    expect(board instanceof Board).toBeTruthy();
    expect(board.deaths.length).toBe(0);
    expect(board.square.length).toBe(8);
  });
});
