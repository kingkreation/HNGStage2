import React from 'react';
import { useToast } from '../context/ToastContext';
import '../styles/toast.css';

export const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`} role="alert">
          <div className="toast-content">
            {toast.message}
          </div>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};