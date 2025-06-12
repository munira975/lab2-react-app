import express from 'express';
import ProjectAssignment from '../models/ProjectAssignment.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;

    if (!employee_id || !project_code || !start_date) {
      return res.status(400).json({ error: 'Fields are missing' });
    }

    const newAssignment = new ProjectAssignment({ employee_id, project_code, start_date });
    await newAssignment.save();

    res.status(201).json({ message: 'A new project assignment is created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('employee_id', 'employee_id full_name')
      .populate('project_code', 'project_code project_name')
      .sort({ start_date: -1 })
      .limit(5);

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
