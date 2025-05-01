// src/App.jsx
import React, { useState } from 'react';
import GetPets from './components/GetPets';
import AddPet from './components/AddPet';
import UpdatePet from './components/UpdatePet';
import DeletePet from './components/DeletePet';
import Layout from './components/Layout';

import './App.css';
const App = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <Layout>
      <h1 className="title"></h1>
      <div className="actions">
        <AddPet onSuccess={triggerRefresh} />
        <UpdatePet onSuccess={triggerRefresh} />
        <DeletePet onSuccess={triggerRefresh} />
      </div>
      <GetPets key={refresh} />
    </Layout>
  );
};

export default App;
