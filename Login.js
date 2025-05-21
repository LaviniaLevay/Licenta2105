import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css';
import confetti from 'canvas-confetti';

const Login = () => {
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !parola) {
            setError('❌ Te rugăm să completezi toate câmpurile.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://localhost:7210/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Parola: parola
                }),

            });

            if (response.ok) {
                const data = await response.json();

                const userId = data.ID || data.id || data.userId;
                const userEmail = data.Email || data.email || email;
                const username = data.Username || data.username || 'Utilizator';

                if (!userId) {
                    setError('❌ Eroare: Nu am putut obține datele utilizatorului.');
                    setLoading(false);
                    return;
                }

                if (rememberMe) {
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('email', userEmail);
                    localStorage.setItem('username', username);
                } else {
                    sessionStorage.setItem('userId', userId);
                    sessionStorage.setItem('email', userEmail);
                    sessionStorage.setItem('username', username);
                }

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });

                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                }, 1000);
            } else {
                const err = await response.text();
                setError(err || '❌ Email sau parolă incorectă.');
                setLoading(false);
            }
        } catch (err) {
            console.error('Eroare la conectarea cu serverul:', err);
            setError('❌ Eroare de server.');
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Autentificare</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Emailul tău"
                    required
                />

                <label>Parolă:</label>
                <div className="input-with-icon">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={parola}
                        onChange={(e) => setParola(e.target.value)}
                        placeholder="Parola"
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

                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="rememberMe">📌 Ține-mă minte</label>
                </div>

                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? '⏳ Autentificare...' : '🔓 Autentifică-te'}
                </button>
            </form>

            {error && <div className="error-banner">{error}</div>}
        </div>
    );
};

export default Login;
