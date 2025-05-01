import React, { useState } from 'react';
import api from '../api';
import Toast from './Toast';

const AddPet = ({ onSuccess }) => {
  const [pet, setPet] = useState({
    id: '',
    name: '',
    status: 'available',
    // categoryName: '',
    // photoUrl: '',
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    const petData = {
      id: Number(pet.id),
      name: pet.name,
      status: pet.status,
      // category: { id: 1, name: pet.categoryName || "Default Category" },
      // photoUrls: [pet.photoUrl || "https://via.placeholder.com/150"],
      tags: [],
    };

    try {
      const response = await api.post('/pet', petData);
      setToastMessage(' Pet added successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Error adding pet:', error);
      setToastMessage(' Failed to add pet');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="card">
      <h2>Add Pet</h2>
      <form onSubmit={handleAddPet}>
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
          placeholder="Pet Name"
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
          placeholder="Category Name"
          value={pet.categoryName}
          onChange={handleChange}
        /> */}
        <button type="submit">Add Pet</button>
      </form>
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default AddPet;