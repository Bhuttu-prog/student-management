import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

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
      navigate('/student-list'); // Redirect to the Student List page
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out using Firebase Auth
      navigate('/'); // Navigate to the Login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {/* Additional Buttons */}
      <div style={{ marginTop: '20px' }}>
        {/* Navigate to Student List Button */}
        <button
          type="button"
          onClick={() => navigate('/student-list')} // Navigate to Student List page
        >
          Student List
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout} // Logout and navigate to Login page
        >
          Logout
        </button>
      </div>

      <h2>Add Student</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        {/* Class Field */}
        <input
          type="text"
          placeholder="Class"
          {...register('class', { required: 'Class is required' })}
        />
        {errors.class && <span className="error">{errors.class.message}</span>}

        {/* Section Field */}
        <input
          type="text"
          placeholder="Section"
          {...register('section', { required: 'Section is required' })}
        />
        {errors.section && <span className="error">{errors.section.message}</span>}

        {/* Roll Number Field */}
        <input
          type="text"
          placeholder="Roll Number"
          {...register('rollNumber', {
            required: 'Roll Number is required',
            pattern: { value: /^\d+$/, message: 'Roll Number must be a number' },
          })}
        />
        {errors.rollNumber && <span className="error">{errors.rollNumber.message}</span>}

        {/* Age Field */}
        <input
          type="number"
          placeholder="Age"
          {...register('age', {
            required: 'Age is required',
            min: { value: 5, message: 'Age must be at least 5' },
            max: { value: 20, message: 'Age must not exceed 20' },
          })}
        />
        {errors.age && <span className="error">{errors.age.message}</span>}

        {/* Address Field */}
        <input
          type="text"
          placeholder="Address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}

        {/* Phone Field */}
        <input
          type="tel"
          placeholder="Phone"
          {...register('phone', {
            required: 'Phone is required',
            pattern: { value: /^\d{10}$/, message: 'Phone must be a 10-digit number' },
          })}
        />
        {errors.phone && <span className="error">{errors.phone.message}</span>}

        {/* Parent Name Field */}
        <input
          type="text"
          placeholder="Parent Name"
          {...register('parentName', { required: 'Parent Name is required' })}
        />
        {errors.parentName && <span className="error">{errors.parentName.message}</span>}

        {/* Parent Phone Field */}
        <input
          type="tel"
          placeholder="Parent Phone"
          {...register('parentPhone', {
            required: 'Parent Phone is required',
            pattern: { value: /^\d{10}$/, message: 'Parent Phone must be a 10-digit number' },
          })}
        />
        {errors.parentPhone && <span className="error">{errors.parentPhone.message}</span>}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        {/* Gender Field */}
        <select {...register('gender', { required: 'Gender is required' })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="error">{errors.gender.message}</span>}

        {/* Date of Birth Field */}
        <input
          type="date"
          {...register('dob', { required: 'Date of Birth is required' })}
        />
        {errors.dob && <span className="error">{errors.dob.message}</span>}

        {/* Submit Button */}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/student-list')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
