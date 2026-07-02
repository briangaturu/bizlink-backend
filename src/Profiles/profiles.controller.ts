import { Request, Response } from "express";
import {
  createProfileService,
  getProfileByUserIdService,
  getProfileByIdService,
  updateProfileService,
  deleteProfileService,
  getAllProfilesService,
} from "./profiles.service";

// Create Profile
export const createProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profile = await createProfileService(req.body);
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating profile",
      error: error.message,
    });
  }
};

// Get Profile by User ID
export const getProfileByUserIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const profile = await getProfileByUserIdService(userId);

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// Get Profile by ID
export const getProfileByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileId } = req.params;
    const profile = await getProfileByIdService(profileId);

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// Update Profile
export const updateProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileId } = req.params;
    const profile = await updateProfileService(
      profileId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Delete Profile
export const deleteProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { profileId } = req.params;
    await deleteProfileService(profileId);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting profile",
      error: error.message,
    });
  }
};

// Get All Profiles
export const getAllProfilesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profiles = await getAllProfilesService();

    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching profiles",
      error: error.message,
    });
  }
};
