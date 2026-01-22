import Session from "@libs/session";

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Keys, Users } from "@repos";
import type { Request } from "express";

@Injectable()
export default class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();
    const token = req.cookies["sessionToken"];

    if (!token) {
      const key = req.body.key;

      if (!key) {
        return false;
      }

      const result = await Keys.key(key);
      const user = await Users.getById(result.userId);

      req.user = user;

      return true;
    }

    const result = await Session.validate(token);

    if (!result.ok) return false;

    req.user = result.user;

    return true;
  }
}
