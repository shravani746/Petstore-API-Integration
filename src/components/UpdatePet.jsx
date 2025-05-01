import React, { useState } from 'react';
import api from '../api';
import Toast from './Toast';  

const UpdatePet = ({ onSuccess }) => {
  const [pet, setPet] = useState({
    id: '',
    name: '',
    status: 'available',
    // categoryName: '',
    // photoUrl: '',
  });
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    const updatedPet = {
      id: Number(pet.id),
      name: pet.name,
      status: pet.status,
      // category: { id: 1, name: pet.categoryName || "Default Category" },
      // photoUrls: [pet.photoUrl || "https://via.placeholder.com/150"],
      tags: [],
    };

    try {
      const response = await api.put('/pet', updatedPet);
      setMessage('Pet updated successfully!');
      setShowToast(true);  // Show the toast
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error updating pet:', error);
      setMessage('Failed to update pet');
      setShowToast(true);  // Show the toast on error
    }
  };

  return (
    <div className="card">
      <h2>Update Pet</h2>
      <form onSubmit={handleUpdatePet}>
        <input
          type="number"
          name="id"
          placeholder="Pet ID"
          value={pet.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="New Pet Name"
          value={pet.name}
          onChange={handleChange}
          required
        />
        <label><br></br>
          Status:
          <br></br>
          <select name="status" value={pet.status} onChange={handleChange}>
            <option value="available">available</option>
            <option value="pending">pending</option>
            <option value="sold">sold</option>
          </select>
        </label>
        {/* <input
          type="text"
          name="categoryName"
          placeholder="New Category Name"
          value={pet.categoryName}
          onChange={handleChange}
        /> */}
        <button type="submit">Update Pet</button>
      </form>
      
      {showToast && <Toast message={message} />}
    </div>
  );
};

export default UpdatePet;
