import { Injectable } from "@nestjs/common";
import Users, { UserToCreate } from "../repositories/users.repository";
import { verify } from "argon2";

interface UserToLogin {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  async register(user: UserToCreate) {
    await Users.create(user);
  }

  async login(user: UserToLogin) {
    const _user = await Users.getByEmail(user.email);

    if (!_user) {
      return {
        ok: false,
        message: "No user found",
      };
    }

    const isMatch = await verify(_user.hashedPassword, user.password);

    if (!isMatch) {
      return {
        ok: false,
        message: "Email or password is incorrect",
      };
    }

    // Session Hanlding

    return {
      ok: true,
    };
  }
}
