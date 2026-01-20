import Session from "@libs/session";

import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

@Injectable()
export default class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();
    const token = req.cookies["sessionToken"];

    const result = await Session.validate(token);

    if (!result.ok) return false;

    // @ts-expect-error
    req.user = result.user;

    return true;
  }
}
