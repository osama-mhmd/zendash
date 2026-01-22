import db from "@db";
import { keys } from "@db/schemas/keys";
import { eq } from "drizzle-orm";
import grc from "src/utils/grs";

const Keys = {
  async create({ projectId }: { projectId: string }) {
    const key = grc(24);
    await db.insert(keys).values({ key, projectId });
    return key;
  },

  async get({ projectId }: { projectId: string }) {
    const [key] = await db
      .select()
      .from(keys)
      .where(eq(keys.projectId, projectId))
      .limit(1);

    return key;
  },
};

export default Keys;
