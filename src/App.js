// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* Wrap the StudentsPage route with the ProtectedRoute to secure it */}
      <Route
        path="/student-list"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
