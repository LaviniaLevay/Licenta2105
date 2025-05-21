import React, { useEffect, useState } from 'react';
import './styles/AdminDashboard.css';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7210/api/admin/stats')
            .then(res => res.json())
            .then(data => setStats(data));

        fetch('https://localhost:7210/api/admin/rezervari-recente')
            .then(res => res.json())
            .then(data => setRecent(data));
    }, []);

    if (!stats) return <p>Se încarcă dashboard-ul...</p>;

    return (
        <div className="admin-dashboard">
            <h2>👩‍🏫 Admin Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card"><h3>{stats.utilizatori}</h3><p>Utilizatori</p></div>
                <div className="stat-card"><h3>{stats.cursuri}</h3><p>Cursuri</p></div>
                <div className="stat-card"><h3>{stats.rezervari}</h3><p>Rezervări</p></div>
            </div>

            <h3 style={{ marginTop: '2rem' }}>🕒 Rezervări recente</h3>
            <ul className="recent-list">
                {recent.map(r => (
                    <li key={r.id}>
                        {new Date(r.dataOra).toLocaleString()} – {r.curs?.titlu || 'Curs șters'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
