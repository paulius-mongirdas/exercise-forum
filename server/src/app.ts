import express, {json, urlencoded} from "express";
import { RegisterRoutes } from "../build/routes";

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
// ...

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});