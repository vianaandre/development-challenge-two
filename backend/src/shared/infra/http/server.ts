import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";

import "express-async-errors";
import "@shared/infra/typeorm";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log("Server is running 🔥");
});

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: err.message,
  });
});
