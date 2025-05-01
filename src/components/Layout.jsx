import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1> Petstore API Project</h1>
      </header>

      <main className="layout-content">
        {children}
      </main>

      <footer className="layout-footer">
        <p>&copy; 2025 Petstore API Project</p>
      </footer>
    </div>
  );
};

export default Layout;