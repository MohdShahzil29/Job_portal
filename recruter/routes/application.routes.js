import express from "express";
import {
  applyJob,
  // getAppliedJob,
  getRecruiterJobsController,
  // getReqruterJobController,
  getUserAppliedJob,
  updateApplicationStatus,
} from "../controller/application.controller.js";
import { authenticateUser, isRecruter } from "../middleware/auth.js";

const app = express.Router();

app.post("/apply/:id", applyJob);
app.get('/get-user-applied/:id', getUserAppliedJob)
// app.get("/applied-job", getAppliedJob);
app.patch(
  "/update-status/:applicationId",
  authenticateUser,
  updateApplicationStatus
);

app.get('/applied-job/:id', authenticateUser, isRecruter, getRecruiterJobsController)

export default app;
