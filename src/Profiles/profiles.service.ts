import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { profiles } from "../drizzle/schema";

export type TProfileInsert = typeof profiles.$inferInsert;
export type TProfileSelect = typeof profiles.$inferSelect;

// Create Profile
export const createProfileService = async (
  profile: TProfileInsert
): Promise<TProfileSelect> => {
  const [createdProfile] = await db
    .insert(profiles)
    .values(profile)
    .returning();

  return createdProfile;
};

// Get Profile By User ID
export const getProfileByUserIdService = async (
  userId: string
): Promise<TProfileSelect | undefined> => {
  return await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });
};

// Get Profile By ID
export const getProfileByIdService = async (
  profileId: string
): Promise<TProfileSelect | undefined> => {
  return await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
  });
};

// Update Profile
export const updateProfileService = async (
  profileId: string,
  updateData: Partial<TProfileInsert>
): Promise<TProfileSelect> => {
  const [updatedProfile] = await db
    .update(profiles)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, profileId))
    .returning();

  return updatedProfile;
};

// Delete Profile
export const deleteProfileService = async (
  profileId: string
): Promise<void> => {
  await db.delete(profiles).where(eq(profiles.id, profileId));
};

// Get All Profiles
export const getAllProfilesService = async (): Promise<
  TProfileSelect[]
> => {
  return await db.query.profiles.findMany();
};
