import { Request } from "express";
import { verifyTokenWithScopes } from "./verifyToken"; // the function you created
import { UnauthorizedError } from "../errors";

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes?: string[]
) => {
  if (securityName === "jwt") {
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided or malformed header");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await verifyTokenWithScopes(token, scopes);
    request.userId = decodedToken.userId; // Assuming userId is the uuid in the token
    request.userRole = decodedToken.scopes[0]; // Assuming the first scope is the role
    return decodedToken; // Returning decoded token so it can be used in the request context if needed
  }

  throw new Error("Unknown security scheme");
};