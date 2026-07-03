import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./Auth/auth.route";
import usersRouter from "./Users/users.route";

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (_req, res) => {
  res.json({ success: true, message: "BizLink API is running 🚀" });
});

/* =========================
   404 HANDLER
========================= */

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;