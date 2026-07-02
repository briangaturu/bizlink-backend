import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { users } from "../drizzle/schema";

export type TUserInsert = typeof users.$inferInsert;
export type TUserSelect = typeof users.$inferSelect;

// Create User
export const createUserServices = async (
user: TUserInsert
): Promise<TUserSelect> => {
const [createdUser] = await db
.insert(users)
.values(user)
.returning();

return createdUser;
};

// Get User By Email
export const getUserByEmailService = async (
email: string
): Promise<TUserSelect | undefined> => {
return await db.query.users.findFirst({
where: eq(users.email, email),
});
};

// Get User By Username
export const getUserByUsernameService = async (
username: string
): Promise<TUserSelect | undefined> => {
return await db.query.users.findFirst({
where: eq(users.username, username),
});
};

// Get User By Id
export const getUserByIdService = async (
userId: string
): Promise<TUserSelect | undefined> => {
return await db.query.users.findFirst({
where: eq(users.userId, userId),
});
};

// Update Password
export const updateUserPasswordService = async (
userId: string,
passwordHash: string
): Promise<void> => {
await db
.update(users)
.set({
password: passwordHash,
updatedAt: new Date(),
})
.where(eq(users.userId, userId));
};
