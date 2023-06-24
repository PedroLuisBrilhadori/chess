import { Keys } from "../types";

export function getKeyTypes() {
  const types: string[] = [];

  for (const key in Keys) {
    types.push(Keys[key as string]);
  }

  return types;
}
