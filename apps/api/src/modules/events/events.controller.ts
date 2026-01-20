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
import { EventsService } from "./events.service";
import type { Request, Response } from "express";
import AuthGuard from "@guards/auth.guard";

interface EventToCreate {
  projectId: string;
  description: string;
}
interface EventToGet {
  projectId: string;
}

@Controller("events")
export class EventsController {
  constructor(readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Res() res: Response,
    @Req() req: Request,
    @Body() ev: EventToCreate,
  ) {
    if (!ev.description || !ev.projectId) res.status(400).json({ ok: false });

    const result = await this.eventsService.create({
      userId: req.user!.id,
      ...ev,
    });

    res.status(result.ok ? 200 : 400).json(result);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async get(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { projectId }: EventToGet,
    @Param("id") eventId: string,
  ) {
    if (!projectId || !eventId) res.status(400).json({ ok: false });

    const userId = req.user!.id;
    const result = await this.eventsService.get({ userId, eventId, projectId });

    res.status(result.ok ? 200 : 400).json(result);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { projectId }: EventToGet,
  ) {
    if (!projectId) res.status(400).json({ ok: false });

    const result = await this.eventsService.getAll({
      userId: req.user!.id,
      projectId,
    });

    res.status(result.ok ? 200 : 400).json(result);
  }
}
