import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import EditStudentPage from './EditStudentPage'; // Import the EditStudentPage modal
import ViewStudentPage from './ViewStudentPage'; // Import the ViewStudentPage modal
import AddStudentPage from './AddStudentPage'; // Import the AddStudentPage modal
import '../styles/StudentPage.css'; // Custom Styles

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false); // State for View Modal
  const [openAddModal, setOpenAddModal] = useState(false); // State for Add Student Modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      setStudents((prev) => prev.filter((student) => student.id !== id));
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
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

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenEditModal(true); // Open the edit modal when edit button is clicked
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setOpenViewModal(true); // Open the view modal when view button is clicked
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const studentRef = doc(db, 'students', updatedStudent.id);
      await updateDoc(studentRef, updatedStudent);
      setStudents((prev) =>
        prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
      );
      setOpenEditModal(false); // Close the edit modal after updating
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Function to handle the closing of the Add Student modal
  const handleAddStudentClose = () => {
    setOpenAddModal(false); // Close the add student modal
  };

  return (
    <div className="student-list-container">
      <h2 className="student-list-container__title">Students List</h2>
      <div className="student-list-container__buttons">
        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)} // Open the Add Student modal
        >
          Add Student
        </Button>
      </div>

      <TableContainer component={Paper} className="student-list-container__table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      color="info"
                      startIcon={<FaEye />}
                      onClick={() => handleView(student)} // Open view modal on view button click
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<FaEdit />}
                      onClick={() => handleEdit(student)} // Open edit modal on edit button click
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<FaTrash />}
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Student Modal (Page) */}
      {selectedStudent && (
        <EditStudentPage
          open={openEditModal}
          onClose={() => setOpenEditModal(false)} // Close modal when cancel button is clicked
          student={selectedStudent}
          onUpdate={handleUpdateStudent} // Pass the handleUpdateStudent function to update the student
        />
      )}

      {/* View Student Modal (Page) */}
      {selectedStudent && (
        <ViewStudentPage
          open={openViewModal}
          onClose={() => setOpenViewModal(false)} // Close modal when cancel button is clicked
          student={selectedStudent}
        />
      )}

      {/* Add Student Modal */}
      <AddStudentPage open={openAddModal} onClose={handleAddStudentClose} />
    </div>
  );
};

export default StudentsPage;
