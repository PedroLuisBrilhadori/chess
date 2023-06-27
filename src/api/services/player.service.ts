import { PlayerRepository } from "../repositories";
import { CreatePlayerDto } from "../dto";
import { Player } from "../../chess/models";

export class PlayerService {
  constructor(private repository: PlayerRepository) {}

  createPlayer(dto: CreatePlayerDto) {
    const player = new Player(dto);

    return this.repository.save(player);
  }

  stopGame() {}

  move() {}

  pickPiece() {}
}
