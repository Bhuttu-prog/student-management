// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { signOut } from 'firebase/auth';
// // import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
// // import { auth, db } from '../firebaseConfig';

// // const StudentsPage = () => {
// //   const [students, setStudents] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({});
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchStudents();
// //   }, []);

// //   const fetchStudents = async () => {
// //     const querySnapshot = await getDocs(collection(db, 'students'));
// //     setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// //   };

// //   const handleLogout = async () => {
// //     await signOut(auth);
// //     navigate('/');
// //   };

// //   const handleAddStudent = async (e) => {
// //     e.preventDefault();
// //     await addDoc(collection(db, 'students'), formData);
// //     fetchStudents();
// //     setShowModal(false);
// //   };

// //   return (
// //     <div className="students-container">
// //       <button onClick={handleLogout}>Logout</button>
// //       <h1>Students</h1>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Class</th>
// //             <th>Section</th>
// //             <th>Roll Number</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {students.map((student) => (
// //             <tr key={student.id}>
// //               <td>{student.id}</td>
// //               <td>{student.name}</td>
// //               <td>{student.class}</td>
// //               <td>{student.section}</td>
// //               <td>{student.rollNumber}</td>
// //               <td>
// //                 <button onClick={() => console.log('View')}>View</button>
// //                 <button onClick={() => console.log('Edit')}>Edit</button>
// //                 <button
// //                   onClick={async () => {
// //                     await deleteDoc(doc(db, 'students', student.id));
// //                     fetchStudents();
// //                   }}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       <button onClick={() => setShowModal(true)}>Add Student</button>

// //       {showModal && (
// //         <div className="modal">
// //           <form onSubmit={handleAddStudent}>
// //             <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
// //             {/* Add more inputs for other fields */}
// //             <button type="submit">Submit</button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default StudentsPage;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { db } from '../firebaseConfig';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

// const StudentsPage = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const studentsCollection = collection(db, 'students');
//       const studentSnapshot = await getDocs(studentsCollection);
//       const studentList = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setStudents(studentList);
//     };

//     fetchStudents();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'students', id));
//       setStudents((prev) => prev.filter((student) => student.id !== id));
//       alert('Student deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting student:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Students List</h2>
//       <Link to="/add-student">
//         <button>Add Student</button>
//       </Link>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Roll Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id}>
//               <td>{student.id}</td>
//               <td>{student.name}</td>
//               <td>{student.class}</td>
//               <td>{student.section}</td>
//               <td>{student.rollNumber}</td>
//               <td>
//                 <FaEye onClick={() => alert(`View ${student.name}`)} />
//                 <FaEdit onClick={() => alert(`Edit ${student.name}`)} />
//                 <FaTrash onClick={() => handleDelete(student.id)} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentsPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch students data from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  // Delete student by ID
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      setStudents((prev) => prev.filter((student) => student.id !== id));
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      navigate('/login'); // Redirect to the Login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h2>Students List</h2>

      {/* Logout Button */}
      <button
        style={{
          float: 'right',
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Add Student Button */}
      <button
        onClick={() => navigate('/add-student')}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Add Student
      </button>

      {/* Students Table */}
      <table border="1" width="100%" style={{ textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <FaEye
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={() => alert(`View details for ${student.name}`)}
                />
                <FaEdit
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={() => alert(`Edit details for ${student.name}`)}
                />
                <FaTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;

