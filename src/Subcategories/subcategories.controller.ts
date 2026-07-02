import { Request, Response } from "express";
import {
  createSubcategoryService,
  getAllSubcategoriesService,
  getSubcategoryByIdService,
  getSubcategoriesByCategoryIdService,
  updateSubcategoryService,
  deleteSubcategoryService,
} from "./subcategories.service";

// Create Subcategory
export const createSubcategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subcategory = await createSubcategoryService(
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating subcategory",
      error: error.message,
    });
  }
};

// Get All Subcategories
export const getAllSubcategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subcategories =
      await getAllSubcategoriesService();
    res.status(200).json({
      success: true,
      data: subcategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategories",
      error: error.message,
    });
  }
};

// Get Subcategory by ID
export const getSubcategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subcategoryId } = req.params;
    const subcategory =
      await getSubcategoryByIdService(subcategoryId);

    if (!subcategory) {
      res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategory",
      error: error.message,
    });
  }
};

// Get Subcategories by Category ID
export const getSubcategoriesByCategoryIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { categoryId } = req.params;
      const subcategories =
        await getSubcategoriesByCategoryIdService(
          categoryId
        );

      res.status(200).json({
        success: true,
        data: subcategories,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching subcategories",
        error: error.message,
      });
    }
  };

// Update Subcategory
export const updateSubcategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subcategoryId } = req.params;
    const subcategory =
      await updateSubcategoryService(
        subcategoryId,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating subcategory",
      error: error.message,
    });
  }
};

// Delete Subcategory
export const deleteSubcategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subcategoryId } = req.params;
    await deleteSubcategoryService(subcategoryId);

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting subcategory",
      error: error.message,
    });
  }
};
