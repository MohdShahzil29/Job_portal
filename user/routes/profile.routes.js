import express from "express";
import { getUserData, getUserPorfile, userProfile } from "../controller/profile.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const app = express.Router();

app.post("/profile", authenticateUser, userProfile);
app.get('/get-user-profile/:id', authenticateUser, getUserPorfile)
export default app;
