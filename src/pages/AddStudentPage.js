import React, { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/AddStudentPage.css'; // Custom styles

const AddStudentPage = ({ open, onClose, onStudentAdded }) => {
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

  const [errors, setErrors] = useState({}); // Object to store validation errors

  const validateFields = () => {
    let validationErrors = {};
    let isValid = true;

    if (!name) {
      validationErrors.name = 'Name is required';
      isValid = false;
    }
    if (!classValue) {
      validationErrors.classValue = 'Class is required';
      isValid = false;
    }
    if (!section) {
      validationErrors.section = 'Section is required';
      isValid = false;
    }
    if (!rollNumber || rollNumber <= 0) {
      validationErrors.rollNumber = 'Valid roll number is required';
      isValid = false;
    }
    if (!age || isNaN(age) || age <= 0) {
      validationErrors.age = 'Valid age is required';
      isValid = false;
    }
    if (!address) {
      validationErrors.address = 'Address is required';
      isValid = false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      validationErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (!parentName) {
      validationErrors.parentName = 'Parent name is required';
      isValid = false;
    }
    if (!parentPhone || !/^\d{10}$/.test(parentPhone)) {
      validationErrors.parentPhone = 'Parent phone number must be 10 digits';
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!gender) {
      validationErrors.gender = 'Gender is required';
      isValid = false;
    }
    if (!dob) {
      validationErrors.dob = 'Date of birth is required';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const resetFields = () => {
    setName('');
    setClassValue('');
    setSection('');
    setRollNumber('');
    setAge('');
    setAddress('');
    setPhone('');
    setParentName('');
    setParentPhone('');
    setEmail('');
    setGender('');
    setDob('');
    setErrors({});
  };

  const handleAddStudent = async () => {
    if (!validateFields()) return; // Only proceed if the form is valid

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
      const docRef = await addDoc(collection(db, 'students'), newStudent);
      alert('Student added successfully!');
      onStudentAdded({ id: docRef.id, ...newStudent }); // Send the new student back to StudentsPage
      resetFields(); // Clear form fields
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
            aria-label="Close Add Student Modal"
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
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Class"
            fullWidth
            variant="outlined"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            error={!!errors.classValue}
            helperText={errors.classValue}
          />
          <TextField
            label="Section"
            fullWidth
            variant="outlined"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            error={!!errors.section}
            helperText={errors.section}
          />
          <TextField
            label="Roll Number"
            fullWidth
            variant="outlined"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            type="number"
            error={!!errors.rollNumber}
            helperText={errors.rollNumber}
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
            error={!!errors.age}
            helperText={errors.age}
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
            rows={3}
            error={!!errors.address}
            helperText={errors.address}
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
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Parent Name"
            fullWidth
            variant="outlined"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            margin="normal"
            className="add-student-modal__input"
            error={!!errors.parentName}
            helperText={errors.parentName}
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
            error={!!errors.parentPhone}
            helperText={errors.parentPhone}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.gender}
            helperText={errors.gender}
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
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
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
