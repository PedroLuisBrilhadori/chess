import { Router } from "express";
import { playerRoutes, boardRoutes } from "./routes";

export const chessRoutes = async () => {
  const routes = Router();

  routes.use("/player", await playerRoutes());
  routes.use("/board", await boardRoutes());

  return routes;
};
