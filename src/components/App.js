import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Trails</h1>
        <Link to="/">Welcome</Link>
        <Link to="/search">Search</Link>
      </header>
      <section>
        {children || 'Welcome to Trails'}
      </section>
    </div>);
};
export default App;
