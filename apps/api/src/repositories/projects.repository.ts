import db from "@db";
import {
  projects,
  projectsPrivileges,
  type Privilege,
} from "@db/schemas/projects";
import { and, eq } from "drizzle-orm";

const Projects = {
  async create({ name, userId }: { name: string; userId: string }) {
    try {
      const [project] = await db.insert(projects).values({ name }).returning();
      await db.insert(projectsPrivileges).values({
        projectId: project.id,
        userId: userId,
        privilege: "owner",
      });
    } catch (e) {
      console.log("Error Occurred when creating a user, err: ", e);
    }
  },
  async createPrivilege({
    userId,
    projectId,
    privilege,
  }: {
    userId: string;
    projectId: string;
    privilege: Privilege;
  }) {
    await db.insert(projectsPrivileges).values({
      projectId: projectId,
      userId: userId,
      privilege,
    });
  },

  async get(id: string) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return project;
  },
  async getPrivilege({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    const [priv] = await db
      .select()
      .from(projectsPrivileges)
      .where(
        and(
          eq(projectsPrivileges.projectId, projectId),
          eq(projectsPrivileges.userId, userId),
        ),
      )
      .limit(1);

    return priv;
  },
};

export default Projects;
