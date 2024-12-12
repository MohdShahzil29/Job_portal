import Profile from "../models/profile.model.js";

export const userProfile = async (req, res) => {
  try {
    const { bio, phoneNumber, address, socialMedia, skills, education } =
      req.body;
    const userId = req.user?._id;

    // Check if profile already exists
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    let avatar = "";
    if (req.files && req.files.avatar) {
      const result = await cloudinary.uploader.upload(
        req.files.companyLogo.tempFilePath,
        {
          folder: "user_avatar",
        }
      );
      avatar = result.secure_url;
    }

    // Create new profile
    profile = await Profile.create({
      user: userId,
      bio,
      avatar,
      phoneNumber,
      address: {
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        country: address?.country || "",
      },
      socialMedia: {
        facebook: socialMedia?.facebook || "",
        twitter: socialMedia?.twitter || "",
        instagram: socialMedia?.instagram || "",
        linkedin: socialMedia?.linkedin || "",
      },
      skills: skills || [],
      education: education || [],
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating profile",
      error: error.message,
    });
  }
};

export const getUserPorfile = async (req, res) => {
  try {
    const userId = req.user.id;

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
