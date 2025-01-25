import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import '../styles/EditStudentPage.css'; // Import the updated CSS

const EditStudentPage = ({ open, onClose, student, onUpdate }) => {
  const [name, setName] = useState(student.name || '');
  const [classValue, setClassValue] = useState(student.class || '');
  const [section, setSection] = useState(student.section || '');
  const [rollNumber, setRollNumber] = useState(student.rollNumber || '');

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="edit-student-page">
      <DialogTitle className="edit-student-page__title">Edit Student</DialogTitle>
      <DialogContent className="edit-student-page__content">
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          className="edit-student-page__input"
        />
        <TextField
          label="Class"
          fullWidth
          variant="outlined"
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          margin="normal"
          className="edit-student-page__input"
        />
        <TextField
          label="Section"
          fullWidth
          variant="outlined"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          margin="normal"
          className="edit-student-page__input"
        />
        <TextField
          label="Roll Number"
          fullWidth
          variant="outlined"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          margin="normal"
          className="edit-student-page__input"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          className="edit-student-page__button edit-student-page__button--cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          color="primary"
          variant="contained"
          className="edit-student-page__button edit-student-page__button--update"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentPage;
