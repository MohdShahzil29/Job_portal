import Application from "../model/application.model.js";
import Job from "../model/job.model.js";
import { getUserFromKafka } from "../services/kafka.service.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = await getUserFromKafka(req);

    console.log("User Id: ", userId);
    if (!userId) {
      return res.status(400).json({ message: "User not found in Kafka cache" });
    }

    console.log("Job Id: ", jobId);
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status === "Closed") {
      return res.status(400).json({ message: "This job posting is closed" });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = new Application({
      job: jobId,
      applicant: userId,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error in applyJob:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = await getUserFromKafka(req); 
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications.length) {
      return res.status(200).json({
        success: true,
        message: "No job applications found",
        applications: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Applied jobs fetched successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applied jobs",
      error: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Reviewing",
      "Shortlisted",
      "Rejected",
      "Hired",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({
      message: "Application status updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      message: "An error occurred while updating the application status.",
    });
  }
};
