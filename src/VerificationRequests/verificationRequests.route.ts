import { Router } from "express";
import {
  createVerificationRequestController,
  getVerificationRequestByIdController,
  getVerificationRequestByUserIdController,
  getAllVerificationRequestsController,
  getVerificationRequestsByStatusController,
  updateVerificationRequestStatusController,
  deleteVerificationRequestController,
} from "./verificationRequests.controller";

const router = Router();

// POST /verification-requests - Create Request
router.post("/", createVerificationRequestController);

// GET /verification-requests - Get All Requests
router.get("/", getAllVerificationRequestsController);

// GET /verification-requests/user/:userId - Get Request by User
router.get(
  "/user/:userId",
  getVerificationRequestByUserIdController
);

// GET /verification-requests/status/:status - Get by Status
router.get(
  "/status/:status",
  getVerificationRequestsByStatusController
);

// GET /verification-requests/:requestId - Get Request by ID
router.get(
  "/:requestId",
  getVerificationRequestByIdController
);

// PUT /verification-requests/:requestId - Update Status
router.put(
  "/:requestId",
  updateVerificationRequestStatusController
);

// DELETE /verification-requests/:requestId - Delete Request
router.delete(
  "/:requestId",
  deleteVerificationRequestController
);

export default router;
