import { Request, Response } from "express";
import {
  createListingViewService,
  getListingViewsService,
  getListingViewCountService,
  getViewsByUserService,
  getListingViewByIdService,
  deleteListingViewService,
} from "./listingViews.service";

// Create Listing View
export const createListingViewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const view = await createListingViewService(req.body);
    res.status(201).json({
      success: true,
      message: "Listing view recorded",
      data: view,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error recording listing view",
      error: error.message,
    });
  }
};

// Get All Views for a Listing
export const getListingViewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const views = await getListingViewsService(listingId);

    res.status(200).json({
      success: true,
      data: views,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listing views",
      error: error.message,
    });
  }
};

// Get View Count for a Listing
export const getListingViewCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const count =
      await getListingViewCountService(listingId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching view count",
      error: error.message,
    });
  }
};

// Get All Views by a User
export const getViewsByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const views = await getViewsByUserService(userId);

    res.status(200).json({
      success: true,
      data: views,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user views",
      error: error.message,
    });
  }
};

// Get Listing View by ID
export const getListingViewByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { viewId } = req.params;
    const view = await getListingViewByIdService(viewId);

    if (!view) {
      res.status(404).json({
        success: false,
        message: "Listing view not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: view,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listing view",
      error: error.message,
    });
  }
};

// Delete Listing View
export const deleteListingViewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { viewId } = req.params;
    await deleteListingViewService(viewId);

    res.status(200).json({
      success: true,
      message: "Listing view deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting listing view",
      error: error.message,
    });
  }
};
