import { Body, Controller, Post, Req, Res } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
import UserToLogin from "@dto/user/user-to-login.dto";
import UserToCreate from "@dto/user/user-to-create.dto";

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

  @Post("me")
  async me(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies["sessionToken"];
    const result = await this.authService.me(token);

    res.status(result.ok ? 200 : 400).send(result);
  }
}
