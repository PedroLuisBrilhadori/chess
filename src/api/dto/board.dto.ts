// @ts-nocheck
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsArray()
  players: string[];
}
