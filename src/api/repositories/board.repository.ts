import { Board } from "@chess/";

export class BoardRepository {
  private boards: Board[] = []

  constructor() { }

  async save(board: Board) {
    const exists = (await this.find(board.name)).length !== 0;

    if (exists) throw new Error('already-exists')

    this.boards.push(board)

    return board
  }

  async find(name: string) {
    return this.boards.filter(board => board.name === name)
  }
}
