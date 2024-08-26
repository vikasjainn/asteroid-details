// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import AsteroidForm from './AsteroidForm';
import AsteroidDetails from './AsteroidDetails';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<AsteroidForm />} />
          <Route path="/details/:id" element={<AsteroidDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
