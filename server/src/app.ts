import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "../build/routes";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "./errors"
import cors from "cors";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use(cors({ origin: "http://localhost:3000" })); // TODO : change to production URL later

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {

  // TODO : check if id already exists (return 405)
  // posting, patching is not allowed when id is specified in URL
  // deleting is not allowed without id in URL

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      response: "Bad Request (400)",
      details: err.message,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      response: "Unauthorized (401)",
      details: err.message,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).json({
      response: "Forbidden (403)",
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
      details: err.message,
    });
  }

  next();
});