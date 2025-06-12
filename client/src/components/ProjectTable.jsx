import React, { useEffect, useState } from 'react';

const ProjectTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortField, setSortField] = useState('start_date');
  const [sortOrder, setSortOrder] = useState('desc');

  
  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/project_assignments');
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
    }
  };

  
  useEffect(() => {
    fetchAssignments(); 
    const interval = setInterval(fetchAssignments, 60000); 

    return () => clearInterval(interval); 
  }, []);

  
  const handleSort = (field) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sorted = [...assignments].sort((a, b) => {
      const valueA = getValue(a, field);
      const valueB = getValue(b, field);

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setAssignments(sorted);
  };

  const getValue = (item, field) => {
    switch (field) {
      case 'employee_id':
        return item.employee_id.employee_id.toLowerCase();
      case 'employee_name':
        return item.employee_id.full_name.toLowerCase();
      case 'project_name':
        return item.project_code.project_name.toLowerCase();
      case 'start_date':
        return new Date(item.start_date);
      default:
        return '';
    }
  };

  return (
    <div>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th onClick={() => handleSort('employee_id')}>Employee ID</th>
            <th onClick={() => handleSort('employee_name')}>Employee Name</th>
            <th onClick={() => handleSort('project_name')}>Project Name</th>
            <th onClick={() => handleSort('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.employee_id.employee_id}</td>
              <td>{a.employee_id.full_name}</td>
              <td>{a.project_code.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
