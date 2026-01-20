// Auth & Users services are interconnected. For instance, The auth service
// uses the Users Repoistory, therefore It's here.

import db from "@db";
import { sessions, type NewSession, type Session } from "@db/schemas/sessions";
import { eq } from "drizzle-orm";

interface UpdatableFiedls {
  lastVerifiedAt?: Session["lastVerifiedAt"];
  expiresAt?: Session["expiresAt"];
}

const Sessions = {
  async create(session: NewSession) {
    try {
      await db.insert(sessions).values(session);
    } catch (e) {
      console.log("Error Occurred when creating a user, err: ", e);
    }
  },

  async get(id: string) {
    const [user] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1);

    return user;
  },

  async update(id: string, session: UpdatableFiedls) {
    await db.update(sessions).set(session).where(eq(sessions.id, id));
  },

  async delete(id: string) {
    await db.delete(sessions).where(eq(sessions.id, id));
  },
};

export default Sessions;
