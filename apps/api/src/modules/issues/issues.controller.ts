import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { IssuesService } from "./issues.service";

import AuthGuard from "@guards/auth.guard";

import type { Request } from "express";

@Controller("issues")
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @UseGuards(AuthGuard)
  @Get("me")
  async me(@Req() req: Request) {
    const issues = await this.issuesService.me(req.user!.id);

    return { ok: true, data: issues };
  }
}
