import db from "@db";
import { issues, type Issue } from "@db/schemas/issues";
import { projectsPrivileges } from "@db/schemas/projects";
import { eq, getTableColumns } from "drizzle-orm";

type IssueToUpdate = Partial<Omit<Issue, "projectId" | "id">> & {
  id: Issue["id"];
};

const Issues = {
  async create(projectId: string, fingerprintValue: string): Promise<Issue> {
    const [issue] = await db
      .insert(issues)
      .values({
        projectId,
        fingerprintValue,
        lastSeen: new Date(),
      })
      .returning();

    return issue;
  },

  async update(issue: IssueToUpdate): Promise<Issue> {
    const [_issue] = await db
      .update(issues)
      .set(issue)
      .where(eq(issues.id, issue.id))
      .returning();

    return _issue;
  },

  async getByFingerprint(value: string): Promise<Issue | undefined> {
    const [issue] = await db
      .select()
      .from(issues)
      .where(eq(issues.fingerprintValue, value));

    return issue;
  },

  async get(id: string): Promise<Issue | undefined> {
    const [issue] = await db.select().from(issues).where(eq(issues.id, id));

    return issue;
  },

  async getForUser(userId: string) {
    const _issues = await db
      .select({
        ...getTableColumns(issues),
      })
      .from(projectsPrivileges)
      .where(eq(projectsPrivileges.userId, userId))
      .innerJoin(issues, eq(projectsPrivileges.projectId, issues.projectId));

    return _issues;
  },
};

export default Issues;
