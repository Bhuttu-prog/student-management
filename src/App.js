import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentPage';
import AddStudentPage from './pages/AddStudentPage';
import './styles/global.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-list" element={<StudentsPage />} />
    </Routes>
  </Router>
);

export default App;
