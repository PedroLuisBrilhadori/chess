import { Requests } from "../types/";
import { baseReturn } from "./base.decorator";

export const Post = (path: string) =>
  baseReturn<string>({
    key: Requests.Post,
    data: path,
  });
