import { Request, Response } from "express";
import {
  registerService,
  loginService,
  refreshTokenService,
  changePasswordService,
} from "./auth.service";
import { getUserByIdService } from "../Users/users.service";

/* =========================
   REGISTER
========================= */

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error: any) {
    const isConflict = error.message === "Email already in use" ||
      error.message === "Username already taken";
    res.status(isConflict ? 409 : 500).json({
      success: false,
      message: error.message || "Error creating account",
    });
  }
};

/* =========================
   LOGIN
========================= */

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    const isUnauthorized = error.message === "Invalid email or password" ||
      error.message === "Account is deactivated";
    res.status(isUnauthorized ? 401 : 500).json({
      success: false,
      message: error.message || "Error logging in",
    });
  }
};

/* =========================
   REFRESH TOKEN
========================= */

export const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
      return;
    }
    const tokens = await refreshTokenService(refreshToken);
    res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: tokens,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

/* =========================
   GET ME
========================= */

export const getMeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const user = await getUserByIdService(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

/* =========================
   CHANGE PASSWORD
========================= */

export const changePasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    await changePasswordService(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    const isBadRequest = error.message === "Current password is incorrect";
    res.status(isBadRequest ? 400 : 500).json({
      success: false,
      message: error.message || "Error changing password",
    });
  }
};

/* =========================
   LOGOUT
========================= */

export const logoutController = (
  _req: Request,
  res: Response
): void => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};