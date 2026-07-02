import { Router } from "express";
import {
  createSavedListingController,
  getSavedListingsByUserIdController,
  isListingSavedController,
  deleteSavedListingController,
  deleteSavedListingByUserAndListingController,
  getSavedListingCountController,
} from "./savedListings.controller";

const router = Router();

// POST /saved-listings - Create Saved Listing
router.post("/", createSavedListingController);

// GET /saved-listings/user/:userId - Get Saved Listings by User
router.get(
  "/user/:userId",
  getSavedListingsByUserIdController
);

// GET /saved-listings/check/:userId/:listingId - Check if Listing is Saved
router.get(
  "/check/:userId/:listingId",
  isListingSavedController
);

// GET /saved-listings/count/:userId - Get Saved Listing Count
router.get(
  "/count/:userId",
  getSavedListingCountController
);

// DELETE /saved-listings/:savedListingId - Delete Saved Listing
router.delete(
  "/:savedListingId",
  deleteSavedListingController
);

// DELETE /saved-listings/:userId/:listingId - Delete by User and Listing
router.delete(
  "/:userId/:listingId",
  deleteSavedListingByUserAndListingController
);

export default router;
