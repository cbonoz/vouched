import { FastifyReply, FastifyRequest } from "fastify";
import { createClient } from '@supabase/supabase-js';
import { getInstance } from "../server/instance";
import { isEmpty } from "../util";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export interface VouchedUser {
  dbId: number;
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

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return reply.code(403).send();
  }

  // Get user id from db
  const instance = getInstance();
  let { rows } = await instance.pg.query("SELECT * FROM users WHERE external_id = $1", [user.id]);
  if (isEmpty(rows)) {
    // Create user
    await instance.pg.query("INSERT INTO users (external_id, email, first_name, last_name) VALUES ($1, $2, $3, $4)", [
      user.id,
      user.email,
      user.user_metadata?.firstName,
      user.user_metadata?.lastName,
    ]);
    const result = await instance.pg.query("SELECT * FROM users WHERE external_id = $1", [user.id]);
    rows = result.rows;
  }

  return {
    dbId: rows[0].id,
    id: user.id,
    email: user.email,
    firstName: user.user_metadata?.firstName,
    lastName: user.user_metadata?.lastName
  };
};
