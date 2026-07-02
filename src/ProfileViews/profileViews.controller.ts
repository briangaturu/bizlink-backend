import { Request, Response } from "express";
import {
  createProfileViewService,
  getProfileViewsService,
  getProfileViewCountService,
  getProfileViewsByUserService,
  getProfileViewByIdService,
  deleteProfileViewService,
} from "./profileViews.service";

// Create Profile View
export const createProfileViewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const view = await createProfileViewService(req.body);
    res.status(201).json({
      success: true,
      message: "Profile view recorded",
      data: view,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error recording profile view",
      error: error.message,
    });
  }
};

// Get All Views for a Profile
export const getProfileViewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileOwnerId } = req.params;
    const views = await getProfileViewsService(
      profileOwnerId
    );

    res.status(200).json({
      success: true,
      data: views,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile views",
      error: error.message,
    });
  }
};

// Get View Count for a Profile
export const getProfileViewCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileOwnerId } = req.params;
    const count = await getProfileViewCountService(
      profileOwnerId
    );

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile view count",
      error: error.message,
    });
  }
};

// Get All Views by a User
export const getProfileViewsByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const views = await getProfileViewsByUserService(
      userId
    );

    res.status(200).json({
      success: true,
      data: views,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile views",
      error: error.message,
    });
  }
};

// Get Profile View by ID
export const getProfileViewByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { viewId } = req.params;
    const view = await getProfileViewByIdService(viewId);

    if (!view) {
      res.status(404).json({
        success: false,
        message: "Profile view not found",
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
      message: "Error fetching profile view",
      error: error.message,
    });
  }
};

// Delete Profile View
export const deleteProfileViewController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { viewId } = req.params;
    await deleteProfileViewService(viewId);

    res.status(200).json({
      success: true,
      message: "Profile view deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting profile view",
      error: error.message,
    });
  }
};
