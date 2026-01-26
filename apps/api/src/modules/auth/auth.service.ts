import { Injectable } from "@nestjs/common";
import Users from "@repos/users.repository";
import { verify } from "argon2";
import Session from "@libs/session";
import UserToLogin from "@dto/user/user-to-login.dto";
import UserToCreate from "@dto/user/user-to-create.dto";

type LoginResult =
  | {
      ok: false;
      message: string;
    }
  | {
      ok: true;
      token: string;
      expiresAt: Date;
    };

@Injectable()
export class AuthService {
  async register(user: UserToCreate) {
    if (user.password.length < 8) {
      return {
        ok: false,
        message: "Password is weak",
      };
    }

    let _user = await Users.getByEmail(user.email);
    if (_user) {
      return {
        ok: false,
        message: "Email is already used",
      };
    }

    _user = await Users.getByUsername(user.email);
    if (_user) {
      return {
        ok: false,
        message: "Username is already used",
      };
    }

    await Users.create(user);

    return {
      ok: true,
    };
  }

  async login(user: UserToLogin): Promise<LoginResult> {
    const _user = await Users.getByEmail(user.email);

    if (!_user) {
      return {
        ok: false,
        message: "No user found",
      };
    }

    const isValid = await verify(_user.hashedPassword, user.password);

    if (!isValid) {
      return {
        ok: false,
        message: "Email or password is incorrect",
      };
    }

    const result = await Session.create(_user.id);

    return { ...result, ok: true };
  }

  async me(token: string) {
    const res = await Session.validate(token);

    return res;
  }
}
