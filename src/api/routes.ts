import { Router } from "express";
import { playerRoutes } from "./routes/player.route";

export const chessRoutes = async () => {
  const routes = Router();

  routes.use("/player", await playerRoutes());

  return routes;
};
