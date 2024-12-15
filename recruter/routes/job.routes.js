import express from "express";
import {
  createJobApplication,
  getAllJob,
  getYourPostedJob,
  jobSearch,
  getJobBySlug,
} from "../controller/job.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const app = express.Router();

app.post("/job-application", authenticateUser, createJobApplication);
app.get("/search-job", jobSearch);
app.get("/your-job", authenticateUser, getYourPostedJob);
app.get("/get-all-job", getAllJob);
app.get("/get-post/:slug", getJobBySlug);

export default app;
