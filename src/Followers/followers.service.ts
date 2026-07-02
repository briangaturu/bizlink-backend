import { eq, and } from "drizzle-orm";
import db from "../drizzle/db";
import { followers } from "../drizzle/schema";

export type TFollowerInsert = typeof followers.$inferInsert;
export type TFollowerSelect = typeof followers.$inferSelect;

// Create Follower
export const createFollowerService = async (
  follower: TFollowerInsert
): Promise<TFollowerSelect> => {
  const [created] = await db
    .insert(followers)
    .values(follower)
    .returning();

  return created;
};

// Get Followers of a User
export const getFollowersService = async (
  userId: string
): Promise<TFollowerSelect[]> => {
  return await db.query.followers.findMany({
    where: eq(followers.followingId, userId),
  });
};

// Get Users that a User is Following
export const getFollowingService = async (
  userId: string
): Promise<TFollowerSelect[]> => {
  return await db.query.followers.findMany({
    where: eq(followers.followerId, userId),
  });
};

// Check If User Follows Another User
export const isFollowingService = async (
  followerId: string,
  followingId: string
): Promise<boolean> => {
  const result = await db.query.followers.findFirst({
    where: and(
      eq(followers.followerId, followerId),
      eq(followers.followingId, followingId)
    ),
  });

  return !!result;
};

// Unfollow User
export const unfollowUserService = async (
  followerId: string,
  followingId: string
): Promise<void> => {
  await db
    .delete(followers)
    .where(
      and(
        eq(followers.followerId, followerId),
        eq(followers.followingId, followingId)
      )
    );
};

// Get Follower Count
export const getFollowerCountService = async (
  userId: string
): Promise<number> => {
  const result = await db.query.followers.findMany({
    where: eq(followers.followingId, userId),
  });

  return result.length;
};

// Get Following Count
export const getFollowingCountService = async (
  userId: string
): Promise<number> => {
  const result = await db.query.followers.findMany({
    where: eq(followers.followerId, userId),
  });

  return result.length;
};
