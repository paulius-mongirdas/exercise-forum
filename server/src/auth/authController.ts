import { Body, Controller, Post, Route } from "tsoa";
import { User } from "@prisma/client";
import { AuthService } from "./authService";
import { RegisterDto } from "./registerDto";
import { LoginDto } from "./loginDto";
import { TokenDto } from "./tokenDto";

@Route("api")
export class AuthController extends Controller {
    // POST /api/register
    /**
     * Register a user
     * @param user Data object describing a new user
     */
    @Post("register")
    public async register(@Body() user: RegisterDto): Promise<User> {
        return new AuthService().register(user);
    }
    // POST /api/login
    /**
     * Log in a user
     * @param user Data object describing a user
     */
    @Post("login")
    public async login(@Body() user: LoginDto): Promise<{}> {
        return new AuthService().login(user);
    }

    // POST /api/refresh
    /**
     * Refresh a user's token
     * @param refreshToken A refresh token
     */
    @Post("refresh")
    public async refresh(@Body() refreshToken: TokenDto): Promise<{}> {
        return new AuthService().refresh(refreshToken.token);
    }

    // POST /api/logout
    /**
     * Log out a user
     */
    @Post("logout")
    public async logout(@Body() user: LogoutDto): Promise<{}> {
        return new AuthService().logout(user);
    }
}