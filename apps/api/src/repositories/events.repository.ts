// Auth & Users services are interconnected. For instance, The auth service
// uses the Users Repoistory, therefore It's here.

import db from "@db";
import { events } from "@db/schemas/events";
import { projectsPrivileges } from "@db/schemas/projects";
import EventToCreate from "@dto/event/event-to-create.dto";
import { eq, getTableColumns } from "drizzle-orm";
import grc from "src/utils/grs";
import Projects from "./projects.repository";
import Issues from "./issues.repository";
import { issues } from "@db/schemas/issues";

const Events = {
  async create({ projectId, ...event }: EventToCreate & { projectId: string }) {
    try {
      const id = grc(6);
      await db.insert(events).values({
        ...event,
        id,
        projectId,
      });
    } catch (e) {
      console.log("Error Occurred when creating a user, err: ", e);
    }
  },

  async get(id: string) {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    return event;
  },
  async getForUser(userId: string) {
    const _events = await db
      .select({
        ...getTableColumns(events),
      })
      .from(projectsPrivileges)
      .where(eq(projectsPrivileges.userId, userId))
      .innerJoin(events, eq(projectsPrivileges.projectId, events.projectId));

    return _events;
  },
  async getAll(projectId: string) {
    const _events = await db
      .select()
      .from(events)
      .where(eq(events.projectId, projectId));

    return _events;
  },
  async groupByIssue(issueId: string) {
    const issue = await Issues.get(issueId);

    if (!issue) return;

    const project = await Projects.get(issue.projectId);

    if (!project) return;

    const _events = await db
      .select()
      .from(events)
      .where(eq(events[project.fingerprint], issue.fingerprintValue));

    return _events;
  },
};

export default Events;
