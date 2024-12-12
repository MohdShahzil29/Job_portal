import express from "express";
import {
  applyJob,
  getAppliedJob,
  updateApplicationStatus,
} from "../controller/application.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const app = express.Router();

app.post("/apply/:id", authenticateUser, applyJob);
app.get("/applied-job", authenticateUser, getAppliedJob);
app.patch(
  "/update-status/:applicationId",
  authenticateUser,
  updateApplicationStatus
);

export default app;
