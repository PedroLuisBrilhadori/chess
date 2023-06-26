import "reflect-metadata";
import { Params } from "../types";
import { baseReturn } from "./base.decorator";

export type ParamMetadata = {
  key: Params;
  param?: string;
  index: number;
};

export const ParamDecorator = (key: Params) => (param?: string) =>
  baseReturn({
    key,
    data: {
      key,
      param,
    },
  });

export const Body = ParamDecorator(Params.Body);

export const Query = ParamDecorator(Params.Query);

export const Res = ParamDecorator(Params.Response);

export const Req = ParamDecorator(Params.Request);
