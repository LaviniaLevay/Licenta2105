import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Signup.css';
import confetti from 'canvas-confetti';

const Signup = () => {
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Parola: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7210/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', data.id);
                setMessage('✅ Cont creat cu succes!');

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });

                // Redirect după scurt delay pentru UX mai natural
                setTimeout(() => navigate('/Courses'), 1000);
            } else {
                const errText = await response.text();
                setMessage(errText || '❌ Eroare la înregistrare.');
            }
        } catch (err) {
            console.error(err);
            setMessage('❌ Eroare de server.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Crează un cont nou</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>Nume utilizator:</label>
                <input
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    placeholder="Ex: andrei123"
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Ex: exemplu@email.com"
                    required
                />

                <label>Parolă:</label>
                <div className="input-with-icon">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="Parola"
                        value={formData.Parola}
                        onChange={handleChange}
                        placeholder="Minim 6 caractere"
                        minLength="6"
                        required
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        className="toggle-eye"
                        title="Afișează/Ascunde"
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>

                <button type="submit" className="signup-button">🚀 Creează cont</button>
            </form>

            {message && <p className="signup-message">{message}</p>}

            <div className="login-link">
                <p>Ai deja un cont? <Link to="/login">Autentifică-te aici</Link></p>
            </div>
        </div>
    );
};

export default Signup;
