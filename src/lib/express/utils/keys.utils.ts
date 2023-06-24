import { Keys, Params } from "../types";

export function getKeyTypes() {
  const types: string[] = [];

  for (const key in Keys) {
    types.push(Keys[key as string]);
  }

  return types;
}

export function getParams() {
  const types: string[] = [];

  for (const key in Params) {
    types.push(Params[key as string]);
  }

  return types;
}
