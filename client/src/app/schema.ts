import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  integer,
  primaryKey,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const statusEnum = pgEnum("status", ["single", "married"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow(),
  keepSignedIn: boolean("keepSignedIn").default(false),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const accounts = pgTable(
  "accounts",
  {
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  avatar: text("avatar"),
  born: timestamp("born", { mode: "date" }),
  status: statusEnum("status"),
  job: text("job"),
  address: text("address"),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
