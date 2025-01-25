import React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import '../styles/ViewStudentPage.css'; // Custom styles

const ViewStudentPage = ({ open, onClose, student }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="view-student-modal">
        <div className="view-student-modal__header">
          <h2>View Student</h2>
          <Button
            className="close-button"
            onClick={onClose}
            startIcon={<FaTimes />}
          />
        </div>
        <div className="view-student-modal__content">
          {Object.keys(student).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={student[key] || ''}
              fullWidth
              InputProps={{
                readOnly: true, // Make the fields read-only
              }}
              margin="normal"
            />
          ))}
        </div>
        <div className="view-student-modal__actions">
          <Button onClick={onClose} variant="contained" color="secondary">
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewStudentPage;
