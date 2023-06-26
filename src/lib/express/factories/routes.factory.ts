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
        const path = this.getDecoratorMetadata(request, prop);

        if (!path) continue;

        const param = this.getDecoratorMetadata(this.params, prop);

        this.makeRoute({ request, prop, path, param });
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
    if (!createRoute.param) this.makeNoParamRoute(createRoute);

    this.makeParamRoute(createRoute);
  }

  private makeNoParamRoute({
    request,
    path,
    prop,
  }: Omit<CreateRoute, "param">) {
    this.router[request](path, async (req: Request, res: Response) => {
      return res.json(await this.controller[prop]());
    });
  }

  private makeParamRoute({ request, path, prop, param }: CreateRoute) {
    if (param === Params.Request || param === Params.Response)
      return this.makeReqResRoute({ request, path, prop, param });

    this.router[request](path, async (req: Request, res: Response) => {
      return res.json(await this.controller[prop](req[param]));
    });
  }

  private makeReqResRoute({ request, path, prop, param }: CreateRoute) {
    this.router[request](path, async (req: Request, res: Response) => {
      const params = { req, res };

      return res.json(await this.controller[prop](params[param]));
    });
  }

  private getDecoratorMetadata(keys: string[] | string, prop: string): any {
    if (typeof keys === "string") return this.getMetadata(keys, prop);

    for (const typeKey of keys) {
      const type = this.getMetadata(typeKey, prop);

      if (type) return type;
    }
  }
}
