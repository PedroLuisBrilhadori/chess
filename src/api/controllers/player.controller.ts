import { ExpressRequestAPI } from "../types";
import { PlayerService } from "../services";

export class PlayerController {
  constructor(private service: PlayerService) {}

  startGame({ request, response }: ExpressRequestAPI) {
    const { name } = request.body;

    response.json({ name });
  }

  stopGame({ request, response }: ExpressRequestAPI) {}

  pickPiece({ request, response }: ExpressRequestAPI) {}

  move({ request, response }: ExpressRequestAPI) {}
}
