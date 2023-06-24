// @ts-nocheck
import { IsString, Length, Validate } from "class-validator";
import { Color } from "../../chess";
import { IsColor } from "../decorators/";

export class CreatePlayerDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @Validate(IsColor)
  @IsString()
  color: Color;
}
