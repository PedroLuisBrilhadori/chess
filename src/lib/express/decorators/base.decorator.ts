import "reflect-metadata";

export type MetadataDecorator = {
  key: any;
  data: any;
};

export function baseReturn(metadata: MetadataDecorator) {
  return (target: any, key: any, index?: any) => {
    Reflect.defineMetadata(
      metadata.key,
      {
        index: typeof index === "number" ? index : undefined,
        data: metadata.data,
      },
      target,
      key
    );
  };
}


export function baseReturnClass(metadata: MetadataDecorator) {
  return (target: any, key?: any) => {
    Reflect.defineMetadata(metadata.key, metadata.data, target, key);
  };
}
