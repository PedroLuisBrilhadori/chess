import { ExpressRequestAPI } from "../types";
import { PlayerService } from "../services";
import { Controller, Post, ValidationPipe } from "../../lib";
import { Body } from "../../lib/express/decorators/body.decorator";
import { CreatePlayerDto } from "../dto";

@Controller("player")
export class PlayerController {
  constructor(private service: PlayerService) {}

  @Post("/start")
  // @ts-ignore
  async startGame(@Body() dto: CreatePlayerDto) {
    const isValid = await ValidationPipe(CreatePlayerDto, dto);

    if (isValid.length > 0) return isValid;

    return dto;
  }

  @Post("/stop")
  stopGame({ request, response }: ExpressRequestAPI) {}

  @Post("/pick")
  pickPiece({ request, response }: ExpressRequestAPI) {}

  @Post("/move")
  move({ request, response }: ExpressRequestAPI) {}
}
