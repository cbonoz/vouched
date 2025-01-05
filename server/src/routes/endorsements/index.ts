import { requireUser } from "../../middleware";
import { Endorsement } from "../../types";
import { sendNewApprovalEmail } from "../../lib/email";
import { FastifyInstance } from "fastify";
import { createRequestConfig } from "../../util";
import { db } from "../../db";
import { users, endorsements } from "../../db/schema";
import { eq, and, isNull } from "drizzle-orm";

const registerRoutes = (instance: FastifyInstance) => {
  instance.register(
    (api, opts, done) => {
      api.get("/:handle", async (request, reply) => {
        const { handle } = request.params as any;
        const { offset, limit, includeUser } = request.query as { offset: number; limit: number; includeUser: boolean };

        const handleUser = await db.query.users.findFirst({
          where: eq(users.handle, handle)
        });

        if (!handleUser) {
          return reply.code(404).send();
        }

        const endorsementsList = await db.query.endorsements.findMany({
          where: and(
            eq(endorsements.user_id, handleUser.id),
            isNull(endorsements.deleted_at)
          ),
          limit: limit,
          offset: offset
        });

        const response: any = {
          endorsements: endorsementsList,
        };
        if (includeUser) {
          response.user = handleUser;
        }

        return response;
      });

      api.delete("/:endorsementId", async (request, reply) => {
        const user = await requireUser(request, reply);
        const { endorsementId } = request.params as any;

        const endorsement = await db.query.endorsements.findFirst({
          where: and(
            eq(endorsements.id, endorsementId),
            eq(endorsements.user_id, user.dbId)
          )
        });

        if (!endorsement) {
          return reply.code(403).send();
        }

        await db.update(endorsements)
          .set({ deleted_at: new Date() })
          .where(eq(endorsements.id, endorsementId));

        return {
          endorsementId,
          message: "Endorsement deleted",
        };
      });

      api.get("/pending", async (request, reply) => {
        const user = await requireUser(request, reply);

        const pendingEndorsements = await db.query.endorsements.findMany({
          where: and(
            eq(endorsements.user_id, user.dbId),
            isNull(endorsements.approved_at),
            isNull(endorsements.deleted_at)
          )
        });

        return {
          endorsements: pendingEndorsements,
        };
      });

      api.post("/ack/:endorsementId", async (request, reply) => {
        const user = await requireUser(request, reply);
        const { endorsementId } = request.params as any;
        const { action } = request.body as { action: string };

        if (action !== 'approve' && action !== 'reject') {
          return reply.code(400).send({ error: 'Invalid action' });
        }

        const endorsement = await db.query.endorsements.findFirst({
          where: and(
            eq(endorsements.id, endorsementId),
            eq(endorsements.user_id, user.dbId)
          )
        });

        if (!endorsement) {
          return reply.code(404).send({ error: 'Endorsement not found' });
        }

        await db.update(endorsements)
          .set(action === 'reject'
            ? { deleted_at: new Date() }
            : { approved_at: new Date() }
          )
          .where(eq(endorsements.id, endorsementId));

        return { endorsementId, action };
      });

      api.post("", createRequestConfig(1), async (request, reply) => {
        const endorsement = request.body as Endorsement;
        const { handle } = request.params as any;

        const handleUser = await db.query.users.findFirst({
          where: eq(users.handle, handle)
        });

        if (!handleUser) {
          return reply.code(403).send();
        }

        const [newEndorsement] = await db.insert(endorsements)
          .values({
            handle,
            user_id: handleUser.id,
            endorser_id: endorsement.endorser_id,
            message: endorsement.message
          })
          .returning();

        sendNewApprovalEmail(handleUser.email, handle);

        return {
          endorsement: { ...endorsement, id: newEndorsement.id },
        };
      });

      done();
    },
    { prefix: "/endorsements" }
  );
};

export default {
  registerRoutes,
};
