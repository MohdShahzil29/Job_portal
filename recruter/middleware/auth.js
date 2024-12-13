import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    // console.log("Authorization Header:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isRecruter = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    // console.log("User ID from token:", userId);
    if (!userId) {
      return res
        .status(401)
        .send({ success: false, message: "No user ID found in token" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found in database" });
    }

    // console.log("User from database:", user);
    if (user?.role !== "recruiter") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
