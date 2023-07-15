import { ParamMetadata } from "../decorators";

export type CreateRoute = {
  request: string;
  path: string;
  prop: string;
  params?: ParamMetadata[];
};
