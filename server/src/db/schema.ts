import { pgTable, uuid, text, timestamp, bigint, jsonb, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  handle: text("handle"),
  imageUrl: text("image_url"),
  title: text("title"),
  bio: text("bio"),
  agreementText: text("agreement_text"),
  activatedAt: timestamp("activated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export const endorsements = pgTable(
  "endorsements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    deleted_at: timestamp("deleted_at"),
    message: text("message").notNull(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    relationship: text("relationship"),
    skills: text("skills"),
    social_links: jsonb("social_links"),
    endorser_user_id: uuid("endorser_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    nameEndorserIdx: uniqueIndex("idx_endorsements_by_name").on(
      table.first_name,
      table.last_name,
      table.endorser_user_id
    ),
  })
);
export const endorserAccess = pgTable(
  "endorser_access",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    approved_at: timestamp("approved_at"),
    deleted_at: timestamp("deleted_at"),
    message: text("message").notNull(),
    requester_email: text("requester_email").notNull(),
    requester_id: uuid("requester_id").references(() => users.id),
    endorser_id: uuid("endorser_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    requesterEndorserIdx: uniqueIndex("idx_endorsement_access_requester_id_endorser_id").on(
      table.requester_id,
      table.endorser_id
    ),
    emailEndorserIdx: uniqueIndex("idx_endorsement_access_requester_email_endorser_id").on(
      table.requester_email,
      table.endorser_id
    ),
  })
);
