import { Board } from "@chess/";
import { AlreadyExistsException } from "@lib/";
import { CreateBoardDto } from "../dto";
import { BoardRepository } from "../repositories/";

export class BoardService {
  constructor(private repository: BoardRepository) { }

  async create(dto: CreateBoardDto) {
    const board = new Board([], dto)

    try {
      return await this.repository.save(board);
    }
    catch (error) {
      throw new AlreadyExistsException(`Board ${dto.name}`)
    }
  }


  find(name: string) {
    return this.repository.find(name);
  }

  findOne(name: string) {
    try {
      return this.repository.findOne(name)
    }
    catch (error) {
      console.log(error)
    }
  }
}
