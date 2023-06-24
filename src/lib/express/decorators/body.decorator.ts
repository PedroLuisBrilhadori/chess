import "reflect-metadata";
import { Params } from "../types";

export function Body() {
  return (target: Object, key: string) => {
    Reflect.defineMetadata(Params.Body, Params.Body, target, key);
  };
}
