import chalk from "chalk";
import dotenv from "dotenv";
import { ExpressInstance, chessRoutes } from "./api";

dotenv.config();

export const start = async () => {
  const { PORT } = process.env;

  try {
    const app = ExpressInstance();

    app.use("/api", await chessRoutes());

    const port = PORT || 3000;

    app.listen(port, () => {
      const prefix = `${chalk.blue("[API]")} ${chalk.green("|")}`;
      const url = `http://localhost:${port}`;

      console.log(`${prefix} A API foi iniciada com sucesso!`);
      console.log(`${prefix} ${url}`);
    });
  } catch (error) {}
};

start();
