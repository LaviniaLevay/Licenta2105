import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/CourseDetails.css';


const CourseDetails = () => {
    const { id } = useParams();
    const [curs, setCurs] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchCurs = async () => {
            try {
                const response = await fetch(`https://localhost:7210/api/curs/${id}`);
                if (!response.ok) throw new Error("Cursul nu a fost găsit");
                const data = await response.json();
                setCurs(data);
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor cursului:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurs();
    }, [id]);

    if (loading) return <p>Se încarcă detalii...</p>;
    if (!curs) return <p>Cursul nu a fost găsit.</p>;

    return (
        <div className="course-details">
            <h2>{curs.titlu}</h2>
            <p><strong>Descriere:</strong> {curs.descriere}</p>
            <p><strong>Profesor:</strong> {curs.profesor}</p>
            <p><strong>Format:</strong> {curs.format}</p>
            <p><strong>Nivel:</strong> {curs.nivel}</p>

          



            <Link to="/Courses" className="back-button">⬅ Înapoi la Cursuri</Link>
        </div>
    );
};

export default CourseDetails;
