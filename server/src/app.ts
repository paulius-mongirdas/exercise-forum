import { urlencoded } from "express";
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
app.use(express.json()); // For parsing application/json
app.use(cors({ origin: "http://localhost:3000" })); // TODO : change to production URL later

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | any {

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
      response: "Not Found (404)",
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
      //details: err.message,
    });
  }

  // Pass to next middleware if no matching error handler
  next();
});

// If no other error was matched, it means a 405 error (probably)
app.use((_err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | any => {
  const method = req.method.toUpperCase();
  
  // Add condition for methods you want to handle, for example:
  const allowedMethods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

  if (!allowedMethods.includes(method)) {
    return res.status(405).json({
      response: "Method Not Allowed (405)",
      details: `Cannot ${method} ${req.path}`,
    });
  }

  next();
});