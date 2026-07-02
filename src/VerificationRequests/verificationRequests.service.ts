import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { verificationRequests } from "../drizzle/schema";

export type TVerificationRequestInsert =
  typeof verificationRequests.$inferInsert;
export type TVerificationRequestSelect =
  typeof verificationRequests.$inferSelect;

// Create Verification Request
export const createVerificationRequestService = async (
  request: TVerificationRequestInsert
): Promise<TVerificationRequestSelect> => {
  const [created] = await db
    .insert(verificationRequests)
    .values(request)
    .returning();

  return created;
};

// Get Verification Request by ID
export const getVerificationRequestByIdService = async (
  requestId: string
): Promise<TVerificationRequestSelect | undefined> => {
  return await db.query.verificationRequests.findFirst({
    where: eq(verificationRequests.id, requestId),
  });
};

// Get Verification Request by User ID
export const getVerificationRequestByUserIdService = async (
  userId: string
): Promise<TVerificationRequestSelect | undefined> => {
  return await db.query.verificationRequests.findFirst({
    where: eq(verificationRequests.userId, userId),
  });
};

// Get All Verification Requests
export const getAllVerificationRequestsService = async (): Promise<
  TVerificationRequestSelect[]
> => {
  return await db.query.verificationRequests.findMany();
};

// Get Verification Requests by Status
export const getVerificationRequestsByStatusService = async (
  status: string
): Promise<TVerificationRequestSelect[]> => {
  return await db.query.verificationRequests.findMany({
    where: eq(verificationRequests.status, status as any),
  });
};

// Update Verification Request Status
export const updateVerificationRequestStatusService =
  async (
    requestId: string,
    status: string,
    adminNotes?: string
  ): Promise<TVerificationRequestSelect> => {
    const [updated] = await db
      .update(verificationRequests)
      .set({
        status: status as any,
        adminNotes: adminNotes || undefined,
        createdAt: new Date(),
      })
      .where(eq(verificationRequests.id, requestId))
      .returning();

    return updated;
  };

// Delete Verification Request
export const deleteVerificationRequestService = async (
  requestId: string
): Promise<void> => {
  await db
    .delete(verificationRequests)
    .where(eq(verificationRequests.id, requestId));
};
