import "reflect-metadata";
import { RouterGenerator } from "@lib/";
import { BoardController } from "../controllers/";
import { BoardService } from "../services";
import { BoardRepository } from "../repositories";

export async function boardRoutes() {
  const repository = new BoardRepository();
  const service = new BoardService(repository);
  const controller = new BoardController(service);

  const router = new RouterGenerator<BoardController>({
    controller,
    model: BoardController,
    reflect: Reflect,
  });

  return router.make();
}
