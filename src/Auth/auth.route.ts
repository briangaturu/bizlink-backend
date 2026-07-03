import { Router } from "express";
import {
  registerController,
  loginController,
  refreshTokenController,
  getMeController,
  changePasswordController,
  logoutController,
} from "./auth.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// POST /auth/register
router.post("/register", registerController);

// POST /auth/login
router.post("/login", loginController);

// POST /auth/refresh
router.post("/refresh", refreshTokenController);

// GET /auth/me  (protected)
router.get("/me", authenticate, getMeController);

// PUT /auth/change-password  (protected)
router.put("/change-password", authenticate, changePasswordController);

// POST /auth/logout  (protected)
router.post("/logout", authenticate, logoutController);

export default router;