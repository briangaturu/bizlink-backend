import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { listingImages } from "../drizzle/schema";

export type TListingImageInsert = typeof listingImages.$inferInsert;
export type TListingImageSelect = typeof listingImages.$inferSelect;

// Create Listing Image
export const createListingImageService = async (
  image: TListingImageInsert
): Promise<TListingImageSelect> => {
  const [createdImage] = await db
    .insert(listingImages)
    .values(image)
    .returning();

  return createdImage;
};

// Create Multiple Listing Images
export const createMultipleListingImagesService = async (
  images: TListingImageInsert[]
): Promise<TListingImageSelect[]> => {
  return await db
    .insert(listingImages)
    .values(images)
    .returning();
};

// Get Listing Images By Listing ID
export const getListingImagesByListingIdService = async (
  listingId: string
): Promise<TListingImageSelect[]> => {
  return await db.query.listingImages.findMany({
    where: eq(listingImages.listingId, listingId),
  });
};

// Get Listing Image By ID
export const getListingImageByIdService = async (
  imageId: string
): Promise<TListingImageSelect | undefined> => {
  return await db.query.listingImages.findFirst({
    where: eq(listingImages.id, imageId),
  });
};

// Delete Listing Image
export const deleteListingImageService = async (
  imageId: string
): Promise<void> => {
  await db
    .delete(listingImages)
    .where(eq(listingImages.id, imageId));
};

// Delete All Images for a Listing
export const deleteListingImagesByListingIdService = async (
  listingId: string
): Promise<void> => {
  await db
    .delete(listingImages)
    .where(eq(listingImages.listingId, listingId));
};
