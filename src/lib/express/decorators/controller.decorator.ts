import { Classes } from "../types";
import { baseReturnClass } from "./base.decorator";

export type Injections = (new () => {})[]

export const Controller = (path: string) => baseReturnClass({
  key: Classes.Controller,
  data: path
})

export const Inject = (injections: Injections) => baseReturnClass({
  key: Classes.Inject,
  data: injections
})
