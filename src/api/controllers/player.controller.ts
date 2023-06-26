import { PlayerService } from "../services";
import { Post, ValidationPipe, Body } from "@lib/";
import { CreatePlayerDto } from "../dto";

export class PlayerController {
  constructor(private service: PlayerService) {}

  @Post("/start")
  async startGame(@Body() dto: CreatePlayerDto) {
    const isValid = await ValidationPipe(CreatePlayerDto, dto);

    if (isValid.length > 0) return isValid;

    return { dto };
  }

  @Post("/stop")
  stopGame() {
    return "stop";
  }

  @Post("/pick")
  pickPiece() {}

  @Post("/move")
  move() {}
}
