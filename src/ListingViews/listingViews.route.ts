import { Router } from "express";
import {
  createListingViewController,
  getListingViewsController,
  getListingViewCountController,
  getViewsByUserController,
  getListingViewByIdController,
  deleteListingViewController,
} from "./listingViews.controller";

const router = Router();

// POST /listing-views - Create Listing View
router.post("/", createListingViewController);

// GET /listing-views/listing/:listingId - Get Views for Listing
router.get(
  "/listing/:listingId",
  getListingViewsController
);

// GET /listing-views/count/:listingId - Get View Count
router.get(
  "/count/:listingId",
  getListingViewCountController
);

// GET /listing-views/user/:userId - Get Views by User
router.get(
  "/user/:userId",
  getViewsByUserController
);

// GET /listing-views/:viewId - Get View by ID
router.get(":viewId", getListingViewByIdController);

// DELETE /listing-views/:viewId - Delete View
router.delete(
  "/:viewId",
  deleteListingViewController
);

export default router;
