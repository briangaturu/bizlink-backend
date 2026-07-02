import { Request, Response } from "express";
import {
  createVerificationRequestService,
  getVerificationRequestByIdService,
  getVerificationRequestByUserIdService,
  getAllVerificationRequestsService,
  getVerificationRequestsByStatusService,
  updateVerificationRequestStatusService,
  deleteVerificationRequestService,
} from "./verificationRequests.service";

// Create Verification Request
export const createVerificationRequestController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const request =
        await createVerificationRequestService(
          req.body
        );
      res.status(201).json({
        success: true,
        message:
          "Verification request created successfully",
        data: request,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating verification request",
        error: error.message,
      });
    }
  };

// Get Verification Request by ID
export const getVerificationRequestByIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { requestId } = req.params;
      const request =
        await getVerificationRequestByIdService(
          requestId
        );

      if (!request) {
        res.status(404).json({
          success: false,
          message: "Verification request not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching verification request",
        error: error.message,
      });
    }
  };

// Get Verification Request by User ID
export const getVerificationRequestByUserIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const request =
        await getVerificationRequestByUserIdService(
          userId
        );

      if (!request) {
        res.status(404).json({
          success: false,
          message: "Verification request not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching verification request",
        error: error.message,
      });
    }
  };

// Get All Verification Requests
export const getAllVerificationRequestsController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const requests =
        await getAllVerificationRequestsService();
      res.status(200).json({
        success: true,
        data: requests,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching verification requests",
        error: error.message,
      });
    }
  };

// Get Verification Requests by Status
export const getVerificationRequestsByStatusController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { status } = req.params;
      const requests =
        await getVerificationRequestsByStatusService(
          status
        );

      res.status(200).json({
        success: true,
        data: requests,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching verification requests",
        error: error.message,
      });
    }
  };

// Update Verification Request Status
export const updateVerificationRequestStatusController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { requestId } = req.params;
      const { status, adminNotes } = req.body;
      const request =
        await updateVerificationRequestStatusService(
          requestId,
          status,
          adminNotes
        );

      res.status(200).json({
        success: true,
        message:
          "Verification request status updated successfully",
        data: request,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message:
          "Error updating verification request status",
        error: error.message,
      });
    }
  };

// Delete Verification Request
export const deleteVerificationRequestController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { requestId } = req.params;
      await deleteVerificationRequestService(
        requestId
      );

      res.status(200).json({
        success: true,
        message:
          "Verification request deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error deleting verification request",
        error: error.message,
      });
    }
  };
