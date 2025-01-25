import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentPage';
import AddStudentPage from './pages/AddStudentPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-list" element={<StudentsPage />} />
      <Route path="/add-student" element={<AddStudentPage />} />
    </Routes>
  </Router>
);

export default App;
