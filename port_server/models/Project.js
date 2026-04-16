import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    techStack: [
      {
        type: [String],
        default:[]
      },
    ],

    githubLink:{type: String,default:" "},
    liveLink: String,
    sourceLink: String,
    image: String,

    // 🔥 Multiple images support
    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      trim:true,
      enum: ["frontend", "backend", "fullstack", "mobile"],
      default: "fullstack",
    },

    featured: {
      type: Boolean,
      default: false,
      index:true
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema, "ProjectCollection");

export default Project;
