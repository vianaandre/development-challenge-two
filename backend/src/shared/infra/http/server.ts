import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";

import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log("Server is running 🍎");
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: err.message,
    });
  }
);
