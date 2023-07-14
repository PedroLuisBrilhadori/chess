import { Player } from "../../chess/models";

export class PlayerRepository {
  private players: Player[] = [];

  constructor() { }

  async save(player: Player) {
    if ((await this.find(player.name)).length > 0) throw Error(`already-exists`);

    this.players.push(player);

    return player;
  }

  stopGame() { }

  pickPiece() { }

  move() { }

  async find(name: string): Promise<Player[]> {
    return this.players.filter((player) => player.name === name);
  }
}
