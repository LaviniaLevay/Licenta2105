import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';

const VerificaCont = () => {
    const [email, setEmail] = useState('');
    const [cod, setCod] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        try {
            const response = await fetch('https://localhost:7210/api/Utilizators/verifica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    cod: cod
                })
            });

            if (response.ok) {
                setMessage('✅ Contul a fost verificat cu succes!');
                setTimeout(() => {
                    navigate('/login'); // redirect după succes
                }, 2000);
            } else {
                const text = await response.text();
                setError(text || '❌ Cod greșit sau email invalid.');
            }
        } catch (err) {
            setError('❌ Eroare de server.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Verifică-ți contul</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Cod de verificare:</label>
                <input
                    type="text"
                    value={cod}
                    onChange={(e) => setCod(e.target.value)}
                    required
                />

                <button type="submit">✅ Verifică</button>
            </form>

            {error && <p className="signup-message error">{error}</p>}
            {message && <p className="signup-message success">{message}</p>}
        </div>
    );
};

export default VerificaCont;
