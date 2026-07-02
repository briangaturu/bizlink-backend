import { eq, and } from "drizzle-orm";
import db from "../drizzle/db";
import { savedListings } from "../drizzle/schema";

export type TSavedListingInsert = typeof savedListings.$inferInsert;
export type TSavedListingSelect = typeof savedListings.$inferSelect;

// Create Saved Listing
export const createSavedListingService = async (
  savedListing: TSavedListingInsert
): Promise<TSavedListingSelect> => {
  const [created] = await db
    .insert(savedListings)
    .values(savedListing)
    .returning();

  return created;
};

// Get Saved Listings By User ID
export const getSavedListingsByUserIdService = async (
  userId: string
): Promise<TSavedListingSelect[]> => {
  return await db.query.savedListings.findMany({
    where: eq(savedListings.userId, userId),
  });
};

// Check If Listing Is Saved
export const isListingSavedService = async (
  userId: string,
  listingId: string
): Promise<boolean> => {
  const result = await db.query.savedListings.findFirst({
    where: and(
      eq(savedListings.userId, userId),
      eq(savedListings.listingId, listingId)
    ),
  });

  return !!result;
};

// Delete Saved Listing
export const deleteSavedListingService = async (
  savedListingId: string
): Promise<void> => {
  await db
    .delete(savedListings)
    .where(eq(savedListings.id, savedListingId));
};

// Delete Saved Listing By User And Listing
export const deleteSavedListingByUserAndListingService =
  async (
    userId: string,
    listingId: string
  ): Promise<void> => {
    await db
      .delete(savedListings)
      .where(
        and(
          eq(savedListings.userId, userId),
          eq(savedListings.listingId, listingId)
        )
      );
  };

// Get Saved Listing Count By User
export const getSavedListingCountService = async (
  userId: string
): Promise<number> => {
  const result = await db.query.savedListings.findMany({
    where: eq(savedListings.userId, userId),
  });

  return result.length;
};
