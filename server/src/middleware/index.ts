import { FastifyReply, FastifyRequest } from "fastify";
import { createClient } from "@supabase/supabase-js";
import { isEmpty } from "../util";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { supabase } from "@/lib/supabase";

export interface VouchedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const requireUser = async (request: FastifyRequest, reply: FastifyReply): Promise<VouchedUser> => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.code(403).send();
  }

  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return reply.code(403).send();
  }

  // Get user from db
  let dbUser = await db.select().from(users).where(eq(users.id, user.id));

  if (!dbUser) {
    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        first_name: user.user_metadata?.firstName,
        last_name: user.user_metadata?.lastName,
      })
      .returning();
    dbUser = newUser as any;
  }

  return dbUser as ;
};
