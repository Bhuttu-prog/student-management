import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import '../styles/AddStudentPage.css'; // Import the updated styles

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
    <div className="add-student-page">
      <div className="add-student-page__header">
        <h2 className="add-student-page__title">Add Student</h2>
        <div className="add-student-page__actions">
          <button
            className="button button--primary"
            onClick={() => navigate('/student-list')}
          >
            Student List
          </button>
          <button
            className="button button--danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="add-student-page__form">
        <div className="form-field">
          <label className="form-field__label">Name</label>
          <input
            type="text"
            className="form-field__input"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="form-field__error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Class</label>
          <input
            type="text"
            className="form-field__input"
            {...register('class', { required: 'Class is required' })}
          />
          {errors.class && <span className="form-field__error">{errors.class.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Section</label>
          <input
            type="text"
            className="form-field__input"
            {...register('section', { required: 'Section is required' })}
          />
          {errors.section && <span className="form-field__error">{errors.section.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Roll Number</label>
          <input
            type="text"
            className="form-field__input"
            {...register('rollNumber', {
              required: 'Roll Number is required',
              pattern: {
                value: /^\d+$/,
                message: 'Roll Number must be a number',
              },
            })}
          />
          {errors.rollNumber && <span className="form-field__error">{errors.rollNumber.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Age</label>
          <input
            type="number"
            className="form-field__input"
            {...register('age', {
              required: 'Age is required',
              min: { value: 5, message: 'Age must be at least 5' },
              max: { value: 20, message: 'Age must not exceed 20' },
            })}
          />
          {errors.age && <span className="form-field__error">{errors.age.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Address</label>
          <textarea
            className="form-field__input"
            {...register('address', { required: 'Address is required' })}
          ></textarea>
          {errors.address && <span className="form-field__error">{errors.address.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Phone</label>
          <input
            type="tel"
            className="form-field__input"
            {...register('phone', {
              required: 'Phone is required',
              pattern: { value: /^\d{10}$/, message: 'Phone must be 10 digits' },
            })}
          />
          {errors.phone && <span className="form-field__error">{errors.phone.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Parent Name</label>
          <input
            type="text"
            className="form-field__input"
            {...register('parentName', { required: 'Parent Name is required' })}
          />
          {errors.parentName && <span className="form-field__error">{errors.parentName.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Parent Phone</label>
          <input
            type="tel"
            className="form-field__input"
            {...register('parentPhone', {
              required: 'Parent Phone is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Parent Phone must be 10 digits',
              },
            })}
          />
          {errors.parentPhone && <span className="form-field__error">{errors.parentPhone.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Email</label>
          <input
            type="email"
            className="form-field__input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="form-field__error">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Gender</label>
          <select
            className="form-field__input"
            {...register('gender', { required: 'Gender is required' })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="form-field__error">{errors.gender.message}</span>}
        </div>

        <div className="form-field">
          <label className="form-field__label">Date of Birth</label>
          <input
            type="date"
            className="form-field__input"
            {...register('dob', { required: 'Date of Birth is required' })}
          />
          {errors.dob && <span className="form-field__error">{errors.dob.message}</span>}
        </div>

        <div className="add-student-page__buttons">
          <button type="submit" className="button button--primary">
            Submit
          </button>
          <button
            type="button"
            className="button button--secondary"
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
