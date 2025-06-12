import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { project_code, project_name, project_description } = req.body;

    if (!project_code || !project_name) {
      return res.status(400).json({ error: 'Required fields are' });
    }

    const id_exists = await Project.findOne({ project_code });
    if (id_exists) return res.status(400).json({ error: 'Project code must be unique' });

    const newProject = new Project({ project_code, project_name, project_description });
    await newProject.save();

    res.status(201).json({ message: 'A new project is created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
