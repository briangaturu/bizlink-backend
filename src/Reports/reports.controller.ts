import { Request, Response } from "express";
import {
  createReportService,
  getAllReportsService,
  getReportByIdService,
  getReportsByListingIdService,
  getReportsByStatusService,
  getReportsByReporterIdService,
  updateReportStatusService,
  deleteReportService,
} from "./reports.service";

// Create Report
export const createReportController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await createReportService(req.body);
    res.status(201).json({
      success: true,
      message: "Report created successfully",
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating report",
      error: error.message,
    });
  }
};

// Get All Reports
export const getAllReportsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await getAllReportsService();
    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

// Get Report by ID
export const getReportByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.params;
    const report = await getReportByIdService(reportId);

    if (!report) {
      res.status(404).json({
        success: false,
        message: "Report not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching report",
      error: error.message,
    });
  }
};

// Get Reports for a Listing
export const getReportsByListingIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { listingId } = req.params;
    const reports =
      await getReportsByListingIdService(listingId);

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

// Get Reports by Status
export const getReportsByStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.params;
    const reports =
      await getReportsByStatusService(status);

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

// Get Reports by Reporter ID
export const getReportsByReporterIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reporterId } = req.params;
    const reports =
      await getReportsByReporterIdService(reporterId);

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

// Update Report Status
export const updateReportStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;
    const report = await updateReportStatusService(
      reportId,
      status
    );

    res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating report status",
      error: error.message,
    });
  }
};

// Delete Report
export const deleteReportController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reportId } = req.params;
    await deleteReportService(reportId);

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting report",
      error: error.message,
    });
  }
};
