import "reflect-metadata";
import { MetadataDecorator } from "../types";

export function baseReturn<Data>(metadata: MetadataDecorator<Data>) {
  return (target: any, key: any) => {
    Reflect.defineMetadata(metadata.key, metadata.data, target, key);
  };
}
