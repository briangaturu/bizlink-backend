import { Router } from "express";
import {
  createListingImageController,
  createMultipleListingImagesController,
  getListingImagesByListingIdController,
  getListingImageByIdController,
  deleteListingImageController,
  deleteListingImagesByListingIdController,
} from "./listingImages.controller";

const router = Router();

// POST /listing-images - Create Listing Image
router.post("/", createListingImageController);

// POST /listing-images/bulk - Create Multiple Images
router.post(
  "/bulk",
  createMultipleListingImagesController
);

// GET /listing-images/listing/:listingId - Get Images by Listing
router.get(
  "/listing/:listingId",
  getListingImagesByListingIdController
);

// GET /listing-images/:imageId - Get Image by ID
router.get("/:imageId", getListingImageByIdController);

// DELETE /listing-images/:imageId - Delete Image
router.delete("/:imageId", deleteListingImageController);

// DELETE /listing-images/listing/:listingId - Delete All Images for Listing
router.delete(
  "/listing/:listingId",
  deleteListingImagesByListingIdController
);

export default router;
