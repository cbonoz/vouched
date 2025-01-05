CREATE TABLE "endorsements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"message" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"relationship" text,
	"skills" text,
	"social_links" jsonb,
	"endorser_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "endorser_access" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"approved_at" timestamp,
	"deleted_at" timestamp,
	"message" text NOT NULL,
	"requester_email" text NOT NULL,
	"requester_id" uuid,
	"endorser_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"handle" text,
	"image_url" text,
	"title" text,
	"bio" text,
	"agreement_text" text,
	"activated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "endorsements" ADD CONSTRAINT "endorsements_endorser_id_users_id_fk" FOREIGN KEY ("endorser_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endorser_access" ADD CONSTRAINT "endorser_access_requester_id_users_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "endorser_access" ADD CONSTRAINT "endorser_access_endorser_id_users_id_fk" FOREIGN KEY ("endorser_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_endorsements_by_name" ON "endorsements" USING btree ("first_name","last_name","endorser_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_endorsement_access_requester_id_endorser_id" ON "endorser_access" USING btree ("requester_id","endorser_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_endorsement_access_requester_email_endorser_id" ON "endorser_access" USING btree ("requester_email","endorser_id");