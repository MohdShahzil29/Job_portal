import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import redisClient from '../config/redis.js'

// User middelwares
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if token is valid in Redis
    const cachedToken = await redisClient.get(`session:${decoded.id}`);
    if (!cachedToken || cachedToken !== token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid session" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
