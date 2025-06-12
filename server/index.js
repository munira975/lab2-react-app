import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './db.js';
import employeeRoutes from './routes/employees.js';
import projectRoutes from './routes/projects.js';
import assignmentRoutes from './routes/project_assignments.js';

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project_assignments', assignmentRoutes);


const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {     
    console.log(`Server running on the port ${PORT}...`);
 });