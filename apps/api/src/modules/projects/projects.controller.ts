import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

import type { Response } from "express";

@Controller("projects")
export class ProjectsController {
  constructor(readonly projectsService: ProjectsService) {}

  @Post("create")
  async create(@Body() { name }: { name: string }, @Res() res: Response) {
    const response = await this.projectsService.create({ name, userId: "1" });

    res.status(response.ok ? 200 : 400).json(response);
  }

  @Get(":id")
  async get(@Res() res: Response, @Param("id") id: string) {
    const pr = await this.projectsService.get({ projectId: id, userId: "1" });
  }
}
