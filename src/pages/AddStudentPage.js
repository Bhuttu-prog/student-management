import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { Logout } from '@mui/icons-material';
import '../styles/AddStudentPage.css'; // Custom Styles (if any)

const AddStudentPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'students'), data);
      alert('Student added successfully!');
      reset();
      navigate('/student-list');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="add-student-container">
      <div className="add-student-header">
        <Typography variant="h4" gutterBottom>Add Student</Typography>
        <div className="add-student-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/student-list')}
          >
            Student List
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={Boolean(errors.name)}
              helperText={errors.name && errors.name.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Class"
              {...register('class', { required: 'Class is required' })}
              error={Boolean(errors.class)}
              helperText={errors.class && errors.class.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Section"
              {...register('section', { required: 'Section is required' })}
              error={Boolean(errors.section)}
              helperText={errors.section && errors.section.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Roll Number"
              {...register('rollNumber', {
                required: 'Roll Number is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Roll Number must be a number',
                },
              })}
              error={Boolean(errors.rollNumber)}
              helperText={errors.rollNumber && errors.rollNumber.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              type="number"
              {...register('age', {
                required: 'Age is required',
                min: { value: 5, message: 'Age must be at least 5' },
                max: { value: 20, message: 'Age must not exceed 20' },
              })}
              error={Boolean(errors.age)}
              helperText={errors.age && errors.age.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={4}
              {...register('address', { required: 'Address is required' })}
              error={Boolean(errors.address)}
              helperText={errors.address && errors.address.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              type="tel"
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone must be 10 digits',
                },
              })}
              error={Boolean(errors.phone)}
              helperText={errors.phone && errors.phone.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent Name"
              {...register('parentName', { required: 'Parent Name is required' })}
              error={Boolean(errors.parentName)}
              helperText={errors.parentName && errors.parentName.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent Phone"
              type="tel"
              {...register('parentPhone', {
                required: 'Parent Phone is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Parent Phone must be 10 digits',
                },
              })}
              error={Boolean(errors.parentPhone)}
              helperText={errors.parentPhone && errors.parentPhone.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gender"
              select
              {...register('gender', { required: 'Gender is required' })}
              error={Boolean(errors.gender)}
              helperText={errors.gender && errors.gender.message}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              {...register('dob', { required: 'Date of Birth is required' })}
              error={Boolean(errors.dob)}
              helperText={errors.dob && errors.dob.message}
            />
          </Grid>

          <Grid item xs={12} className="add-student-buttons">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/student-list')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddStudentPage;
