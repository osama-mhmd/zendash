import { User } from "@db/schemas/users";
import { Users, Sessions } from "@repos";
import { sign, verify } from "jsonwebtoken";
import grc from "src/utils/grs";

type ValidationResult =
  | {
      ok: false;
      message: string;
    }
  | {
      ok: true;
      user: Prettify<Omit<User, "hashedPassword">>;
      token: string;
      expiresAt?: Date;
    };

const ONE_HOUR = 1000 * 60 * 60;

const Session = {
  REG_EXP_PERIOD: ONE_HOUR,
  MAX_EXP_PERIOD: ONE_HOUR * 24 * 3, // 3 Days

  async create(userId: string) {
    const id = grc(24);
    const expiresAt: Date = this.getExpire();
    const lastVerifiedAt = new Date();

    await Sessions.create({
      id,
      userId,
      expiresAt,
      lastVerifiedAt,
    });

    const token = sign(id, process.env.AUTH_SECRET!);

    return { token, expiresAt };
  },
  async validate(token: string): Promise<ValidationResult> {
    const now = new Date();

    try {
      // Verify that the token is actually a string
      if (typeof token !== "string") throw new Error("Bad token");

      const id = verify(token, process.env.AUTH_SECRET!);

      // Check if it hasn't been verified
      if (typeof id !== "string") throw new Error("Bad token");

      // Retrieving the session for the DB
      const session = await Sessions.get(id);

      if (!session) throw new Error("No session");

      // Check if the session has expired or not
      if (+session.expiresAt < +now) {
        await Sessions.delete(session.id);
        throw new Error("Session expired");
      }

      let expiresAt: undefined | Date;

      // Update the expiration date if you has verified himself during the regular period
      if (+now - +session.lastVerifiedAt >= (this.REG_EXP_PERIOD as number)) {
        expiresAt = this.getExpire();

        await Sessions.update(session.id, {
          lastVerifiedAt: now,
          expiresAt,
        });
      }

      const user = await Users.getById(session.userId);

      return {
        ok: true,
        user: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
          email: user.email,
          fullname: user.fullname,
          isVerified: user.isVerified,
        },
        token,
        expiresAt,
      };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Something went wrong",
      };
    }
  },
  getExpire() {
    return new Date(Date.now() + (this.MAX_EXP_PERIOD as number));
  },
};

export default Session;
