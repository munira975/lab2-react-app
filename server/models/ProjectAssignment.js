import mongoose from'mongoose';

const ProjectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
  project_code: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  start_date: { type: Date, required: true },
});

export default mongoose.model('ProjectAssignment', ProjectAssignmentSchema);
