import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../Auth/auth.service";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Access token is required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload; // { userId, role }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

// Role-based guard — use after authenticate
export const authorize = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const userRole = (req as any).user?.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to do this",
      });
      return;
    }

    next();
  };
};