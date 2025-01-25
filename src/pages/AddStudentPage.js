import React, { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/AddStudentPage.css'; // Custom styles

const AddStudentPage = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const handleAddStudent = async () => {
    const newStudent = {
      name,
      class: classValue,
      section,
      rollNumber,
      age,
      address,
      phone,
      parentName,
      parentPhone,
      email,
      gender,
      dob,
    };

    try {
      await addDoc(collection(db, 'students'), newStudent);
      alert('Student added successfully!');
      onClose(); // Close modal after adding
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="add-student-modal">
        <div className="add-student-modal__header">
          <h2>Add Student</h2>
          <Button
            className="close-button"
            onClick={onClose}
            startIcon={<FaTimes />}
          />
        </div>
        <div className="add-student-modal__content">
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
          />
          <TextField
            label="Class"
            fullWidth
            variant="outlined"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
          />
          <TextField
            label="Section"
            fullWidth
            variant="outlined"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
          />
          <TextField
            label="Roll Number"
            fullWidth
            variant="outlined"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
          />
          <TextField
            label="Age"
            fullWidth
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="number"
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            multiline
            rows={4}
          />
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="tel"
          />
          <TextField
            label="Parent Name"
            fullWidth
            variant="outlined"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
          />
          <TextField
            label="Parent Phone"
            fullWidth
            variant="outlined"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="tel"
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="email"
          />
          <TextField
            label="Gender"
            fullWidth
            variant="outlined"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            select
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            fullWidth
            variant="outlined"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="add-student-modal__actions">
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddStudent} variant="contained" color="primary">
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddStudentPage;
