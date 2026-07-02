import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { reports } from "../drizzle/schema";

export type TReportInsert = typeof reports.$inferInsert;
export type TReportSelect = typeof reports.$inferSelect;

// Create Report
export const createReportService = async (
  report: TReportInsert
): Promise<TReportSelect> => {
  const [created] = await db
    .insert(reports)
    .values(report)
    .returning();

  return created;
};

// Get All Reports
export const getAllReportsService = async (): Promise<
  TReportSelect[]
> => {
  return await db.query.reports.findMany();
};

// Get Report by ID
export const getReportByIdService = async (
  reportId: string
): Promise<TReportSelect | undefined> => {
  return await db.query.reports.findFirst({
    where: eq(reports.id, reportId),
  });
};

// Get Reports for a Listing
export const getReportsByListingIdService = async (
  listingId: string
): Promise<TReportSelect[]> => {
  return await db.query.reports.findMany({
    where: eq(reports.listingId, listingId),
  });
};

// Get Reports by Status
export const getReportsByStatusService = async (
  status: string
): Promise<TReportSelect[]> => {
  return await db.query.reports.findMany({
    where: eq(reports.status, status as any),
  });
};

// Get Reports by Reporter ID
export const getReportsByReporterIdService = async (
  reporterId: string
): Promise<TReportSelect[]> => {
  return await db.query.reports.findMany({
    where: eq(reports.reporterId, reporterId),
  });
};

// Update Report Status
export const updateReportStatusService = async (
  reportId: string,
  status: string
): Promise<TReportSelect> => {
  const [updated] = await db
    .update(reports)
    .set({
      status: status as any,
      createdAt: new Date(),
    })
    .where(eq(reports.id, reportId))
    .returning();

  return updated;
};

// Delete Report
export const deleteReportService = async (
  reportId: string
): Promise<void> => {
  await db.delete(reports).where(eq(reports.id, reportId));
};
