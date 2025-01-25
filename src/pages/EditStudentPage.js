import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import '../styles/EditStudentPage.css'; // Custom styles

const EditStudentPage = ({ open, onClose, student, onUpdate }) => {
  const [name, setName] = useState(student.name || '');
  const [classValue, setClassValue] = useState(student.class || '');
  const [section, setSection] = useState(student.section || '');
  const [rollNumber, setRollNumber] = useState(student.rollNumber || '');

  // Ensures student data is correctly set when modal is opened
  useEffect(() => {
    setName(student.name || '');
    setClassValue(student.class || '');
    setSection(student.section || '');
    setRollNumber(student.rollNumber || '');
  }, [student]);

  const handleUpdate = () => {
    const updatedStudent = {
      id: student.id,
      name,
      class: classValue,
      section,
      rollNumber,
    };
    onUpdate(updatedStudent); // Pass updated student to parent
    onClose(); // Close the page/modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="edit-student-modal">
        <div className="edit-student-modal__header">
          <h2>Edit Student</h2>
          <Button
            className="close-button"
            onClick={onClose}
            startIcon={<FaTimes />}
          />
        </div>
        <div className="edit-student-modal__content">
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            className="edit-student-modal__input"
          />
          <TextField
            label="Class"
            fullWidth
            variant="outlined"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            margin="normal"
            className="edit-student-modal__input"
          />
          <TextField
            label="Section"
            fullWidth
            variant="outlined"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            margin="normal"
            className="edit-student-modal__input"
          />
          <TextField
            label="Roll Number"
            fullWidth
            variant="outlined"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            margin="normal"
            className="edit-student-modal__input"
          />
        </div>
        <div className="edit-student-modal__actions">
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditStudentPage;
