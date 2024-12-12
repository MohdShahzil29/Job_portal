import express from "express";
import { login, logout, register } from "../controller/user.controller.js";

const app = express.Router();

app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

export default app;
