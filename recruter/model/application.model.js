import mongoose from "mongoose";

// This model is in recuter file

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewing", "Shortlisted", "Rejected", "Hired"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Application model
const Application = mongoose.model("Application", applicationSchema);
export default Application;
