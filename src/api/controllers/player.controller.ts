import { PlayerService } from "../services";
import { Controller, Post, Get, ValidationPipe, Body, Query } from "@lib/";
import { CreatePlayerDto } from "../dto";

@Controller('/player')
export class PlayerController {
  constructor(private service: PlayerService) { }

  @Post("/")
  async createPlayer(@Body() dto: CreatePlayerDto) {
    const isValid = await ValidationPipe(CreatePlayerDto, dto);

    if (isValid.length > 0) return isValid;

    return this.service.create(dto);
  }


  @Get('/')
  async findPlayer(@Query('name') name: string) {
    return this.service.find(name)
  }

  @Post("/stop")
  stopGame() {
    return "stop";
  }

  @Post("/pick")
  pickPiece() { }

  @Post("/move")
  move() { }
}
