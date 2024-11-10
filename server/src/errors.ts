export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}
export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
    }
}
export class MethodNotAllowedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MethodNotAllowedError";
    }
}