import { Keys } from "../types/";
import { baseReturn } from "./base.decorator";

export const Post = (path: string) =>
  baseReturn<string>({
    key: Keys.Post,
    data: path,
  });
