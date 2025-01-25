import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import '../styles/styles.css';

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
    <div className="page-container">
      <div className="page-header">
        <h2>Add Student</h2>
        <div>
          <button
            className="button button-primary"
            onClick={() => navigate('/student-list')}
          >
            Student List
          </button>
          <button
            className="button button-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label>Class</label>
          <input
            type="text"
            {...register('class', { required: 'Class is required' })}
          />
          {errors.class && <span className="error">{errors.class.message}</span>}
        </div>

        <div className="form-field">
          <label>Section</label>
          <input
            type="text"
            {...register('section', { required: 'Section is required' })}
          />
          {errors.section && (
            <span className="error">{errors.section.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Roll Number</label>
          <input
            type="text"
            {...register('rollNumber', {
              required: 'Roll Number is required',
              pattern: {
                value: /^\d+$/,
                message: 'Roll Number must be a number',
              },
            })}
          />
          {errors.rollNumber && (
            <span className="error">{errors.rollNumber.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Age</label>
          <input
            type="number"
            {...register('age', {
              required: 'Age is required',
              min: { value: 5, message: 'Age must be at least 5' },
              max: { value: 20, message: 'Age must not exceed 20' },
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <div className="form-field">
          <label>Address</label>
          <textarea
            {...register('address', { required: 'Address is required' })}
          ></textarea>
          {errors.address && (
            <span className="error">{errors.address.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Phone</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^\d{10}$/, message: 'Phone must be 10 digits' },
            })}
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="form-field">
          <label>Parent Name</label>
          <input
            type="text"
            {...register('parentName', { required: 'Parent Name is required' })}
          />
          {errors.parentName && (
            <span className="error">{errors.parentName.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Parent Phone</label>
          <input
            type="tel"
            {...register('parentPhone', {
              required: 'Parent Phone is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Parent Phone must be 10 digits',
              },
            })}
          />
          {errors.parentPhone && (
            <span className="error">{errors.parentPhone.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Gender</label>
          <select {...register('gender', { required: 'Gender is required' })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Date of Birth</label>
          <input
            type="date"
            {...register('dob', { required: 'Date of Birth is required' })}
          />
          {errors.dob && <span className="error">{errors.dob.message}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="button button-primary">
            Submit
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => navigate('/student-list')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentPage;
