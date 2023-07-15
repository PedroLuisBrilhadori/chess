import express from "express";
import cors from "cors";

export const ExpressInstance = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};
