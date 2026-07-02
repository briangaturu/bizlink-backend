import { Request, Response } from "express";
import {
  createUserService,
  getUserByEmailService,
  getUserByUsernameService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  verifyUserService,
  deactivateUserService,
  activateUserService,
  getUserStatsService,
  getSellerStatsService,
  getTopSellersService,
} from "./users.service";

// Create User
export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Get User By Email
export const getUserByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await getUserByEmailService(email);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Get User By Username
export const getUserByUsernameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;
    const user = await getUserByUsernameService(
      username
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Get User By ID
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Get All Users
export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Update User
export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await updateUserService(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete User
export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await deleteUserService(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// Verify User
export const verifyUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await verifyUserService(userId);

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error verifying user",
      error: error.message,
    });
  }
};

// Deactivate User
export const deactivateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await deactivateUserService(userId);

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deactivating user",
      error: error.message,
    });
  }
};

// Activate User
export const activateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await activateUserService(userId);

    res.status(200).json({
      success: true,
      message: "User activated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error activating user",
      error: error.message,
    });
  }
};

/* =========================
   USER STATISTICS
========================= */

// Get User Statistics
export const getUserStatsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const stats = await getUserStatsService(userId);

    if (!stats) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user statistics",
      error: error.message,
    });
  }
};

// Get Seller Statistics
export const getSellerStatsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sellerId } = req.params;
    const stats = await getSellerStatsService(sellerId);

    if (!stats) {
      res.status(404).json({
        success: false,
        message: "Seller not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching seller statistics",
      error: error.message,
    });
  }
};

// Get Top Sellers
export const getTopSellersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = 10 } = req.query;
    const sellers = await getTopSellersService(
      Number(limit)
    );

    res.status(200).json({
      success: true,
      data: sellers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching top sellers",
      error: error.message,
    });
  }
};
