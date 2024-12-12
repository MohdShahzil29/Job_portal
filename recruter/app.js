import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes import

app.use("/auth", userRoutes);
app.use("/job", jobRoutes);
app.use("/", applicationRoutes);

export default app;
