import React from 'react';
import FiltruCursuri from './FiltruCursuri'; // sau './components/FiltruCursuri' dacă e în alt folder

const Courses = () => {
    return (
        <div className="courses-page">
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Cursuri disponibile</h2>
            <FiltruCursuri />
        </div>
    );
};

export default Courses;
