import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { subcategories } from "../drizzle/schema";

export type TSubcategoryInsert = typeof subcategories.$inferInsert;
export type TSubcategorySelect = typeof subcategories.$inferSelect;

// Create Subcategory
export const createSubcategoryService = async (
  subcategory: TSubcategoryInsert
): Promise<TSubcategorySelect> => {
  const [createdSubcategory] = await db
    .insert(subcategories)
    .values(subcategory)
    .returning();

  return createdSubcategory;
};

// Get All Subcategories
export const getAllSubcategoriesService = async (): Promise<
  TSubcategorySelect[]
> => {
  return await db.query.subcategories.findMany();
};

// Get Subcategory By ID
export const getSubcategoryByIdService = async (
  subcategoryId: string
): Promise<TSubcategorySelect | undefined> => {
  return await db.query.subcategories.findFirst({
    where: eq(subcategories.id, subcategoryId),
  });
};

// Get Subcategories By Category ID
export const getSubcategoriesByCategoryIdService = async (
  categoryId: string
): Promise<TSubcategorySelect[]> => {
  return await db.query.subcategories.findMany({
    where: eq(subcategories.categoryId, categoryId),
  });
};

// Update Subcategory
export const updateSubcategoryService = async (
  subcategoryId: string,
  updateData: Partial<TSubcategoryInsert>
): Promise<TSubcategorySelect> => {
  const [updatedSubcategory] = await db
    .update(subcategories)
    .set(updateData)
    .where(eq(subcategories.id, subcategoryId))
    .returning();

  return updatedSubcategory;
};

// Delete Subcategory
export const deleteSubcategoryService = async (
  subcategoryId: string
): Promise<void> => {
  await db
    .delete(subcategories)
    .where(eq(subcategories.id, subcategoryId));
};
