import { Request, Response } from "express";
import {
  createFollowerService,
  getFollowersService,
  getFollowingService,
  isFollowingService,
  unfollowUserService,
  getFollowerCountService,
  getFollowingCountService,
} from "./followers.service";

// Create Follower
export const createFollowerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const follower = await createFollowerService(
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Followed successfully",
      data: follower,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error following user",
      error: error.message,
    });
  }
};

// Get Followers of a User
export const getFollowersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const followers = await getFollowersService(userId);

    res.status(200).json({
      success: true,
      data: followers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching followers",
      error: error.message,
    });
  }
};

// Get Users that a User is Following
export const getFollowingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const following = await getFollowingService(userId);

    res.status(200).json({
      success: true,
      data: following,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching following",
      error: error.message,
    });
  }
};

// Check If User Follows Another User
export const isFollowingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { followerId, followingId } = req.params;
    const isFollowing = await isFollowingService(
      followerId,
      followingId
    );

    res.status(200).json({
      success: true,
      data: { isFollowing },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error checking follow status",
      error: error.message,
    });
  }
};

// Unfollow User
export const unfollowUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { followerId, followingId } = req.params;
    await unfollowUserService(followerId, followingId);

    res.status(200).json({
      success: true,
      message: "Unfollowed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error unfollowing user",
      error: error.message,
    });
  }
};

// Get Follower Count
export const getFollowerCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const count = await getFollowerCountService(userId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching follower count",
      error: error.message,
    });
  }
};

// Get Following Count
export const getFollowingCountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const count = await getFollowingCountService(userId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching following count",
      error: error.message,
    });
  }
};
