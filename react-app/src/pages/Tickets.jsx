import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { ticketService } from '../services/ticketService';
import { useToast } from '../context/ToastContext';
import '../styles/tickets.css';

export const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'open', priority: 'low' });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { ticketId } = useParams();

  useEffect(() => {
    const session = authService.getSession();
    if (!session) {
      addToast('Your session has expired — please log in again', 'error');
      navigate('/auth/login');
      return;
    }
    loadTickets();
  }, [navigate, addToast]);

  useEffect(() => {
    if (ticketId === 'new') {
      setEditingId('new');
      setFormData({ title: '', description: '', status: 'open', priority: 'low' });
    }
  }, [ticketId]);

  const loadTickets = async () => {
    setLoading(true);
    const result = await ticketService.getAllTickets();
    if (result.ok) {
      setTickets(result.data);
    } else {
      addToast(result.message || 'Failed to load tickets', 'error');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (editingId === 'new') {
      result = await ticketService.createTicket(formData);
    } else {
      result = await ticketService.updateTicket(editingId, formData);
    }

    if (result.ok) {
      addToast(result.message, 'success');
      setEditingId(null);
      setFormData({ title: '', description: '', status: 'open', priority: 'low' });
      setErrors({});
      loadTickets();
    } else {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        addToast(result.message, 'error');
      }
    }
  };

  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority
    });
  };

  const handleDelete = async () => {
    const result = await ticketService.deleteTicket(showDeleteConfirm);
    if (result.ok) {
      addToast(result.message, 'success');
      setShowDeleteConfirm(null);
      loadTickets();
    } else {
      addToast(result.message, 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'status-open',
      in_progress: 'status-in-progress',
      closed: 'status-closed'
    };
    return colors[status] || 'status-open';
  };

  const filteredTickets = filterStatus === 'all'
    ? tickets
    : tickets.filter(t => t.status === filterStatus);

  return (
    <main className="tickets-page">
      <div className="container">
        <div className="tickets-header">
          <h1>Ticket Management</h1>
          {!editingId && (
            <button
              className="btn btn-primary"
              onClick={() => setEditingId('new')}
            >
              + Create New Ticket
            </button>
          )}
        </div>

        {editingId && (
          <div className="ticket-form-card">
            <h2>{editingId === 'new' ? 'Create New Ticket' : 'Edit Ticket'}</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'field-error' : ''}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  placeholder="Brief description of the issue"
                />
                {errors.title && (
                  <div id="title-error" className="error-message" role="alert">
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'field-error' : ''}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                  placeholder="Detailed description (min 10 characters)"
                  rows="4"
                />
                {errors.description && (
                  <div id="description-error" className="error-message" role="alert">
                    {errors.description}
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={errors.status ? 'field-error' : ''}
                    aria-describedby={errors.status ? 'status-error' : undefined}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && (
                    <div id="status-error" className="error-message" role="alert">
                      {errors.status}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId === 'new' ? 'Create Ticket' : 'Update Ticket'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', status: 'open', priority: 'low' });
                    setErrors({});
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="tickets-controls">
          <div className="filter-group">
            <label htmlFor="filter">Filter by Status:</label>
            <select
              id="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Tickets</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <p className="tickets-count">{filteredTickets.length} ticket(s)</p>
        </div>

        {loading ? (
          <div className="loading">Loading tickets...</div>
        ) : filteredTickets.length === 0 ? (
          <div className="empty-state">
            <p>No tickets found</p>
          </div>
        ) : (
          <div className="tickets-list">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <span className={`status-tag ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                {ticket.description && (
                  <p className="ticket-description">{ticket.description}</p>
                )}
                <div className="ticket-meta">
                  <span className="priority">Priority: <strong>{ticket.priority}</strong></span>
                  <span className="date">
                    Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="ticket-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(ticket)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowDeleteConfirm(ticket.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showDeleteConfirm !== null && (
          <div className="modal active">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};