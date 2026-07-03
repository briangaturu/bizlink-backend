import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByEmailService,
  getUserByIdService,
  updateUserPasswordService,
} from "../Users/users.service";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

/* =========================
   TOKEN HELPERS
========================= */

export const generateAccessToken = (userId: string, role: string): string =>
  jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: "15m" });

export const generateRefreshToken = (userId: string): string =>
  jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string): { userId: string; role: string } =>
  jwt.verify(token, ACCESS_SECRET) as { userId: string; role: string };

export const verifyRefreshToken = (token: string): { userId: string } =>
  jwt.verify(token, REFRESH_SECRET) as { userId: string };

/* =========================
   REGISTER
========================= */

export const registerService = async (input: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
}) => {
  const existingEmail = await getUserByEmailService(input.email);
  if (existingEmail) throw new Error("Email already in use");

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await createUserService({ ...input, password: passwordHash });

  return {
    user,
    accessToken: generateAccessToken(user.userId, user.role),
    refreshToken: generateRefreshToken(user.userId),
  };
};

/* =========================
   LOGIN
========================= */

export const loginService = async (input: {
  email: string;
  password: string;
}) => {
  const user = await getUserByEmailService(input.email);
  if (!user) throw new Error("Invalid email or password");
  if (!user.isActive) throw new Error("Account is deactivated");

  const match = await bcrypt.compare(input.password, user.password);
  if (!match) throw new Error("Invalid email or password");

  return {
    user,
    accessToken: generateAccessToken(user.userId, user.role),
    refreshToken: generateRefreshToken(user.userId),
  };
};

/* =========================
   REFRESH TOKEN
========================= */

export const refreshTokenService = async (refreshToken: string) => {
  const { userId } = verifyRefreshToken(refreshToken);
  const user = await getUserByIdService(userId);
  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("Account is deactivated");

  return {
    accessToken: generateAccessToken(user.userId, user.role),
    refreshToken: generateRefreshToken(user.userId),
  };
};

/* =========================
   CHANGE PASSWORD
========================= */

export const changePasswordService = async (
  userId: string,
  input: { currentPassword: string; newPassword: string }
) => {
  const user = await getUserByIdService(userId);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(input.currentPassword, user.password);
  if (!match) throw new Error("Current password is incorrect");

  const newHash = await bcrypt.hash(input.newPassword, 10);
  await updateUserPasswordService(userId, newHash);
};