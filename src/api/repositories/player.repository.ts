import { Player } from "../../chess/models";

export class PlayerRepository {
  private players: Player[] = [];

  constructor() {}

  save(player: Player) {
    if (this.find(player.name).length > 0) throw Error(`already-exists`);

    this.players.push(player);

    return player;
  }

  stopGame() {}

  pickPiece() {}

  move() {}

  find(name: string): Player[] {
    return this.players.filter((player) => player.name === name);
  }
}
