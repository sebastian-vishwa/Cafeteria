import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: '#22140D',
      color: '#FFFFFF',
      padding: '14px 22px',
      borderRadius: '9999px',
      boxShadow: '0 12px 30px rgba(34, 20, 13, 0.35)',
      fontSize: '14px',
      fontWeight: '600',
      animation: 'fadeIn 0.25s ease-out',
      border: '1px solid rgba(255, 255, 255, 0.12)'
    }}>
      <span style={{ fontSize: '18px' }}>{toast.icon}</span>
      <span>{toast.message}</span>
    </div>
  );
};
