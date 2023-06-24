import "reflect-metadata";
import { Router } from "express";
import { getKeyTypes } from "../utils";

export const makeRoutes = <Controller extends Object>(
  controller: Controller,
  prototype: Controller
) => {
  const router = Router();

  const types = getKeyTypes();

  const properties = Object.getOwnPropertyNames(prototype).filter(
    (route) => route !== "constructor"
  );

  for (const type of types)
    for (const prop of properties) {
      const decorator = Reflect.getMetadata(type, controller, prop);

      if (!type || !decorator || !prop) break;

      router[type](decorator, (req, res) => {
        controller[prop]({ request: req, response: res });
      });
    }

  return router;
};
