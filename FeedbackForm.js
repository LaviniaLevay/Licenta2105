import React, { useState, useEffect } from 'react';
import './styles/Feedback.css';

function FeedbackForm({ cursId }) {
    const userId = localStorage.getItem('userId');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comentariu, setComentariu] = useState('');
    const [mesaj, setMesaj] = useState('');
    const [dejaTrimis, setDejaTrimis] = useState(false);

    useEffect(() => {
        if (!userId) return;

        fetch(`https://localhost:7210/api/feedback/curs/${cursId}`)
            .then(async res => {
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(data => {
                const deja = data.some(f => f.utilizatorId === parseInt(userId));
                setDejaTrimis(deja);
            })
            .catch(err => {
                console.error("Eroare feedback GET:", err.message);
                setMesaj('❌ Eroare la încărcarea feedbackului.');
            });
    }, [cursId, userId]);

    const trimiteFeedback = async () => {
        const body = {
            Rating: rating,
            Comentariu: comentariu,
            CursId: cursId,
            UtilizatorId: parseInt(userId)
        };

        try {
            const res = await fetch('https://localhost:7210/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const text = await res.text();

            if (!res.ok) {
                setMesaj(`❌ ${text}`);
                return;
            }

            setMesaj(`✅ ${text}`);
            setDejaTrimis(true);
            setRating(0);
            setComentariu('');
        } catch (err) {
            console.error("Eroare la POST:", err.message);
            setMesaj('❌ Nu s-a putut trimite feedbackul.');
        }
    };

    if (!userId) {
        return <p className="auth-msg">🔒 Trebuie să fii autentificat pentru a trimite feedback.</p>;
    }

    if (dejaTrimis) {
        return <p className="info-msg">✅ Ai trimis deja feedback pentru acest curs. Mulțumim!</p>;
    }

    return (
        <div className="feedback-form">
            <h3>Lasă feedback</h3>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= (hover || rating) ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(null)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <textarea
                rows={4}
                value={comentariu}
                onChange={e => setComentariu(e.target.value)}
                placeholder="Scrie un comentariu (opțional)..."
            />
            <button onClick={trimiteFeedback} disabled={rating === 0}>Trimite</button>
            {mesaj && <p className="confirm-msg">{mesaj}</p>}
        </div>
    );
}

export default FeedbackForm;
