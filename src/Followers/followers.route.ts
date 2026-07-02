import { Router } from "express";
import {
  createFollowerController,
  getFollowersController,
  getFollowingController,
  isFollowingController,
  unfollowUserController,
  getFollowerCountController,
  getFollowingCountController,
} from "./followers.controller";

const router = Router();

// POST /followers - Create Follower
router.post("/", createFollowerController);

// GET /followers/:userId - Get Followers of User
router.get("/:userId", getFollowersController);

// GET /followers/following/:userId - Get Users Following
router.get(
  "/following/:userId",
  getFollowingController
);

// GET /followers/check/:followerId/:followingId - Check if Following
router.get(
  "/check/:followerId/:followingId",
  isFollowingController
);

// GET /followers/count/:userId - Get Follower Count
router.get(
  "/count/:userId",
  getFollowerCountController
);

// GET /followers/following-count/:userId - Get Following Count
router.get(
  "/following-count/:userId",
  getFollowingCountController
);

// DELETE /followers/:followerId/:followingId - Unfollow User
router.delete(
  "/:followerId/:followingId",
  unfollowUserController
);

export default router;
