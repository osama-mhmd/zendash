import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";

import type { Request, Response } from "express";
import AuthGuard from "@guards/auth.guard";

@Controller("projects")
export class ProjectsController {
  constructor(readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post("create")
  async create(
    @Body() { name }: { name: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.projectsService.create({
      name,
      userId: req.user!.id,
    });

    res.status(result.ok ? 200 : 400).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async get(
    @Res() res: Response,
    @Req() req: Request,
    @Param("id") id: string,
  ) {
    const result = await this.projectsService.get({
      projectId: id,
      userId: req.user!.id,
    });
  }
}
