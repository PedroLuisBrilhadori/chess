import { Keys } from "./keys.type";

export type MetadataDecorator<Data> = {
  key: Keys;
  data: Data;
};
