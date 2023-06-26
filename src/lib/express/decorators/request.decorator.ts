import { Requests } from "../types/";
import { baseReturn } from "./base.decorator";

export const RequestDecorator = (key: Requests) => (path?: string) =>
  baseReturn({
    key,
    data: path || "",
  });

export const Post = RequestDecorator(Requests.Post);

export const Get = RequestDecorator(Requests.Get);

export const All = RequestDecorator(Requests.All);

export const Patch = RequestDecorator(Requests.Patch);

export const Put = RequestDecorator(Requests.Put);

export const Delete = RequestDecorator(Requests.Delete);
