import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material'; // Material UI components
import '../styles/loginPage.css';  // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/student-list');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-page">
      <Container maxWidth="xs" className="login-page__container">
        <Box textAlign="center" className="login-page__box">
          <Typography variant="h4" className="login-page__title">Login</Typography>
          <form onSubmit={handleLogin} className="login-page__form">
            <div className="login-page__input-wrapper">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-page__input"
                type="email"
              />
            </div>
            <div className="login-page__input-wrapper">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-page__input"
                type="password"
              />
            </div>
            {error && <p className="login-page__error">{error}</p>}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="login-page__button"
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
