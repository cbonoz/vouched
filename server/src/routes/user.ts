import { FastifyInstance } from "fastify";
import { db } from "../lib/supabase";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export default {

  registerRoutes: (fastify: FastifyInstance) => {
    fastify.get("/user/me", async (request: any, reply) => {
      const user = await db.select().from(users).where(eq(users.id, request.user.id));
      return user[0] || null;
    });

    fastify.patch("/user/me", async (request: any, reply) => {
      const updates = request.body;
      const updatedUser = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, request.user.id))
        .returning();
      return updatedUser[0];
    });
  }
};

