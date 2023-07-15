import chalk from "chalk";
import dotenv from "dotenv";
import { ExpressInstance, chessRoutes } from "./api";
import { createServer as CreateViteServer } from 'vite';
import path from 'path'
import { readFileSync } from "fs";

dotenv.config();


export const start = async () => {
  const { PORT } = process.env;

  try {
    const app = ExpressInstance();

    app.use("/api", await chessRoutes());

    const vite = await CreateViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        let template = readFileSync(
          path.resolve(__dirname + '/web/index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)

        const { render } = await vite.ssrLoadModule(
          path.resolve(__dirname + "/web/entry-server.jsx")
        )

        const appHtml = await render(url);

        const html = template.replace(`<!--ssr-outlet-->`, appHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (error) {
        vite.ssrFixStacktrace(error as Error)
        next(error)
      }
    })

    const port = PORT || 3000;

    app.listen(port, () => {
      const prefix = `${chalk.blue("[API]")} ${chalk.green("|")}`;
      const url = `http://localhost:${port}`;

      console.log(`${prefix} A API foi iniciada com sucesso!`);
      console.log(`${prefix} ${url}`);
    });
  } catch (error) { }
};

start();
