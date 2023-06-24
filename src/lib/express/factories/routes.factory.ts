import "reflect-metadata";
import { Router } from "express";
import { getKeyTypes, getParams } from "../utils";
import { Keys } from "../types";

export const makeRoutes = <Controller extends Object>(
  controller: Controller,
  prototype: Controller
) => {
  const router = Router();

  const types = getKeyTypes();
  const params = getParams();

  const properties = Object.getOwnPropertyNames(prototype).filter(
    (route) => route !== "constructor"
  );

  for (const prop of properties)
    for (const type of types) {
      const decorator = Reflect.getMetadata(type, prototype, prop);

      if (!decorator) continue;

      for (const param of params) {
        const paramDecorator = Reflect.getMetadata(param, prototype, prop);

        if (!paramDecorator) {
          router[type](decorator, async (req, res) => {
            res.json(await controller[prop]());
          });

          continue;
        }

        router[type](decorator, async (req, res) => {
          res.json(await controller[prop](req[paramDecorator]));
        });
      }
    }

  return router;
};
