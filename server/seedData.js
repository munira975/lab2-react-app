import mongoose from'mongoose';
import dbConnect from "./db.js";
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';
import Employee from'./models/Employee.js';
import Project from'./models/Project.js';
import ProjectAssignment from'./models/ProjectAssignment.js';

dotenv.config({ path: path.resolve('../.env') });

async function seedData() {
    try {
        await dbConnect();

        await Employee.deleteMany({});
        await Project.deleteMany({});
        await ProjectAssignment.deleteMany({});
    
        const hashedPasswords = await Promise.all([
          bcrypt.hash('braco1', 10),
          bcrypt.hash('daniel2', 10),
          bcrypt.hash('kamilla3', 10),
          bcrypt.hash('deema4', 10),
          bcrypt.hash('eric5', 10),
        ]);
    
     
        const employees = await Employee.insertMany([
          { employee_id: 'E1', full_name: 'Braco Veletanlic', email: 'braco@example.com', hashed_password: hashedPasswords[0] },
          { employee_id: 'E2', full_name: 'Daniel Einarson', email: 'daniel@example.com', hashed_password: hashedPasswords[1] },
          { employee_id: 'E3', full_name: 'Kamilla Klonowska', email: 'kamilla@example.com', hashed_password: hashedPasswords[2] },
          { employee_id: 'E4', full_name: 'Deema Aloom', email: 'deema@example.com', hashed_password: hashedPasswords[3] },
          { employee_id: 'E5', full_name: 'Eric Chen', email: 'eric@example.com', hashed_password: hashedPasswords[4] },
        ]);
    
     
        const projects = await Project.insertMany([
          { project_code: 'P1', project_name: 'Agile Project', project_description: 'Focuses on agile' },
          { project_code: 'P2', project_name: 'AI Dashboard', project_description: 'Visualizes AI data' },
          { project_code: 'P3', project_name: 'E-Commerce', project_description: 'Online Shoppin Platform' },
          { project_code: 'P4', project_name: 'E-Learning', project_description: 'Online learning platform' },
          { project_code: 'P5', project_name: 'Step Tracker', project_description: 'Tracks the number of steps' },
        ]);
    
       
       
        const assignments = await ProjectAssignment.insertMany([
          { employee_id: employees[0]._id, project_code: projects[0]._id, start_date: new Date('2025-01-15') },
          { employee_id: employees[1]._id, project_code: projects[1]._id, start_date: new Date('2025-02-20') },
          { employee_id: employees[2]._id, project_code: projects[2]._id, start_date: new Date('2025-03-10') },
          { employee_id: employees[3]._id, project_code: projects[3]._id, start_date: new Date('2025-04-05') },
          { employee_id: employees[4]._id, project_code: projects[4]._id, start_date: new Date('2025-05-01') },
        ]);
    
        
        console.log('Sample data added!');
        mongoose.disconnect();
      } catch (err) {
        console.error('Error inserting data:', err.message);
      }
    }

seedData();
