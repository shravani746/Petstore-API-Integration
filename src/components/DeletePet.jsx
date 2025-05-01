import React, { useState } from 'react';
import api from '../api';
import Toast from './Toast';  

const DeletePet = ({ onSuccess }) => {
  const [petId, setPetId] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);  

  const handleDelete = async () => {
    try {
      await api.delete(`/pet/${petId}`);
      setMessage('Pet deleted successfully!');
      setShowToast(true);  // Show toast message
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error deleting pet:', error);
      setMessage('Failed to delete pet');
      setShowToast(true);  // Show toast message on failure
    }
  };

  return (
    <div className="card">
      <h2>Delete Pet</h2>
      <input
        type="number"
        placeholder="Enter Pet ID"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>

      {showToast && <Toast message={message} />}
    </div>
  );
};

export default DeletePet;
