import { Router, Request, Response } from "express";
import { Params, Requests, CreateRoute, ReflectMetadata } from "../types";

export type CreateRouter<Controller extends Object> = {
  controller: Controller;
  model: new (any: any) => Controller;
  reflect: ReflectMetadata;
};

export class RouterGenerator<Controller extends Object> {
  private controller: Controller;

  private controllerPrototype: Controller;

  private reflect: ReflectMetadata;

  constructor({ controller, model, reflect }: CreateRouter<Controller>) {
    this.controller = controller;
    this.controllerPrototype = model.prototype;
    this.reflect = reflect;

    this.router = Router();

    this.properties = this.getProperties();

    this.requests = this.getEnumKeys(Requests);
    this.params = this.getEnumKeys(Params);
  }

  make() {
    for (const prop of this.properties)
      for (const request of this.requests) {
        const path = this.getMetadata(request, prop)?.data;

        if (path === undefined || typeof path !== "string") continue;

        const params: any = this.getParams(prop);

        this.makeRoute({ request, prop, path, params });
      }

    return this.router;
  }

  private router: Router;

  private requests: keyof Router;

  private params: string[];

  private properties: string[];

  private getProperties() {
    return Object.getOwnPropertyNames(this.controllerPrototype);
  }

  private getEnumKeys(Enum: Object) {
    const keys: string[] = [];

    for (const key in Enum) keys.push(key.toLowerCase());

    return keys;
  }

  private getMetadata(key: string, target: any) {
    const metadata = this.reflect.getMetadata(
      key,
      this.controllerPrototype,
      target
    );

    return metadata;
  }

  private getParams(prop: string) {
    const params: any = [];

    for (const paramKey of this.params) {
      const metadata = this.getMetadata(paramKey, prop);

      if (metadata === undefined) continue;

      params[metadata.index] = metadata.data;
    }

    return params;
  }

  private makeRoute(createRoute: CreateRoute) {
    if (!createRoute.params || createRoute.params.length <= 0)
      return this.makeNoParamRoute(createRoute);

    this.makeParamRoute(createRoute);
  }

  private makeNoParamRoute({
    request,
    path,
    prop,
  }: Omit<CreateRoute, "params">) {
    this.router[request as "post"](
      path,
      async (req: Request, res: Response) => {
        return res.json(await this.controller[prop]());
      }
    );
  }

  private makeParamRoute({ request, path, prop, params }: CreateRoute) {
    this.router[request](path, async (req: Request, res: Response) => {
      const args = params?.map(({ key, param }) => {
        if (key === Params.Response) return param ? res[param] : res;
        if (key === Params.Request) return param ? req[param] : req;

        return param ? req[key][param] : req[key];
      });

      return res.json(await this.controller[prop](...args));
    });
  }
}
