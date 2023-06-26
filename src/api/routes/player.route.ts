import "reflect-metadata";
import { RouterGenerator } from "../../lib";
import { PlayerController } from "../controllers/";
import { PlayerService } from "../services";
import { PlayerRepository } from "../repositories";

export async function playerRoutes() {
  const repository = new PlayerRepository();
  const service = new PlayerService(repository);
  const controller = new PlayerController(service);

  const router = new RouterGenerator<PlayerController>({
    controller,
    model: PlayerController,
    reflect: Reflect,
  });

  return router.make();
}
