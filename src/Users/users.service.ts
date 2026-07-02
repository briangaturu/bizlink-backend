import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { users, listings, followers } from "../drizzle/schema";

export type TUserInsert = typeof users.$inferInsert;
export type TUserSelect = typeof users.$inferSelect;

// Create User
export const createUserService = async (
  user: TUserInsert
): Promise<TUserSelect> => {
  const [createdUser] = await db
    .insert(users)
    .values(user)
    .returning();

  return createdUser;
};

// Get User By Email
export const getUserByEmailService = async (
  email: string
): Promise<TUserSelect | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

// Get User By Username
export const getUserByUsernameService = async (
  username: string
): Promise<TUserSelect | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
  });
};

// Get User By ID
export const getUserByIdService = async (
  userId: string
): Promise<TUserSelect | undefined> => {
  return await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });
};

// Get All Users
export const getAllUsersService = async (): Promise<
  TUserSelect[]
> => {
  return await db.query.users.findMany();
};

// Update User
export const updateUserService = async (
  userId: string,
  updateData: Partial<TUserInsert>
): Promise<TUserSelect> => {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(users.userId, userId))
    .returning();

  return updatedUser;
};

// Update User Password
export const updateUserPasswordService = async (
  userId: string,
  passwordHash: string
): Promise<void> => {
  await db
    .update(users)
    .set({
      password: passwordHash,
      updatedAt: new Date(),
    })
    .where(eq(users.userId, userId));
};

// Delete User
export const deleteUserService = async (
  userId: string
): Promise<void> => {
  await db.delete(users).where(eq(users.userId, userId));
};

// Verify User
export const verifyUserService = async (
  userId: string
): Promise<void> => {
  await db
    .update(users)
    .set({
      isVerified: true,
      updatedAt: new Date(),
    })
    .where(eq(users.userId, userId));
};

// Deactivate User
export const deactivateUserService = async (
  userId: string
): Promise<void> => {
  await db
    .update(users)
    .set({
      isActive: false,
      updatedAt: new Date(),
    })
    .where(eq(users.userId, userId));
};

// Activate User
export const activateUserService = async (
  userId: string
): Promise<void> => {
  await db
    .update(users)
    .set({
      isActive: true,
      updatedAt: new Date(),
    })
    .where(eq(users.userId, userId));
};

/* =========================
   USER STATISTICS
========================= */

export interface UserStats {
  userId: string;
  username: string;
  totalListings: number;
  activeListings: number;
  followers: number;
  isVerified: boolean;
}

export interface SellerStats extends UserStats {
  completionRate: number; // percentage
  rating: number; // average rating
}

// Get User Statistics
export const getUserStatsService = async (
  userId: string
): Promise<UserStats | null> => {
  const user = await getUserByIdService(userId);
  if (!user) return null;

  // Count listings
  const userListings = await db.query.listings.findMany({
    where: eq(listings.userId, userId),
  });

  const totalListings = userListings.length;
  const activeListings = userListings.filter(
    (l) => l.status === "ACTIVE"
  ).length;

  // Count followers
  const userFollowers = await db.query.followers.findMany({
    where: eq(followers.followingId, userId),
  });

  return {
    userId,
    username: user.username,
    totalListings,
    activeListings,
    followers: userFollowers.length,
    isVerified: user.isVerified ?? false,
  };
};

// Get Seller Statistics
export const getSellerStatsService = async (
  sellerId: string
): Promise<SellerStats | null> => {
  const userStats = await getUserStatsService(sellerId);
  if (!userStats) return null;

  // Calculate completion rate (sold listings / total)
  const sellerListings = await db.query.listings.findMany({
    where: eq(listings.userId, sellerId),
  });

  const soldCount = sellerListings.filter(
    (l) => l.status === "SOLD"
  ).length;

  const completionRate =
    sellerListings.length > 0
      ? (soldCount / sellerListings.length) * 100
      : 0;

  // TODO: Get average rating from reviews table once created
  // For now returning mock rating
  const rating = 4.5;

  return {
    ...userStats,
    completionRate: Math.round(completionRate),
    rating,
  };
};

// Get Top Sellers
export const getTopSellersService = async (
  limit: number = 10
): Promise<SellerStats[]> => {
  const allUsers = await getAllUsersService();

  const sellerStats: SellerStats[] = [];

  for (const user of allUsers) {
    const stats = await getSellerStatsService(
      user.userId
    );
    if (stats && stats.activeListings > 0) {
      sellerStats.push(stats);
    }
  }

  // Sort by active listings, then followers
  sellerStats.sort((a, b) => {
    if (b.activeListings !== a.activeListings) {
      return b.activeListings - a.activeListings;
    }
    return b.followers - a.followers;
  });

  return sellerStats.slice(0, limit);
};
