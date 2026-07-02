import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { categories } from "../drizzle/schema";

export type TCategoryInsert = typeof categories.$inferInsert;
export type TCategorySelect = typeof categories.$inferSelect;

// Create Category
export const createCategoryService = async (
  category: TCategoryInsert
): Promise<TCategorySelect> => {
  const [createdCategory] = await db
    .insert(categories)
    .values(category)
    .returning();

  return createdCategory;
};

// Get All Categories
export const getAllCategoriesService = async (): Promise<
  TCategorySelect[]
> => {
  return await db.query.categories.findMany();
};

// Get Category By ID
export const getCategoryByIdService = async (
  categoryId: string
): Promise<TCategorySelect | undefined> => {
  return await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  });
};

// Get Category By Name
export const getCategoryByNameService = async (
  name: string
): Promise<TCategorySelect | undefined> => {
  return await db.query.categories.findFirst({
    where: eq(categories.name, name),
  });
};

// Update Category
export const updateCategoryService = async (
  categoryId: string,
  updateData: Partial<TCategoryInsert>
): Promise<TCategorySelect> => {
  const [updatedCategory] = await db
    .update(categories)
    .set(updateData)
    .where(eq(categories.id, categoryId))
    .returning();

  return updatedCategory;
};

// Delete Category
export const deleteCategoryService = async (
  categoryId: string
): Promise<void> => {
  await db
    .delete(categories)
    .where(eq(categories.id, categoryId));
};
