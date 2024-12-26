import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import JWT from "jsonwebtoken";
import redisClient from "../config/redis.js";

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, company, position, phone } = req.body;

    // Validation
    if (!name || !email || !password || !company || !position || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    // Check Redis cache for existing user
    const cachedUser = await redisClient.get(email);
    if (cachedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Check database for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await redisClient.set(email, JSON.stringify(existingUser), "EX", 3600); // Cache user for 1 hour
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      company,
      position,
      phone,
    });

    // Cache new user
    await redisClient.set(email, JSON.stringify(user), "EX", 3600); // Cache user for 1 hour

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        company: user.company,
        position: user.position,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Redis cache for user
    let user = await redisClient.get(email);
    if (user) {
      user = JSON.parse(user);
    } else {
      // If not in cache, fetch from database
      user = await User.findOne({ email });
      if (user) {
        await redisClient.set(email, JSON.stringify(user), "EX", 3600); // Cache user for 1 hour
      }
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token and store in Redis
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await redisClient.set(`token:${user._id}`, token, "EX", 86400); // Cache token for 1 day

    // Set cookie
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        position: user.position,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    // Invalidate token in Redis
    if (token) {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      await redisClient.del(`token:${decoded.id}`);
    }

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in logout",
      error: error.message,
    });
  }
};
