import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { listingViews } from "../drizzle/schema";

export type TListingViewInsert = typeof listingViews.$inferInsert;
export type TListingViewSelect = typeof listingViews.$inferSelect;

// Create Listing View
export const createListingViewService = async (
  view: TListingViewInsert
): Promise<TListingViewSelect> => {
  const [created] = await db
    .insert(listingViews)
    .values(view)
    .returning();

  return created;
};

// Get All Views for a Listing
export const getListingViewsService = async (
  listingId: string
): Promise<TListingViewSelect[]> => {
  return await db.query.listingViews.findMany({
    where: eq(listingViews.listingId, listingId),
  });
};

// Get View Count for a Listing
export const getListingViewCountService = async (
  listingId: string
): Promise<number> => {
  const result = await db.query.listingViews.findMany({
    where: eq(listingViews.listingId, listingId),
  });

  return result.length;
};

// Get All Views by a User
export const getViewsByUserService = async (
  userId: string
): Promise<TListingViewSelect[]> => {
  return await db.query.listingViews.findMany({
    where: eq(listingViews.viewerId, userId),
  });
};

// Get Listing View by ID
export const getListingViewByIdService = async (
  viewId: string
): Promise<TListingViewSelect | undefined> => {
  return await db.query.listingViews.findFirst({
    where: eq(listingViews.id, viewId),
  });
};

// Delete Listing View
export const deleteListingViewService = async (
  viewId: string
): Promise<void> => {
  await db
    .delete(listingViews)
    .where(eq(listingViews.id, viewId));
};
