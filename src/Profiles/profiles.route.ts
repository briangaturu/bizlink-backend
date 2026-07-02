import { Router } from "express";
import {
  createProfileController,
  getProfileByUserIdController,
  getProfileByIdController,
  updateProfileController,
  deleteProfileController,
  getAllProfilesController,
} from "./profiles.controller";

const router = Router();

// POST /profiles - Create Profile
router.post("/", createProfileController);

// GET /profiles - Get All Profiles
router.get("/", getAllProfilesController);

// GET /profiles/:profileId - Get Profile by ID
router.get("/:profileId", getProfileByIdController);

// GET /profiles/user/:userId - Get Profile by User ID
router.get(
  "/user/:userId",
  getProfileByUserIdController
);

// PUT /profiles/:profileId - Update Profile
router.put("/:profileId", updateProfileController);

// DELETE /profiles/:profileId - Delete Profile
router.delete("/:profileId", deleteProfileController);

export default router;
