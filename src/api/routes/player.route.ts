import { makeRoutes } from "../../lib";
import { PlayerController } from "../controllers/";
import { PlayerService } from "../services";
import { PlayerRepository } from "../repositories";

export async function playerRoutes() {
  const repository = new PlayerRepository();
  const service = new PlayerService(repository);
  const controller = new PlayerController(service);

  return makeRoutes(controller, PlayerController.prototype);
}
