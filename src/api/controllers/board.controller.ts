import { Body, Get, Post, Query, ValidationPipe } from "@lib/";
import { BoardService } from "../services";
import { CreateBoardDto } from "../dto";

export class BoardController {

  constructor(private service: BoardService) { }

  @Post("/")
  async createBoard(@Body() dto: CreateBoardDto) {
    const isValid = await ValidationPipe(CreateBoardDto, dto);

    if (isValid.length > 0) return isValid;

    return this.service.create(dto);
  }


  @Get("/")
  async findBoard(@Query("name") name: string) {
    return this.service.findOne(name);
  }
}
