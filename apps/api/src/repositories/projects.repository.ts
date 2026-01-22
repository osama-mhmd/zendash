import db from "@db";
import {
  projects,
  projectsPrivileges,
  type Privilege,
} from "@db/schemas/projects";
import { and, eq } from "drizzle-orm";
import { ProjectToCreate } from "@modules/projects/projects.service";
import { keys } from "@db/schemas/keys";

const Projects = {
  async create({ name }: ProjectToCreate) {
    const [project] = await db.insert(projects).values({ name }).returning();
    return project;
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
  async getPrivileges({ userId }: { userId: string }) {
    const privs = await db
      .select()
      .from(projectsPrivileges)
      .where(eq(projectsPrivileges.userId, userId));

    return privs;
  },
  async getForUser(userId: string) {
    const _projects = await db
      .select({
        projectId: projects.id,
        projectName: projects.name,
        userId: projectsPrivileges.userId,
        projectKey: keys.key,
      })
      .from(projectsPrivileges)
      .where(eq(projectsPrivileges.userId, userId))
      .innerJoin(projects, eq(projectsPrivileges.projectId, projects.id))
      .leftJoin(
        keys,
        and(
          eq(projectsPrivileges.projectId, keys.projectId),
          eq(projectsPrivileges.userId, keys.userId),
        ),
      );

    return _projects;
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
