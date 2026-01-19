import db from "@/db";
import { users, type NewUser, type User } from "@/db/schemas/users";
import { hash } from "argon2";
import { eq } from "drizzle-orm";

export type UserToCreate = Omit<
  NewUser,
  "hashedPassword" | "id" | "isVerified" | "createdAt"
> & { password: string };

const Users = {
  async create({ password, ...user }: UserToCreate) {
    try {
      const hashedPassword = await hash(password);

      await db.insert(users).values({ ...user, hashedPassword });
    } catch (e) {
      console.log("Error Occurred when creating a user, err: ", e);
    }
  },

  async getById(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user;
  },
  async getByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  },
  async getByUsername(username: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return user;
  },

  async update(user: Partial<User>) {},
};

export default Users;
