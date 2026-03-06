import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    image: {
      type: String
    },

    liveLink: {
      type: String
    },

    sourceLink: {
      type: String
    },

    techStack: [
      {
        type: String
      }
    ],

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Project", projectSchema);