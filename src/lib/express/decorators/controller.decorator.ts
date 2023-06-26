import { Classes } from "../types/";
import { baseReturn } from "./base.decorator";

export const Controller = (path: string) =>
  baseReturn<string>({
    key: Classes.Controller,
    data: path,
  });
