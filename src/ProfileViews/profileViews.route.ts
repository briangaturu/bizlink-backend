import { Router } from "express";
import {
  createProfileViewController,
  getProfileViewsController,
  getProfileViewCountController,
  getProfileViewsByUserController,
  getProfileViewByIdController,
  deleteProfileViewController,
} from "./profileViews.controller";

const router = Router();

// POST /profile-views - Create Profile View
router.post("/", createProfileViewController);

// GET /profile-views/profile/:profileOwnerId - Get Views for Profile
router.get(
  "/profile/:profileOwnerId",
  getProfileViewsController
);

// GET /profile-views/count/:profileOwnerId - Get View Count
router.get(
  "/count/:profileOwnerId",
  getProfileViewCountController
);

// GET /profile-views/user/:userId - Get Views by User
router.get(
  "/user/:userId",
  getProfileViewsByUserController
);

// GET /profile-views/:viewId - Get View by ID
router.get("/:viewId", getProfileViewByIdController);

// DELETE /profile-views/:viewId - Delete View
router.delete(
  "/:viewId",
  deleteProfileViewController
);

export default router;
