import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { profileViews } from "../drizzle/schema";

export type TProfileViewInsert = typeof profileViews.$inferInsert;
export type TProfileViewSelect = typeof profileViews.$inferSelect;

// Create Profile View
export const createProfileViewService = async (
  view: TProfileViewInsert
): Promise<TProfileViewSelect> => {
  const [created] = await db
    .insert(profileViews)
    .values(view)
    .returning();

  return created;
};

// Get All Views for a Profile
export const getProfileViewsService = async (
  profileOwnerId: string
): Promise<TProfileViewSelect[]> => {
  return await db.query.profileViews.findMany({
    where: eq(profileViews.profileOwnerId, profileOwnerId),
  });
};

// Get View Count for a Profile
export const getProfileViewCountService = async (
  profileOwnerId: string
): Promise<number> => {
  const result = await db.query.profileViews.findMany({
    where: eq(profileViews.profileOwnerId, profileOwnerId),
  });

  return result.length;
};

// Get All Views by a User
export const getProfileViewsByUserService = async (
  userId: string
): Promise<TProfileViewSelect[]> => {
  return await db.query.profileViews.findMany({
    where: eq(profileViews.viewerId, userId),
  });
};

// Get Profile View by ID
export const getProfileViewByIdService = async (
  viewId: string
): Promise<TProfileViewSelect | undefined> => {
  return await db.query.profileViews.findFirst({
    where: eq(profileViews.id, viewId),
  });
};

// Delete Profile View
export const deleteProfileViewService = async (
  viewId: string
): Promise<void> => {
  await db
    .delete(profileViews)
    .where(eq(profileViews.id, viewId));
};
