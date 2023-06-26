import { PlayerService } from "../services";
import { Controller, Post, ValidationPipe, Body, Query } from "../../lib";
import { CreatePlayerDto } from "../dto";

@Controller("player")
export class PlayerController {
  constructor(private service: PlayerService) {}

  @Post("/start")
  // @ts-ignore
  async startGame(@Body() dto: CreatePlayerDto, @Query() query) {
    const isValid = await ValidationPipe(CreatePlayerDto, dto);

    if (isValid.length > 0) return isValid;

    return { dto, query };
  }

  @Post("/stop")
  stopGame() {
    return "stop";
  }

  @Post("/pick")
  pickPiece({ request, response }: ExpressRequestAPI) {}

  @Post("/move")
  move({ request, response }: ExpressRequestAPI) {}
}
