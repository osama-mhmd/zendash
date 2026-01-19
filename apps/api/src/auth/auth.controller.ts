import { Controller, Post } from "@nestjs/common";
// import type { Response } from "express";

@Controller("auth")
export class AuthController {
  @Post("login")
  login() {}

  @Post("register")
  register() {}
}
