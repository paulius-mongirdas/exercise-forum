import { User } from "@prisma/client";
import { Body, Controller, Get, Path, Route } from "tsoa";
import { UserService } from "./userService";

@Route("api/users")
export class UserController extends Controller {
    // GET /api/user
    /**
     * Get a user
     */
    @Get("{uuid}")
    public async getUserByUUID(@Path() uuid : string): Promise<User> {
        return new UserService().getUser(uuid);
    }
}
