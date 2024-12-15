import jwt from "jsonwebtoken";
import { ForbiddenError } from "../errors";

export const verifyTokenWithScopes = (token: string, scopes?: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err: any, decoded: any) => {
            if (err) {
                // check if the error is due to token expiration
                if (err.name === "TokenExpiredError") {
                    console.log("Token expired, refreshing token...");
                    return reject(new ForbiddenError("TokenExpiredError"));
                    // TODO : add automatic token refresh for all requests
                    /*axios.post("http://localhost:8000/api/refresh", {
                        token: token
                    }).then((response) => {
                        console.log("Token refreshed successfully");
                        verifyTokenWithScopes(response.data.token.split(" ")[1], scopes);
                    }).catch((error) => {
                        return reject(new ForbiddenError("JWT token refresh failed: " + error.message));
                    });*/
                }
                return reject(new ForbiddenError("JWT verification failed: " + err.message));
            } else if (scopes && scopes.length > 0) {
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
                if (err.name === "TokenExpiredError") {
                    console.log("Refresh token expired");
                    return reject(new ForbiddenError("RefreshTokenExpiredError"));
                }
                return reject(new ForbiddenError("JWT verification failed: " + err.message));
            }
            console.log("Decoded refresh token: ", decoded);
            resolve(decoded);
        });
    });
}