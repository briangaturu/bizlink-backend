import { Request, Response } from "express";
import {
  createSavedListingService,
  getSavedListingsByUserIdService,
  isListingSavedService,
  deleteSavedListingService,
  deleteSavedListingByUserAndListingService,
  getSavedListingCountService,
} from "./savedListings.service";

// Create Saved Listing
export const createSavedListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const savedListing =
      await createSavedListingService(req.body);
    res.status(201).json({
      success: true,
      message: "Listing saved successfully",
      data: savedListing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error saving listing",
      error: error.message,
    });
  }
};

// Get Saved Listings by User ID
export const getSavedListingsByUserIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const savedListings =
        await getSavedListingsByUserIdService(userId);

      res.status(200).json({
        success: true,
        data: savedListings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching saved listings",
        error: error.message,
      });
    }
  };

// Check If Listing Is Saved
export const isListingSavedController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, listingId } = req.params;
    const isSaved = await isListingSavedService(
      userId,
      listingId
    );

    res.status(200).json({
      success: true,
      data: { isSaved },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error checking saved listing",
      error: error.message,
    });
  }
};

// Delete Saved Listing
export const deleteSavedListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { savedListingId } = req.params;
    await deleteSavedListingService(savedListingId);

    res.status(200).json({
      success: true,
      message: "Listing removed from saved",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error removing saved listing",
      error: error.message,
    });
  }
};

// Delete Saved Listing By User And Listing
export const deleteSavedListingByUserAndListingController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId, listingId } = req.params;
      await deleteSavedListingByUserAndListingService(
        userId,
        listingId
      );

      res.status(200).json({
        success: true,
        message: "Listing removed from saved",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error removing saved listing",
        error: error.message,
      });
    }
  };

// Get Saved Listing Count
export const getSavedListingCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const count =
      await getSavedListingCountService(userId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching saved listing count",
      error: error.message,
    });
  }
};
