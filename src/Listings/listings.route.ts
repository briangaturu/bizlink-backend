import { Router } from "express";
import {
  createListingController,
  getAllListingsController,
  getListingByIdController,
  getListingsByUserIdController,
  getListingsByCategoryIdController,
  getListingsBySubcategoryIdController,
  getListingsByStatusController,
  getFeaturedListingsController,
  updateListingController,
  updateListingStatusController,
  incrementListingViewsController,
  deleteListingController,
  toggleFeaturedListingController,
  searchListingsController,
  getPopularListingsController,
  getRecentListingsController,
  getListingsByPriceRangeController,
  getCategoryTrendingController,
} from "./listings.controller";

const router = Router();

// POST /listings - Create Listing
router.post("/", createListingController);

// GET /listings - Get All Listings
router.get("/", getAllListingsController);

// GET /listings/featured - Get Featured Listings
router.get("/featured", getFeaturedListingsController);

// GET /listings/search - Search Listings
router.get("/search", searchListingsController);

// GET /listings/popular - Get Popular Listings
router.get("/popular", getPopularListingsController);

// GET /listings/recent - Get Recent Listings
router.get("/recent", getRecentListingsController);

// GET /listings/price-range - Get by Price Range
router.get("/price-range", getListingsByPriceRangeController);

// GET /listings/trending/:categoryId - Category Trending
router.get(
  "/trending/:categoryId",
  getCategoryTrendingController
);

// GET /listings/user/:userId - Get Listings by User
router.get(
  "/user/:userId",
  getListingsByUserIdController
);

// GET /listings/category/:categoryId - Get Listings by Category
router.get(
  "/category/:categoryId",
  getListingsByCategoryIdController
);

// GET /listings/subcategory/:subcategoryId - Get Listings by Subcategory
router.get(
  "/subcategory/:subcategoryId",
  getListingsBySubcategoryIdController
);

// GET /listings/status/:status - Get Listings by Status
router.get(
  "/status/:status",
  getListingsByStatusController
);

// GET /listings/:listingId - Get Listing by ID
router.get("/:listingId", getListingByIdController);

// PUT /listings/:listingId - Update Listing
router.put("/:listingId", updateListingController);

// PUT /listings/:listingId/status - Update Status
router.put(
  "/:listingId/status",
  updateListingStatusController
);

// PUT /listings/:listingId/views - Increment Views
router.put(
  "/:listingId/views",
  incrementListingViewsController
);

// PUT /listings/:listingId/featured - Toggle Featured
router.put(
  "/:listingId/featured",
  toggleFeaturedListingController
);

// DELETE /listings/:listingId - Delete Listing
router.delete("/:listingId", deleteListingController);

export default router;
