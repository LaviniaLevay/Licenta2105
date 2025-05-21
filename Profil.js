import React, { useEffect, useState } from 'react';

function Profil() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [numarRezervari, setNumarRezervari] = useState(0);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const emailLS = localStorage.getItem('email');
        const usernameLS = localStorage.getItem('username');

        if (emailLS) setEmail(emailLS);
        if (usernameLS) setUsername(usernameLS);

        fetch(`https://localhost:7210/api/rezervare/user/${userId}`)
            .then(res => res.json())
            .then(data => setNumarRezervari(data.length))
            .catch(err => console.error('Eroare rezervări:', err));
    }, [userId]);

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2>👤 Profilul Meu</h2>
            <p><strong>Nume utilizator:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Rezervări efectuate:</strong> {numarRezervari}</p>

            <hr style={{ margin: '1.5rem 0' }} />

            <h3>🔐 Schimbă parola</h3>
            <p style={{ color: '#999' }}>Funcționalitatea va fi disponibilă curând.</p>
        </div>
    );
}

export default Profil;