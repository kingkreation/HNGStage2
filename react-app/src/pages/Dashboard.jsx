import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { ticketService } from '../services/ticketService';
import { useToast } from '../context/ToastContext';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const session = authService.getSession();
    if (!session) {
      addToast('Your session has expired — please log in again', 'error');
      navigate('/auth/login');
      return;
    }
    setUser(session.user);
    loadStats();
  }, [navigate, addToast]);

  const loadStats = async () => {
    setLoading(true);
    const result = await ticketService.getStats();
    if (result.ok) {
      setStats(result.data);
    } else {
      addToast(result.message || 'Failed to load statistics', 'error');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <main className="dashboard">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name}! 👋</h1>
            <p>Here's an overview of your ticket system</p>
          </div>
          <Link to="/tickets/new" className="btn btn-primary">
            + Create Ticket
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Tickets</h3>
              <p className="stat-number">{stats?.total || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-open">
            <div className="stat-icon">🟢</div>
            <div className="stat-content">
              <h3>Open</h3>
              <p className="stat-number">{stats?.open || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-in-progress">
            <div className="stat-icon">🟡</div>
            <div className="stat-content">
              <h3>In Progress</h3>
              <p className="stat-number">{stats?.inProgress || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-closed">
            <div className="stat-icon">⚫</div>
            <div className="stat-content">
              <h3>Closed</h3>
              <p className="stat-number">{stats?.closed || 0}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <Link to="/tickets" className="action-card">
              <div className="action-icon">📋</div>
              <h3>View All Tickets</h3>
              <p>See and manage all your tickets</p>
            </Link>
            <Link to="/tickets/new" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Create New Ticket</h3>
              <p>Start a new ticket to track an issue</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};