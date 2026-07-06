import { Request, Response } from "express";
import {
  createListingService,
  getAllListingsService,
  getListingByIdService,
  getListingsByUserIdService,
  getListingsByCategoryIdService,
  getListingsBySubcategoryIdService,
  getListingsByStatusService,
  getFeaturedListingsService,
  updateListingService,
  updateListingStatusService,
  incrementListingViewsService,
  deleteListingService,
  toggleFeaturedListingService,
  searchListingsService,
  getPopularListingsService,
  getRecentListingsService,
  getListingsByPriceRangeService,
  getCategoryTrendingService,
} from "./listings.service";

// Create Listing
export const createListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listing = await createListingService(req.body);
    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating listing",
      error: error.message,
    });
  }
};

// Get All Listings
export const getAllListingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listings = await getAllListingsService();
    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listings",
      error: error.message,
    });
  }
};

// Get Listing by ID
export const getListingByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const listing = await getListingByIdService(
      listingId as string
    );

    if (!listing) {
      res.status(404).json({
        success: false,
        message: "Listing not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listing",
      error: error.message,
    });
  }
};

// Get Listings by User ID
export const getListingsByUserIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const listings =
      await getListingsByUserIdService(userId as string);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listings",
      error: error.message,
    });
  }
};

// Get Listings by Category ID
export const getListingsByCategoryIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const listings =
      await getListingsByCategoryIdService(categoryId as string);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listings",
      error: error.message,
    });
  }
};

// Get Listings by Subcategory ID
export const getListingsBySubcategoryIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { subcategoryId } = req.params;
      const listings =
        await getListingsBySubcategoryIdService(
          subcategoryId as string
        );

      res.status(200).json({
        success: true,
        data: listings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching listings",
        error: error.message,
      });
    }
  };

// Get Listings by Status
export const getListingsByStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.params;
    const listings =
      await getListingsByStatusService(status as string);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listings",
      error: error.message,
    });
  }
};

// Get Featured Listings
export const getFeaturedListingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listings =
      await getFeaturedListingsService();

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching featured listings",
      error: error.message,
    });
  }
};

// Update Listing
export const updateListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const listing = await updateListingService(
      listingId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating listing",
      error: error.message,
    });
  }
};

// Update Listing Status
export const updateListingStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const { status } = req.body;
    const listing =
      await updateListingStatusService(
        listingId as string,
        status as string
      );

    res.status(200).json({
      success: true,
      message: "Listing status updated successfully",
      data: listing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating listing status",
      error: error.message,
    });
  }
};

// Increment Listing Views
export const incrementListingViewsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    await incrementListingViewsService(listingId as string);

    res.status(200).json({
      success: true,
      message: "Listing views incremented",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error incrementing listing views",
      error: error.message,
    });
  }
};

// Delete Listing
export const deleteListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    await deleteListingService(listingId as string);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting listing",
      error: error.message,
    });
  }
};

// Toggle Featured Status
export const toggleFeaturedListingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const { isFeatured } = req.body;
    const listing = await toggleFeaturedListingService(
      listingId as string,
      isFeatured as boolean
    );

    res.status(200).json({
      success: true,
      message:
        "Featured status updated successfully",
      data: listing,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating featured status",
      error: error.message,
    });
  }
};

/* =========================
   SEARCH & DISCOVERY
========================= */

// Search Listings
export const searchListingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      query,
      categoryId,
      minPrice,
      maxPrice,
      location,
      condition,
      limit = 20,
      offset = 0,
    } = req.query;

    const results = await searchListingsService(
      String(query || ""),
      String(categoryId || ""),
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      String(location || ""),
      String(condition || ""),
      Number(limit),
      Number(offset)
    );

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error searching listings",
      error: error.message,
    });
  }
};

// Get Popular Listings
export const getPopularListingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = 10 } = req.query;
    const listings = await getPopularListingsService(
      Number(limit)
    );

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching popular listings",
      error: error.message,
    });
  }
};

// Get Recent Listings
export const getRecentListingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = 10 } = req.query;
    const listings = await getRecentListingsService(
      Number(limit)
    );

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching recent listings",
      error: error.message,
    });
  }
};

// Get Listings by Price Range
export const getListingsByPriceRangeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { minPrice, maxPrice, limit = 20 } =
      req.query;
    const listings =
      await getListingsByPriceRangeService(
        Number(minPrice),
        Number(maxPrice),
        Number(limit)
      );

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching listings by price range",
      error: error.message,
    });
  }
};

// Get Category Trending
export const getCategoryTrendingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { limit = 10 } = req.query;
    const listings = await getCategoryTrendingService(
      categoryId as string,
      Number(limit)
    );

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching category trending",
      error: error.message,
    });
  }
};
