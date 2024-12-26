import Profile from "../models/profile.model.js";
import cloudinary from "../config/cloudinary.js";
import redisClient from "../config/redis.js";

export const userProfile = async (req, res) => {
  try {
    const { bio, phoneNumber, address, socialMedia, skills, education } =
      req.body;

    // Parse JSON strings into arrays if necessary
    const parsedSkills = skills ? JSON.parse(skills) : [];
    const parsedEducation = education ? JSON.parse(education) : [];

    // Validate parsed skills and education are arrays of objects
    if (!Array.isArray(parsedSkills)) {
      return res.status(400).json({ message: "Skills should be an array." });
    }
    if (!Array.isArray(parsedEducation)) {
      return res.status(400).json({ message: "Education should be an array." });
    }

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.status(400).json({ message: "Profile already exists." });
    }

    // Handle profile creation
    let avatar = "";
    if (req.files && req.files.avatar) {
      const result = await cloudinary.uploader.upload(
        req.files.avatar.tempFilePath,
        { folder: "user_avatar" }
      );
      avatar = result.secure_url;
    }

    profile = await Profile.create({
      user: req.user._id,
      bio,
      avatar,
      phoneNumber,
      address: JSON.parse(address),
      socialMedia: JSON.parse(socialMedia),
      skills: parsedSkills,
      education: parsedEducation,
    });

    // Cache the new profile in Redis
    await redisClient.set(`profile:${req.user._id}`, JSON.stringify(profile), {
      EX: 3600, // Cache for 1 hour
    });

    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating profile",
      error: error.message,
    });
  }
};

export const getUserPorfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check Redis cache
    const cachedProfile = await redisClient.get(`profile:${userId}`);
    if (cachedProfile) {
      return res.status(200).json({
        success: true,
        profile: JSON.parse(cachedProfile),
      });
    }

    // Find profile by userId
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Cache the profile for future requests
    await redisClient.set(`profile:${userId}`, JSON.stringify(profile), {
      EX: 3600, // Cache for 1 hour
    });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};
