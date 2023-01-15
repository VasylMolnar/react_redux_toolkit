import React from 'react';
import { Link } from 'react-router-dom';
const Missing = () => {
  return (
    <section className="missing section">
      <div className="container text-center" style={{ color: 'red' }}>
        <h2>Page Not Found</h2>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </div>
    </section>
  );
};

export default Missing;
