import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

function normalizeOptionalString(value) {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return "";
  }

  const lowerCased = normalized.toLowerCase();

  if (lowerCased === "undefined" || lowerCased === "null") {
    return "";
  }

  return normalized;
}

function normalizeOptionalUrl(value) {
  const normalized = normalizeOptionalString(value);

  if (!normalized) {
    return "";
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return "";
}

function normalizeProjectPayload(body) {
  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    sourceLink,
    image,
    images,
    category,
    featured,
  } = body;

  const normalizedTechStack = Array.isArray(techStack)
    ? techStack.map((item) => item.trim()).filter(Boolean)
    : String(techStack || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const normalizedImages = Array.isArray(images)
    ? images.map((item) => normalizeOptionalUrl(item)).filter(Boolean)
    : String(images || "")
        .split(",")
        .map((item) => normalizeOptionalUrl(item))
        .filter(Boolean);

  return {
    title: normalizeOptionalString(title),
    description: normalizeOptionalString(description),
    techStack: normalizedTechStack,
    githubLink: normalizeOptionalUrl(githubLink),
    liveLink: normalizeOptionalUrl(liveLink),
    sourceLink: normalizeOptionalUrl(sourceLink),
    image: normalizeOptionalUrl(image),
    images: normalizedImages,
    category: normalizeOptionalString(category) || "fullstack",
    featured: Boolean(featured),
  };
}

router.post("/", async (req, res) => {
  try {
    const projectData = normalizeProjectPayload(req.body);

    if (!projectData.title || !projectData.description) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const projectData = normalizeProjectPayload(req.body);

    if (!projectData.title || !projectData.description) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
