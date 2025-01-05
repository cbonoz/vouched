import { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { db, profiles, endorsements, accessRequests } from '../../db';

export default async function (fastify: FastifyInstance) {
  fastify.get('/profile/:handle', async (request, reply) => {
    const { handle } = request.params as { handle: string };

    const profile = await db.select()
      .from(profiles)
      .where(eq(profiles.handle, handle))
      .limit(1);

    if (!profile.length) {
      return reply.code(404).send({ error: 'Profile not found' });
    }

    const userVouches = await db.select()
    .from(vouches)

    return {
      ...profile[0],
      vouches: userVouches
    };
  });

  fastify.post('/profile', async (request, reply) => {
    const profileData = request.body as any;

    const result = await db.insert(profiles)
      .values(profileData)
      .returning();

    return result[0];
  });

  // Add other profile-related routes using Drizzle queries...
}
