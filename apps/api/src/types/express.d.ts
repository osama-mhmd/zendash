import type { User } from "@db/schemas/users";

declare module "express" {
  interface Request {
    user?: User;
  }
}
