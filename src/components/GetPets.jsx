import React, { useState, useEffect } from 'react';
import api from '../api';

const GetPets = () => {
  const [pets, setPets] = useState([]);
  const [status, setStatus] = useState('available');
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/pet/findByStatus?status=${status}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [status]);

  return (
    <div className="card">
      <h2>View Pets</h2>
      <label><br></br>
        Filter by status:
        <br></br>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">available</option>
          <option value="pending">pending</option>
          <option value="sold">sold</option>
        </select>
      </label>
      <button onClick={fetchPets}>Refresh List</button>
      {loading ? (
        <p>Loading pets...</p>
      ) : (
        <div className="pet-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <h3>{pet.name || 'Unnamed Pet'}</h3>
              <p><strong>ID:</strong> {pet.id}</p>
              <p><strong>Status:</strong> {pet.status}</p>
              <p><strong>Category:</strong> {pet.category?.name || 'N/A'}</p>
              {pet.photoUrls && pet.photoUrls[0] && pet.photoUrls[0] !== 'string' ? (
                <img src={pet.photoUrls[0]} alt={pet.name} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPets;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// //import './GetPets.css'; // Optional: for styling

// const GetPets = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   const fetchPets = async () => {
//     try {
//       const response = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus?status=sold');
//       setPets(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch pets.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Sold Pets</h1>

//       {loading && <p>Loading pets...</p>}
      
//       {error && <p>{error}</p>}

//       {!loading && !error && (
//         <div className="pet-grid">
//           {pets.map((pet) => (
//             <div className="pet-card" key={pet.id}>
//               <h3>{pet.name || 'Unnamed Pet'}</h3>
//               <p><strong>Status:</strong> {pet.status}</p>
//               <p><strong>Category:</strong> {pet.category?.name || 'N/A'}</p>
//               {pet.photoUrls && pet.photoUrls[0] !== 'string' ? (
//                 <img src={pet.photoUrls[0]} alt={pet.name} />
//               ) : (
//                 <div className="no-image">No Image</div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetPets;
