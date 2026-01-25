import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import type { Request, Response } from "express";
import AuthGuard from "@guards/auth.guard";

interface EventToCreate {
  description: string;
}
interface EventToGet {
  projectId: string;
}

@Controller("events")
export class EventsController {
  constructor(readonly eventsService: EventsService) {}

  @Post("create")
  async create(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { description }: EventToCreate,
    @Query("projectId") projectId: string,
  ) {
    if (!description || !projectId) res.status(400).json({ ok: false });

    const result = await this.eventsService.create({
      description,
      projectId,
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

  @UseGuards(AuthGuard)
  @Post("me")
  async me(@Req() req: Request, @Res() res: Response) {
    const userId = req.user!.id;

    const result = await this.eventsService.me(userId);

    res.status(200).send({ ok: true, data: result });
  }
}
