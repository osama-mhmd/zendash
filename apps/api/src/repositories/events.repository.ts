// Auth & Users services are interconnected. For instance, The auth service
// uses the Users Repoistory, therefore It's here.

import db from "@db";
import { events } from "@db/schemas/events";
import { eq } from "drizzle-orm";
import grc from "src/utils/grs";

const Events = {
  async create({
    projectId,
    description,
  }: {
    projectId: string;
    description: string;
  }) {
    try {
      const id = grc(6);
      await db.insert(events).values({ id, projectId, description });
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
  async getAll(projectId: string) {
    const _events = await db
      .select()
      .from(events)
      .where(eq(events.projectId, projectId));

    return _events;
  },
};

export default Events;
