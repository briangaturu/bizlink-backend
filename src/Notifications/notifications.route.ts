import { Router } from "express";
import {
  createNotificationController,
  getNotificationsByUserIdController,
  getUnreadNotificationsController,
  getNotificationByIdController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController,
  deleteAllNotificationsController,
} from "./notifications.controller";

const router = Router();

// POST /notifications - Create Notification
router.post("/", createNotificationController);

// GET /notifications/user/:userId - Get Notifications for User
router.get(
  "/user/:userId",
  getNotificationsByUserIdController
);

// GET /notifications/unread/:userId - Get Unread Notifications
router.get(
  "/unread/:userId",
  getUnreadNotificationsController
);

// GET /notifications/:notificationId - Get Notification by ID
router.get(
  "/:notificationId",
  getNotificationByIdController
);

// PUT /notifications/:notificationId - Mark as Read
router.put(
  "/:notificationId",
  markNotificationAsReadController
);

// PUT /notifications/read/all/:userId - Mark All as Read
router.put(
  "/read/all/:userId",
  markAllNotificationsAsReadController
);

// DELETE /notifications/:notificationId - Delete Notification
router.delete(
  "/:notificationId",
  deleteNotificationController
);

// DELETE /notifications/all/:userId - Delete All Notifications
router.delete(
  "/all/:userId",
  deleteAllNotificationsController
);

export default router;
