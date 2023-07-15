import { PlayerController, PlayerService, PlayerRepository } from "@api/";
import { RouterGenerator } from "./express";

const repository = new PlayerRepository();
const service = new PlayerService(repository);
const controller = new PlayerController(service);

const router = new RouterGenerator<PlayerController>({
  controller,
  model: PlayerController,
  reflect: Reflect,
});

router.make();
