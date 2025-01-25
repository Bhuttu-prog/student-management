import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import EditStudentPage from './EditStudentPage';
import ViewStudentPage from './ViewStudentPage';
import AddStudentPage from './AddStudentPage';
import '../styles/StudentPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Function to fetch students from Firestore
  const fetchStudents = async () => {
    try {
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Initial fetch
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      alert('Student deleted successfully!');
      fetchStudents(); // Refetch data on delete success
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
    setOpenEditModal(true);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setOpenViewModal(true);
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const studentRef = doc(db, 'students', updatedStudent.id);
      await updateDoc(studentRef, updatedStudent);
      alert('Student updated successfully!');
      fetchStudents(); // Refetch data on update success
      setOpenEditModal(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleStudentAdded = async () => {
    try {
      fetchStudents(); // Refetch data on add success
      setOpenAddModal(false);
    } catch (error) {
      console.error('Error fetching updated students after addition:', error);
    }
  };

  const handleAddStudentClose = () => {
    setOpenAddModal(false);
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
          onClick={() => setOpenAddModal(true)}
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
                      onClick={() => handleView(student)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<FaEdit />}
                      onClick={() => handleEdit(student)}
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

      {/* Edit Student Modal */}
      {selectedStudent && (
        <EditStudentPage
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          student={selectedStudent}
          onUpdate={handleUpdateStudent}
        />
      )}

      {/* View Student Modal */}
      {selectedStudent && (
        <ViewStudentPage
          open={openViewModal}
          onClose={() => setOpenViewModal(false)}
          student={selectedStudent}
        />
      )}

      {/* Add Student Modal */}
      <AddStudentPage
        open={openAddModal}
        onClose={handleAddStudentClose}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
};

export default StudentsPage;
