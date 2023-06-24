import { ExpressRequestAPI } from "../types";
import { PlayerService } from "../services";
import { Controller, Post } from "../../lib";

@Controller("player")
export class PlayerController {
  constructor(private service: PlayerService) {}

  @Post("/start")
  startGame({ request, response }: ExpressRequestAPI) {
    const { name } = request.body;

    response.json({ name });
  }

  @Post("/stop")
  stopGame({ request, response }: ExpressRequestAPI) {}

  @Post("/pick")
  pickPiece({ request, response }: ExpressRequestAPI) {}

  @Post("/move")
  move({ request, response }: ExpressRequestAPI) {}
}
