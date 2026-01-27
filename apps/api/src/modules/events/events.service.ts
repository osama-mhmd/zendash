import EventToCreate from "@dto/event/event-to-create.dto";
import { Injectable } from "@nestjs/common";
import { Events, Projects } from "@repos";
import Issues from "@repos/issues.repository";

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
  async create(ev: EventToCreate & { projectId: string }) {
    const project = await Projects.get(ev.projectId);

    if (!project) return { ok: false };

    await Events.create(ev);

    const fingerprintValue = ev[project.fingerprint];

    const issue = await Issues.getByFingerprint(fingerprintValue);

    if (!issue) {
      await Issues.create(ev.projectId, fingerprintValue);
    }

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

  async getByIssue({ issueId }: { issueId: string }) {
    const events = await Events.groupByIssue(issueId);

    return { ok: true, data: events };
  }

  async me(userId: string) {
    const res = await Events.getForUser(userId);

    return res;
  }
}
