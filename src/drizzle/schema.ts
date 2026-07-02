import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* =========================
   ENUMS
========================= */

export const userRoleEnum = pgEnum("user_role", [
  "USER",
  "ADMIN",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "ACTIVE",
  "PAUSED",
  "SOLD",
]);

export const listingConditionEnum = pgEnum("listing_condition", [
  "NEW",
  "USED",
  "REFURBISHED",
  "NOT_APPLICABLE",
]);

export const reportStatusEnum = pgEnum("report_status", [
  "PENDING",
  "REVIEWED",
  "RESOLVED",
]);

export const verificationStatusEnum = pgEnum(
  "verification_status",
  ["PENDING", "APPROVED", "REJECTED"]
);

/* =========================
   USERS
========================= */

export const users = pgTable("users", {
  userId: uuid("id").primaryKey().defaultRandom(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),

  username: varchar("username", { length: 50 })
    .unique()
    .notNull(),

  email: varchar("email", { length: 150 })
    .unique()
    .notNull(),

  phone: varchar("phone", { length: 20 }).unique(),

  password: text("password").notNull(),

  role: userRoleEnum("role")
    .default("USER")
    .notNull(),

  isVerified: boolean("is_verified")
    .default(false),

  isActive: boolean("is_active")
    .default(true),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   PROFILES
========================= */

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  bio: text("bio"),

  location: varchar("location", {
    length: 150,
  }),

  profileImage: text("profile_image"),

  whatsapp: varchar("whatsapp", {
    length: 30,
  }),

  instagram: varchar("instagram", {
    length: 100,
  }),

  facebook: varchar("facebook", {
    length: 100,
  }),

  tiktok: varchar("tiktok", {
    length: 100,
  }),

  linkedin: varchar("linkedin", {
    length: 100,
  }),

  website: varchar("website", {
    length: 255,
  }),

  profileCompletion: integer("profile_completion")
    .default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   CATEGORIES
========================= */

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", {
    length: 100,
  })
    .unique()
    .notNull(),

  icon: varchar("icon", {
    length: 255,
  }),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   SUBCATEGORIES
========================= */

export const subcategories = pgTable("subcategories", {
  id: uuid("id").primaryKey().defaultRandom(),

  categoryId: uuid("category_id")
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   LISTINGS
========================= */

export const listings = pgTable("listings", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  categoryId: uuid("category_id")
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  subcategoryId: uuid("subcategory_id")
    .references(() => subcategories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description").notNull(),

  price: numeric("price", {
    precision: 12,
    scale: 2,
  }),

  condition: listingConditionEnum("condition")
    .default("NOT_APPLICABLE"),

  location: varchar("location", {
    length: 150,
  }),

  views: integer("views")
    .default(0),

  isFeatured: boolean("is_featured")
    .default(false),

  status: listingStatusEnum("status")
    .default("ACTIVE"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =========================
   LISTING IMAGES
========================= */

export const listingImages = pgTable("listing_images", {
  id: uuid("id").primaryKey().defaultRandom(),

  listingId: uuid("listing_id")
    .references(() => listings.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  imageUrl: text("image_url").notNull(),
});

/* =========================
   SAVED LISTINGS
========================= */

export const savedListings = pgTable("saved_listings", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  listingId: uuid("listing_id")
    .references(() => listings.id, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   FOLLOWERS
========================= */

export const followers = pgTable("followers", {
  id: uuid("id").primaryKey().defaultRandom(),

  followerId: uuid("follower_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  followingId: uuid("following_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   LISTING VIEWS
========================= */

export const listingViews = pgTable("listing_views", {
  id: uuid("id").primaryKey().defaultRandom(),

  listingId: uuid("listing_id")
    .references(() => listings.id, {
      onDelete: "cascade",
    })
    .notNull(),

  viewerId: uuid("viewer_id")
    .references(() => users.userId, {
      onDelete: "set null",
    }),

  viewedAt: timestamp("viewed_at").defaultNow(),
});

/* =========================
   PROFILE VIEWS
========================= */

export const profileViews = pgTable("profile_views", {
  id: uuid("id").primaryKey().defaultRandom(),

  profileOwnerId: uuid("profile_owner_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  viewerId: uuid("viewer_id")
    .references(() => users.userId, {
      onDelete: "set null",
    }),

  viewedAt: timestamp("viewed_at").defaultNow(),
});

/* =========================
   REPORTS
========================= */

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),

  reporterId: uuid("reporter_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  listingId: uuid("listing_id")
    .references(() => listings.id, {
      onDelete: "cascade",
    })
    .notNull(),

  reason: text("reason").notNull(),

  status: reportStatusEnum("status")
    .default("PENDING"),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   NOTIFICATIONS
========================= */

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
    })
    .notNull(),

  title: varchar("title", {
    length: 150,
  }).notNull(),

  message: text("message").notNull(),

  type: varchar("type", {
    length: 50,
  }).notNull(),

  isRead: boolean("is_read")
    .default(false),

  link: varchar("link", {
    length: 255,
  }),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   VERIFICATION REQUESTS
========================= */

export const verificationRequests = pgTable(
  "verification_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.userId, {
        onDelete: "cascade",
      })
      .notNull(),

    documentUrl: text("document_url"),

    status: verificationStatusEnum("status")
      .default("PENDING"),

    adminNotes: text("admin_notes"),

    createdAt: timestamp("created_at").defaultNow(),
  }
);

/* =========================
   RELATIONS
========================= */

export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    profile: one(profiles, {
      fields: [users.userId],
      references: [profiles.userId],
    }),

    listings: many(listings),

    notifications: many(notifications),

    savedListings: many(savedListings),

    followers: many(followers, {
      relationName: "followers",
    }),

    following: many(followers, {
      relationName: "following",
    }),

    verificationRequests: many(
      verificationRequests
    ),
  })
);

export const profilesRelations = relations(
  profiles,
  ({ one }) => ({
    user: one(users, {
      fields: [profiles.userId],
      references: [users.userId],
    }),
  })
);

export const categoriesRelations = relations(
  categories,
  ({ many }) => ({
    subcategories: many(subcategories),
    listings: many(listings),
  })
);

export const subcategoriesRelations = relations(
  subcategories,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [subcategories.categoryId],
      references: [categories.id],
    }),

    listings: many(listings),
  })
);

export const listingsRelations = relations(
  listings,
  ({ one, many }) => ({
    user: one(users, {
      fields: [listings.userId],
      references: [users.userId],
    }),

    category: one(categories, {
      fields: [listings.categoryId],
      references: [categories.id],
    }),

    subcategory: one(subcategories, {
      fields: [listings.subcategoryId],
      references: [subcategories.id],
    }),

    images: many(listingImages),

    savedBy: many(savedListings),

    views: many(listingViews),

    reports: many(reports),
  })
);

export const listingImagesRelations = relations(
  listingImages,
  ({ one }) => ({
    listing: one(listings, {
      fields: [listingImages.listingId],
      references: [listings.id],
    }),
  })
);

/* =========================
   TYPES
========================= */

export type TUserSelect = typeof users.$inferSelect;
export type TUserInsert = typeof users.$inferInsert;

export type TProfileSelect = typeof profiles.$inferSelect;
export type TProfileInsert = typeof profiles.$inferInsert;

export type TCategorySelect =
  typeof categories.$inferSelect;
export type TCategoryInsert =
  typeof categories.$inferInsert;

export type TSubcategorySelect =
  typeof subcategories.$inferSelect;
export type TSubcategoryInsert =
  typeof subcategories.$inferInsert;

export type TListingSelect =
  typeof listings.$inferSelect;
export type TListingInsert =
  typeof listings.$inferInsert;