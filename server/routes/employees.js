import express from 'express';
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { employee_id, full_name, email, password } = req.body;

    if (!employee_id || !full_name || !email || !password) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const id_exists = await Employee.findOne({ employee_id });
    if (id_exists) return res.status(400).json({ error: 'Employee ID must be unique' });

    const hashed_password = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({ employee_id, full_name, email, hashed_password });
    await newEmployee.save();

    res.status(201).json({ message: 'A new employee is created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
