import { Body, Controller, Post, Res } from "@nestjs/common";

import type { AuthService, UserToLogin } from "./auth.service";
import type { Response } from "express";
import type { UserToCreate } from "@app/repositories/users.repository";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: UserToLogin, @Res() res: Response) {
    const response = await this.authService.login(body);

    if (!response.ok) {
      res.send(response);
    }

    res.cookie("sessionToken", response.token);
    res.send({ ok: true });
  }

  @Post("register")
  async register(@Body() body: UserToCreate, @Res() res: Response) {
    const response = await this.authService.register(body);

    res.send(response);
  }
}
