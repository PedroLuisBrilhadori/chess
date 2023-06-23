import { Request, Response } from "express";

export interface ExpressRequestAPI {
  request: Request;
  response: Response;
}
