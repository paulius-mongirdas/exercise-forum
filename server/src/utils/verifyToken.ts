import jwt from "jsonwebtoken";
import { ForbiddenError } from "../errors";

export const verifyTokenWithScopes = (token: string, scopes?: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err: any, decoded: any) => {
            if (err) {
                // check if the error is due to token expiration
                if (err.name === "TokenExpiredError") {
                    // attempt to refresh the token
                    //refresh();
                }
                return reject(new ForbiddenError("JWT verification failed: " + err.message));
            }

            if (scopes && scopes.length > 0) {
                if (!decoded.scopes || !Array.isArray(decoded.scopes)) {
                    return reject(new ForbiddenError("JWT does not contain a valid 'scopes' property."));
                }
                const hasRequiredScope = scopes?.some(scope => decoded.scopes.includes(scope));

                if (!hasRequiredScope) {
                    return reject(new ForbiddenError("JWT does not contain required scope"));
                }
            }
            console.log("Decoded token: ", decoded);
            resolve(decoded);
        });
    });
};

export const verifyRefreshToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
            if (err) {
                return reject(new ForbiddenError("JWT verification failed: " + err.message));
            }
            console.log("Decoded refresh token: ", decoded);
            resolve(decoded);
        });
    });
}