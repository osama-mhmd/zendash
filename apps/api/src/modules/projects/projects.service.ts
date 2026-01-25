import { Project } from "@db/schemas/projects";
import { Injectable } from "@nestjs/common";
import { Projects } from "@repos";

export interface ProjectToGet {
  userId: string;
  projectId: string;
}
export interface ProjectToCreate {
  name: string;
  userId: string;
}
export type Result<T> =
  | {
      ok: false;
      message: string;
    }
  | {
      ok: true;
      data: T;
    };

@Injectable()
export class ProjectsService {
  async create(pr: ProjectToCreate) {
    try {
      const project = await Projects.create(pr);
      await Projects.createPrivilege({
        projectId: project.id,
        userId: pr.userId,
        privilege: "owner",
      });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Something went wrong",
      };
    }
  }

  async get(pr: ProjectToGet): Promise<Result<Project>> {
    const privilege = await Projects.getPrivilege(pr);

    if (!privilege) {
      return {
        ok: false,
        message: "No access",
      };
    }

    const project = await Projects.get(pr.projectId);

    return { ok: true, data: project };
  }

  async me(userId: string) {
    const res = await Projects.getForUser(userId);

    return res;
  }
}
