import { Router } from "express";
import {
  createUserController,
  getUserByEmailController,
  getUserByUsernameController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  verifyUserController,
  deactivateUserController,
  activateUserController,
  getUserStatsController,
  getSellerStatsController,
  getTopSellersController,
} from "./users.controller";

const router = Router();

// POST /users - Create User
router.post("/", createUserController);

// GET /users - Get All Users
router.get("/", getAllUsersController);

// GET /users/stats/top-sellers - Get Top Sellers
router.get("/stats/top-sellers", getTopSellersController);

// GET /users/email/:email - Get User by Email
router.get("/email/:email", getUserByEmailController);

// GET /users/username/:username - Get User by Username
router.get(
  "/username/:username",
  getUserByUsernameController
);

// GET /users/stats/:userId - Get User Statistics
router.get("/stats/:userId", getUserStatsController);

// GET /users/seller/:sellerId - Get Seller Statistics
router.get("/seller/:sellerId", getSellerStatsController);

// GET /users/:userId - Get User by ID
router.get("/:userId", getUserByIdController);

// PUT /users/:userId - Update User
router.put("/:userId", updateUserController);

// PUT /users/:userId/verify - Verify User
router.put("/:userId/verify", verifyUserController);

// PUT /users/:userId/deactivate - Deactivate User
router.put(
  "/:userId/deactivate",
  deactivateUserController
);

// PUT /users/:userId/activate - Activate User
router.put(
  "/:userId/activate",
  activateUserController
);

// DELETE /users/:userId - Delete User
router.delete("/:userId", deleteUserController);

export default router;
