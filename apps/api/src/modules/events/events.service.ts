import { Injectable } from "@nestjs/common";
import { Events, Projects } from "@repos";

interface EventToGet {
  userId: string;
  projectId: string;
  eventId: string;
}
interface AllEventsToGet {
  userId: string;
  projectId: string;
}

@Injectable()
export class EventsService {
  async create({
    description,
    projectId,
  }: {
    description: string;
    projectId: string;
  }) {
    await Events.create({ description, projectId });

    return {
      ok: true,
    };
  }

  async get({ userId, projectId, eventId }: EventToGet) {
    const { privilege } = await Projects.getPrivilege({ projectId, userId });

    if (!privilege) {
      return {
        ok: false,
        message: "No access",
      };
    }

    const event = await Events.get(eventId);

    return {
      ok: true,
      data: event,
    };
  }
  async getAll({ userId, projectId }: AllEventsToGet) {
    const { privilege } = await Projects.getPrivilege({
      projectId,
      userId,
    });

    if (!privilege) {
      return {
        ok: false,
        message: "No access",
      };
    }

    const events = await Events.getAll(projectId);

    return {
      ok: true,
      data: events,
    };
  }

  async me(userId: string) {
    const res = await Events.getForUser(userId);

    return res;
  }
}
