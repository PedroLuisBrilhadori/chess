import { Router } from "express";
import { PlayerController } from "../controllers/";
import { PlayerService } from "../services";
import { PlayerRepository } from "../repositories";

export async function playerRoutes() {
  const repository = new PlayerRepository();
  const service = new PlayerService(repository);
  const controller = new PlayerController(service);

  const router = Router();

  router.post("/start", (request, response) => {
    controller.startGame({ request, response });
  });

  router.post("/stop", (request, response) => {
    controller.stopGame({ request, response });
  });

  router.post("/pick", (request, response) => {
    controller.pickPiece({ request, response });
  });

  router.post("/move", (request, response) => {
    controller.move({ request, response });
  });

  return router;
}
