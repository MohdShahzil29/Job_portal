import express from "express";
import { userDetails, userLogin, userRegister } from "../controller/user.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const app = express.Router();
app.post("/register", userRegister);
app.post("/login", userLogin);
app.get('/user-details/:id', userDetails);
app.get("/user-auth", authenticateUser, (req, res) => {
  res.status(200).send({ ok: true });
});
export default app;
