import { Keys } from "../types/";
import { baseReturn } from "./base.decorator";

export const Controller = (path: string) =>
  baseReturn<string>({
    key: Keys.Controller,
    data: path,
  });
