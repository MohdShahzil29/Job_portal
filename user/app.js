import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import fileUpload from "express-fileupload";

import useRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import redisClient from "./config/redis.js";

// User
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// routes import
app.use("/", useRoutes);
app.use("/", profileRoutes);

export default app;
