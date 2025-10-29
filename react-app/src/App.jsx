import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  UNSAFE_enhanceManualRouteObjects,
} from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';

// Configure future flags
UNSAFE_enhanceManualRouteObjects.v7_startTransition = true;
UNSAFE_enhanceManualRouteObjects.v7_relativeSplatPath = true;
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Tickets } from './pages/Tickets';
import './styles/index.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="app">
          <Header />
          <Toast />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets/:ticketId"
              element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;