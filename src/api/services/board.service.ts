import { Board, blackPieces, whitePieces } from "@chess/";
import { AlreadyExistsException, NotFoundException } from "@lib/";
import { CreateBoardDto } from "../dto";
import { BoardRepository } from "../repositories/";

export class BoardService {
  constructor(private repository: BoardRepository) { }

  async create(dto: CreateBoardDto) {
    const board = new Board([...whitePieces, ...blackPieces], dto)

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

  async findOne(name: string) {
    try {
      return await this.repository.findOne(name)
    }
    catch (error) {
      throw new NotFoundException(`Board ${name}`)
    }
  }
}
