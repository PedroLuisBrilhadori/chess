import { PlayerRepository } from "../repositories";
import { CreatePlayerDto } from "../dto";
import { Player } from "../../chess/models";
import { AlreadyExistsException } from "../../lib/express";

export class PlayerService {
  constructor(private repository: PlayerRepository) { }

  async create(dto: CreatePlayerDto) {
    const player = new Player(dto);

    try {
      return await this.repository.save(player);
    }
    catch (error) {
      throw new AlreadyExistsException(`Player: ${dto.name}`);
    }
  }

  async find(name: string) {
    const player = await this.repository.find(name)

    if (!player) return 'error'


    return player;
  }

  stopGame() { }

  move() { }

  pickPiece() { }
}
