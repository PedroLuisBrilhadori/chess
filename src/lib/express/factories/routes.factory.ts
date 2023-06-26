import { Router, Request, Response } from "express";
import {
  Classes,
  Params,
  Requests,
  CreateRoute,
  ReflectMetadata,
} from "../types";

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

    this.types = this.getEnumKeys(Classes);
    this.requests = this.getEnumKeys(Requests);
    this.params = this.getEnumKeys(Params);
  }

  make() {
    for (const prop of this.properties)
      for (const request of this.requests) {
        const path = this.getMetadata(request, prop);

        if (path === undefined || typeof path !== "string") continue;

        const params: any = [];

        for (const paramKey of this.params) {
          const metadata = this.getMetadata(paramKey, prop);

          if (metadata === undefined) continue;

          params.push(metadata);
        }

        this.makeRoute({ request, prop, path, params });
      }

    return this.router;
  }

  private router: Router;

  private types: string[];

  private requests: string[];

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
    return this.reflect.getMetadata(key, this.controllerPrototype, target);
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
    this.router[request](path, async (req: Request, res: Response) => {
      /* c8 ignore next 1 */
      return res.json(await this.controller[prop]());
    });
  }

  private makeParamRoute({ request, path, prop, params }: CreateRoute) {
    this.router[request](path, async (req: Request, res: Response) => {
      /* c8 ignore next 8 */
      const args = params?.map(({ key, param }) => {
        if (key === Params.Response) return param ? req[param] : res;
        if (key === Params.Request) return param ? res[param] : res;
        if (key === Params.Body) return param ? req.body[param] : req.body;
        if (key === Params.Query) return param ? req.query[param] : req.query;
      });

      return res.json(await this.controller[prop](...args));
    });
  }
}
