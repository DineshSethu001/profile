import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router();


/* ---------------- LOGIN ---------------- */

/* ---------------- LOGIN ---------------- */

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    /* 1️⃣ DEFAULT ADMIN LOGIN (fallback) */

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ token });
    }


    /* 2️⃣ DATABASE ADMIN LOGIN */

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- GET PROJECTS ---------------- */

router.get("/projects", auth, async(req,res)=>{

  const projects = await Project.find().sort({createdAt:-1});

  res.json(projects);

});


/* ---------------- CREATE PROJECT ---------------- */

router.post(
  "/projects",
  auth,
  upload.single("image"),
  async (req,res)=>{

    try{

      const project = new Project({

        title:req.body.title,
        description:req.body.description,
        image:req.file?.path,
        liveLink:req.body.liveLink,
        sourceLink:req.body.sourceLink,
        techStack:req.body.techStack,
        featured:req.body.featured

      });

      await project.save();

      res.json(project);

    } catch(error){

      res.status(500).json({message:"Server error"});

    }

});


/* ---------------- UPDATE PROJECT ---------------- */

router.put(
  "/projects/:id",
  auth,
  upload.single("image"),
  async (req,res)=>{

    try{

      const updateData = {};

      if(req.body.title !== undefined) updateData.title = req.body.title;
      if(req.body.description !== undefined) updateData.description = req.body.description;
      if(req.body.liveLink !== undefined) updateData.liveLink = req.body.liveLink;
      if(req.body.sourceLink !== undefined) updateData.sourceLink = req.body.sourceLink;
      if(req.body.techStack !== undefined) updateData.techStack = req.body.techStack;
      if(req.body.featured !== undefined) updateData.featured = req.body.featured;

      if(req.file){
        updateData.image = req.file.path;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        {new:true}
      );

      res.json(project);

    } catch(error){

      res.status(500).json({message:"Server error"});

    }

});


/* ---------------- DELETE PROJECT ---------------- */

router.delete("/projects/:id", auth, async(req,res)=>{

  await Project.findByIdAndDelete(req.params.id);

  res.json({message:"Project deleted"});

});


export default router;