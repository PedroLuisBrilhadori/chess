import { PlayerRepository } from "../repositories";
import { CreatePlayerDto } from "../dto";
import { Player } from "../../chess/models";

export class PlayerService {
  constructor(private repository: PlayerRepository) { }

  create(dto: CreatePlayerDto) {
    const player = new Player(dto);

    return this.repository.save(player);
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
