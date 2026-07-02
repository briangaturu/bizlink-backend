import { Router } from "express";
import {
  createReportController,
  getAllReportsController,
  getReportByIdController,
  getReportsByListingIdController,
  getReportsByStatusController,
  getReportsByReporterIdController,
  updateReportStatusController,
  deleteReportController,
} from "./reports.controller";

const router = Router();

// POST /reports - Create Report
router.post("/", createReportController);

// GET /reports - Get All Reports
router.get("/", getAllReportsController);

// GET /reports/listing/:listingId - Get Reports for Listing
router.get(
  "/listing/:listingId",
  getReportsByListingIdController
);

// GET /reports/status/:status - Get Reports by Status
router.get(
  "/status/:status",
  getReportsByStatusController
);

// GET /reports/reporter/:reporterId - Get Reports by Reporter
router.get(
  "/reporter/:reporterId",
  getReportsByReporterIdController
);

// GET /reports/:reportId - Get Report by ID
router.get("/:reportId", getReportByIdController);

// PUT /reports/:reportId - Update Report Status
router.put(
  "/:reportId",
  updateReportStatusController
);

// DELETE /reports/:reportId - Delete Report
router.delete("/:reportId", deleteReportController);

export default router;
