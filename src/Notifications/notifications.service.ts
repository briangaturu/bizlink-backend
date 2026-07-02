import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { notifications } from "../drizzle/schema";

export type TNotificationInsert = typeof notifications.$inferInsert;
export type TNotificationSelect = typeof notifications.$inferSelect;

// Create Notification
export const createNotificationService = async (
  notification: TNotificationInsert
): Promise<TNotificationSelect> => {
  const [created] = await db
    .insert(notifications)
    .values(notification)
    .returning();

  return created;
};

// Get All Notifications for a User
export const getNotificationsByUserIdService = async (
  userId: string
): Promise<TNotificationSelect[]> => {
  return await db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
  });
};

// Get Unread Notifications for a User
export const getUnreadNotificationsService = async (
  userId: string
): Promise<TNotificationSelect[]> => {
  return await db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
  });
};

// Get Notification by ID
export const getNotificationByIdService = async (
  notificationId: string
): Promise<TNotificationSelect | undefined> => {
  return await db.query.notifications.findFirst({
    where: eq(notifications.id, notificationId),
  });
};

// Mark Notification as Read
export const markNotificationAsReadService = async (
  notificationId: string
): Promise<TNotificationSelect> => {
  const [updated] = await db
    .update(notifications)
    .set({
      isRead: true,
      createdAt: new Date(),
    })
    .where(eq(notifications.id, notificationId))
    .returning();

  return updated;
};

// Mark All Notifications as Read for User
export const markAllNotificationsAsReadService = async (
  userId: string
): Promise<void> => {
  await db
    .update(notifications)
    .set({
      isRead: true,
      createdAt: new Date(),
    })
    .where(eq(notifications.userId, userId));
};

// Delete Notification
export const deleteNotificationService = async (
  notificationId: string
): Promise<void> => {
  await db
    .delete(notifications)
    .where(eq(notifications.id, notificationId));
};

// Delete All Notifications for User
export const deleteAllNotificationsService = async (
  userId: string
): Promise<void> => {
  await db
    .delete(notifications)
    .where(eq(notifications.userId, userId));
};
