import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "../build/routes";
import { NotFoundError } from "./errors"

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

RegisterRoutes(app);

import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      response: "Bad Request (400)",
      details: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      response: "Not found (404)",
      details: err.message,
    });
  }
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      response: "Validation Failed (422)",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      response: "Internal Server Error (500)",
    });
  }

  next();
});