import { eq, and, or, gte, lte, like, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { listings } from "../drizzle/schema";

export type TListingInsert = typeof listings.$inferInsert;
export type TListingSelect = typeof listings.$inferSelect;

// Create Listing
export const createListingService = async (
  listing: TListingInsert
): Promise<TListingSelect> => {
  const [created] = await db
    .insert(listings)
    .values(listing)
    .returning();

  return created;
};

// Get All Listings
export const getAllListingsService = async (): Promise<
  TListingSelect[]
> => {
  return await db.query.listings.findMany();
};

// Get Listing by ID
export const getListingByIdService = async (
  listingId: string
): Promise<TListingSelect | undefined> => {
  return await db.query.listings.findFirst({
    where: eq(listings.id, listingId),
  });
};

// Get Listings by User ID
export const getListingsByUserIdService = async (
  userId: string
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.userId, userId),
  });
};

// Get Listings by Category ID
export const getListingsByCategoryIdService = async (
  categoryId: string
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.categoryId, categoryId),
  });
};

// Get Listings by Subcategory ID
export const getListingsBySubcategoryIdService = async (
  subcategoryId: string
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.subcategoryId, subcategoryId),
  });
};

// Get Listings by Status
export const getListingsByStatusService = async (
  status: string
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.status, status as any),
  });
};

// Get Featured Listings
export const getFeaturedListingsService = async (): Promise<
  TListingSelect[]
> => {
  return await db.query.listings.findMany({
    where: eq(listings.isFeatured, true),
  });
};

// Update Listing
export const updateListingService = async (
  listingId: string,
  updateData: Partial<TListingInsert>
): Promise<TListingSelect> => {
  const [updated] = await db
    .update(listings)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(listings.id, listingId))
    .returning();

  return updated;
};

// Update Listing Status
export const updateListingStatusService = async (
  listingId: string,
  status: string
): Promise<TListingSelect> => {
  const [updated] = await db
    .update(listings)
    .set({
      status: status as any,
      updatedAt: new Date(),
    })
    .where(eq(listings.id, listingId))
    .returning();

  return updated;
};

// Increment Listing Views
export const incrementListingViewsService = async (
  listingId: string
): Promise<void> => {
  const listing = await db.query.listings.findFirst({
    where: eq(listings.id, listingId),
  });

  if (listing) {
    await db
      .update(listings)
      .set({
        views: (listing.views || 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(listings.id, listingId));
  }
};

// Delete Listing
export const deleteListingService = async (
  listingId: string
): Promise<void> => {
  await db.delete(listings).where(eq(listings.id, listingId));
};

// Toggle Featured Status
export const toggleFeaturedListingService = async (
  listingId: string,
  isFeatured: boolean
): Promise<TListingSelect> => {
  const [updated] = await db
    .update(listings)
    .set({
      isFeatured: isFeatured,
      updatedAt: new Date(),
    })
    .where(eq(listings.id, listingId))
    .returning();

  return updated;
};

/* =========================
   SEARCH & DISCOVERY
========================= */

// Search Listings
export const searchListingsService = async (
  query: string,
  categoryId?: string,
  minPrice?: number,
  maxPrice?: number,
  location?: string,
  condition?: string,
  limit: number = 20,
  offset: number = 0
): Promise<TListingSelect[]> => {
  const conditions = [
    eq(listings.status, "ACTIVE" as any),
    or(
      like(listings.title, `%${query}%`),
      like(listings.description, `%${query}%`)
    ),
  ];

  if (categoryId) {
    conditions.push(eq(listings.categoryId, categoryId));
  }
  if (minPrice !== undefined) {
    conditions.push(gte(listings.price, minPrice.toString()));
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(listings.price, maxPrice.toString()));
  }
  if (location) {
    conditions.push(like(listings.location, `%${location}%`));
  }
  if (condition) {
    conditions.push(eq(listings.condition, condition as any));
  }

  return await db.query.listings.findMany({
    where: and(...conditions),
    limit,
    offset,
  });
};

// Get Popular Listings (by views)
export const getPopularListingsService = async (
  limit: number = 10
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.status, "ACTIVE" as any),
    orderBy: desc(listings.views),
    limit,
  });
};

// Get Recent Listings
export const getRecentListingsService = async (
  limit: number = 10
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: eq(listings.status, "ACTIVE" as any),
    orderBy: desc(listings.createdAt),
    limit,
  });
};

// Get Listings by Price Range
export const getListingsByPriceRangeService = async (
  minPrice: number,
  maxPrice: number,
  limit: number = 20
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: and(
      eq(listings.status, "ACTIVE" as any),
      gte(listings.price, minPrice.toString()),
      lte(listings.price, maxPrice.toString())
    ),
    limit,
  });
};

// Get Category Trending
export const getCategoryTrendingService = async (
  categoryId: string,
  limit: number = 10
): Promise<TListingSelect[]> => {
  return await db.query.listings.findMany({
    where: and(
      eq(listings.status, "ACTIVE" as any),
      eq(listings.categoryId, categoryId)
    ),
    orderBy: desc(listings.views),
    limit,
  });
};

/* =========================
   REVIEWS & RATINGS
========================= */

// Add Review (simplified - stored as listing metadata)
export const addReviewToListingService = async (
  listingId: string,
  rating: number,
  comment?: string
): Promise<void> => {
  // TODO: Create reviews table in schema
  // For now, this is a placeholder
  console.log(
    `Review added: ${rating} stars - ${comment} for listing ${listingId}`
  );
};

// Get Average Rating for Listing
export const getListingAverageRatingService = async (
  listingId: string
): Promise<number> => {
  // TODO: Query reviews table once created
  // For now returning mock
  return 4.5;
};
