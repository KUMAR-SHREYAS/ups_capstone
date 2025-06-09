import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import DashboardPage from './components/DashboardPage';
import AnalyticsPage from './components/AnalyticsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from './utils/auth';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            UPS Capstone Project
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
    </>
  );
}

export default App; 