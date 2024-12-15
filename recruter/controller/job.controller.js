import cloudinary from "../config/cloudinary.js";
import Job from "../model/job.model.js";
import jobModel from "../model/job.model.js";
import slug from "slugify";

export const createJobApplication = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      salary,
      jobDescription,
      location,
      employmentType,
      experienceLevel,
      skills,
    } = req.body;

    // Validate required fields
    if (
      !jobTitle ||
      !company ||
      !salary ||
      !jobDescription ||
      !location ||
      !employmentType ||
      !experienceLevel ||
      !skills
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle company logo upload if provided
    let companyLogo = "";
    if (req.files && req.files.companyLogo) {
      const result = await cloudinary.uploader.upload(
        req.files.companyLogo.tempFilePath,
        {
          folder: "company_logos",
        }
      );
      companyLogo = result.secure_url;
    }

    // Create URL-friendly slug from job title
    const jobSlug = slug(jobTitle, { lower: true });

    // Create new job posting
    const newJob = await jobModel.create({
      jobTitle,
      company,
      companyLogo,
      salary,
      jobDescription,
      location,
      employmentType,
      experienceLevel,
      skills: Array.isArray(skills) ? skills : [skills],
      postedBy: req.user._id,
      slug: jobSlug,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const jobSearch = async (req, res) => {
  try {
    const { keyword, location, employmentType, experienceLevel } = req.query;

    // Build query object
    const query = {};

    if (keyword) {
      query.$or = [
        { jobTitle: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { jobDescription: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (employmentType) {
      query.employmentType = employmentType;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }

    // Only show open jobs
    query.status = "Open";

    const jobs = await Job.find(query)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getYourPostedJob = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    console.log("User ID:", userId);
    const jobs = await Job.find({
      postedBy: userId,
    }).populate("postedBy", "name email");

    if (!jobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found for this user",
      });
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find({});

    if (!jobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobBySlug = async (req, res) => {
  try {
    const product = await Job.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};
