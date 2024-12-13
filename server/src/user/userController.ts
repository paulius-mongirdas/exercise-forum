import { User } from "@prisma/client";
import { Body, Controller, Get, Path, Route, Security, Request } from "tsoa";
import { UserService } from "./userService";

@Route("api/users")
export class UserController extends Controller {
    // GET /api/users/me
    /**
     * Get the current user
     */
    @Security("jwt", ["admin", "user"])
    @Get("me")
    public async getCurrentUser(@Request() request: any): Promise<User> {
        return new UserService().getUser(request.userId);
    }
    // GET /api/user
    /**
     * Get a user
     */
    @Get("{uuid}")
    public async getUserByUUID(@Path() uuid : string): Promise<User> {
        return new UserService().getUser(uuid);
    }
}
