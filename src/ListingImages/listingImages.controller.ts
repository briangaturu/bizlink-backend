import { Request, Response } from "express";
import {
  createListingImageService,
  createMultipleListingImagesService,
  getListingImagesByListingIdService,
  getListingImageByIdService,
  deleteListingImageService,
  deleteListingImagesByListingIdService,
} from "./listingImages.service";

// Create Listing Image
export const createListingImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = await createListingImageService(req.body);
    res.status(201).json({
      success: true,
      message: "Listing image created successfully",
      data: image,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating listing image",
      error: error.message,
    });
  }
};

// Create Multiple Listing Images
export const createMultipleListingImagesController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const images =
        await createMultipleListingImagesService(
          req.body.images
        );
      res.status(201).json({
        success: true,
        message:
          "Listing images created successfully",
        data: images,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating listing images",
        error: error.message,
      });
    }
  };

// Get Listing Images by Listing ID
export const getListingImagesByListingIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { listingId } = req.params;
      const images =
        await getListingImagesByListingIdService(
          listingId
        );

      res.status(200).json({
        success: true,
        data: images,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching listing images",
        error: error.message,
      });
    }
  };

// Get Listing Image by ID
export const getListingImageByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { imageId } = req.params;
    const image = await getListingImageByIdService(
      imageId
    );

    if (!image) {
      res.status(404).json({
        success: false,
        message: "Listing image not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listing image",
      error: error.message,
    });
  }
};

// Delete Listing Image
export const deleteListingImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { imageId } = req.params;
    await deleteListingImageService(imageId);

    res.status(200).json({
      success: true,
      message: "Listing image deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting listing image",
      error: error.message,
    });
  }
};

// Delete All Images for a Listing
export const deleteListingImagesByListingIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { listingId } = req.params;
      await deleteListingImagesByListingIdService(
        listingId
      );

      res.status(200).json({
        success: true,
        message:
          "Listing images deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting listing images",
        error: error.message,
      });
    }
  };
