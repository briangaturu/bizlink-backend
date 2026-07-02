import { Router } from "express";
import {
  createSubcategoryController,
  getAllSubcategoriesController,
  getSubcategoryByIdController,
  getSubcategoriesByCategoryIdController,
  updateSubcategoryController,
  deleteSubcategoryController,
} from "./subcategories.controller";

const router = Router();

// POST /subcategories - Create Subcategory
router.post("/", createSubcategoryController);

// GET /subcategories - Get All Subcategories
router.get("/", getAllSubcategoriesController);

// GET /subcategories/category/:categoryId - Get by Category ID
router.get(
  "/category/:categoryId",
  getSubcategoriesByCategoryIdController
);

// GET /subcategories/:subcategoryId - Get by ID
router.get(
  "/:subcategoryId",
  getSubcategoryByIdController
);

// PUT /subcategories/:subcategoryId - Update
router.put(
  "/:subcategoryId",
  updateSubcategoryController
);

// DELETE /subcategories/:subcategoryId - Delete
router.delete(
  "/:subcategoryId",
  deleteSubcategoryController
);

export default router;
