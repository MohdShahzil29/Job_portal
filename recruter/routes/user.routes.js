import express from "express";
import { login, logout, register } from "../controller/user.controller.js";
import { authenticateUser, isRecruter } from "../middleware/auth.js";

const app = express.Router();

app.post("/register", register);
app.post("/login", login);
app.get("/is-recruter", authenticateUser, isRecruter, (req, res) => {
  res.status(200).send({ ok: true });
});
app.get("/logout", logout);

export default app;
