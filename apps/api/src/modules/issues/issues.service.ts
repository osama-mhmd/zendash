import { Injectable } from "@nestjs/common";
import Issues from "@repos/issues.repository";

@Injectable()
export class IssuesService {
  async get(id: string) {
    const res = await Issues.get(id);

    return res;
  }

  async me(userId: string) {
    const res = await Issues.getForUser(userId);

    return res;
  }
}
