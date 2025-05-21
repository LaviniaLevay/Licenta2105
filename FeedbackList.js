import React, { useEffect, useState } from 'react';
import './styles/Feedback.css';

function FeedbackList({ cursId }) {
    const [feedbackuri, setFeedbackuri] = useState([]);
    const [medie, setMedie] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7210/api/feedback/curs/${cursId}`)
            .then(res => res.json())
            .then(data => {
                setFeedbackuri(data);
                if (data.length > 0) {
                    const media = data.reduce((acc, f) => acc + f.rating, 0) / data.length;
                    setMedie(media.toFixed(2));
                }
            })
            .catch(err => console.error('Eroare feedback:', err));
    }, [cursId]);

    const renderStele = (nr) => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} style={{ color: i < nr ? '#FFD700' : '#ccc' }}>★</span>
        ));
    };

    return (
        <div className="feedback-section">
            <h3>⭐ Feedback pentru acest curs</h3>
            {medie && <p className="medie">Medie generală: <strong>{medie}</strong> / 5</p>}
            {feedbackuri.length === 0 ? (
                <p className="no-feedback">Nu există feedback momentan.</p>
            ) : (
                <div className="feedback-list">
                    {feedbackuri.map((f, index) => (
                        <div key={index} className="feedback-card">
                            <div className="feedback-header">
                                <div className="avatar">
                                    {f.utilizatorId ? `U${f.utilizatorId}` : 'U'}
                                </div>
                                <div className="rating">{renderStele(f.rating)}</div>
                            </div>
                            <p className="comentariu">„{f.comentariu || 'Fără comentariu.'}”</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FeedbackList;
