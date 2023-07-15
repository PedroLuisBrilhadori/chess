import { PlayerController, PlayerService } from "./api";
import { PlayerRepository } from "./api/repositories";
import { makeRoutes } from "./lib";

const repository = new PlayerRepository();
const service = new PlayerService(repository);
const controller = new PlayerController(service);

makeRoutes(controller, PlayerController.prototype);
