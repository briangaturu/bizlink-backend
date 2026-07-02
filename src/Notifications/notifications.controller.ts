import { Request, Response } from "express";
import {
  createNotificationService,
  getNotificationsByUserIdService,
  getUnreadNotificationsService,
  getNotificationByIdService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
  deleteNotificationService,
  deleteAllNotificationsService,
} from "./notifications.service";

// Create Notification
export const createNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification =
      await createNotificationService(req.body);
    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
    });
  }
};

// Get All Notifications for a User
export const getNotificationsByUserIdController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const notifications =
        await getNotificationsByUserIdService(userId);

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching notifications",
        error: error.message,
      });
    }
  };

// Get Unread Notifications for a User
export const getUnreadNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const notifications =
      await getUnreadNotificationsService(userId);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching unread notifications",
      error: error.message,
    });
  }
};

// Get Notification by ID
export const getNotificationByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;
    const notification =
      await getNotificationByIdService(notificationId);

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching notification",
      error: error.message,
    });
  }
};

// Mark Notification as Read
export const markNotificationAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;
    const notification =
      await markNotificationAsReadService(
        notificationId
      );

    res.status(200).json({
      success: true,
      message:
        "Notification marked as read successfully",
      data: notification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error marking notification as read",
      error: error.message,
    });
  }
};

// Mark All Notifications as Read for User
export const markAllNotificationsAsReadController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      await markAllNotificationsAsReadService(userId);

      res.status(200).json({
        success: true,
        message:
          "All notifications marked as read successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message:
          "Error marking all notifications as read",
        error: error.message,
      });
    }
  };

// Delete Notification
export const deleteNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;
    await deleteNotificationService(notificationId);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting notification",
      error: error.message,
    });
  }
};

// Delete All Notifications for User
export const deleteAllNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await deleteAllNotificationsService(userId);

    res.status(200).json({
      success: true,
      message:
        "All notifications deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting all notifications",
      error: error.message,
    });
  }
};
