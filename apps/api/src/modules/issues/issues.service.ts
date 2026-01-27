import { Injectable } from "@nestjs/common";
import Issues from "@repos/issues.repository";

@Injectable()
export class IssuesService {
  async me(userId: string) {
    const res = await Issues.getForUser(userId);

    return res;
  }
}
