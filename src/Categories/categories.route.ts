import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryByNameController,
  updateCategoryController,
  deleteCategoryController,
} from "./categories.controller";

const router = Router();

// POST /categories - Create Category
router.post("/", createCategoryController);

// GET /categories - Get All Categories
router.get("/", getAllCategoriesController);

// GET /categories/name/:name - Get Category by Name
router.get("/name/:name", getCategoryByNameController);

// GET /categories/:categoryId - Get Category by ID
router.get("/:categoryId", getCategoryByIdController);

// PUT /categories/:categoryId - Update Category
router.put("/:categoryId", updateCategoryController);

// DELETE /categories/:categoryId - Delete Category
router.delete(
  "/:categoryId",
  deleteCategoryController
);

export default router;
