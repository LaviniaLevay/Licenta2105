import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import RezervariCalendar from './RezervariCalendar';
import ListaCursuri from './ListaCursuri';
import './styles/Dashboard.css';

function Dashboard() {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');

    const [cursuri, setCursuri] = useState([]);
    const [rezervari, setRezervari] = useState([]);
    const [mesaj, setMesaj] = useState('');
    const [dataSelectata, setDataSelectata] = useState({});

    useEffect(() => {
        if (!userId) {
            window.location.href = '/login';
            return;
        }

        fetch('https://localhost:7210/api/curs')
            .then(res => res.json())
            .then(data => setCursuri(data));

        fetch(`https://localhost:7210/api/rezervare/user/${userId}`)
            .then(res => res.json())
            .then(data => setRezervari(data));
    }, [userId]);

    const handleRezervare = async (cursId) => {
        const dataOra = dataSelectata[cursId];
        if (!dataOra) {
            setMesaj('❌ Selectează o dată/ora!');
            return;
        }

        const body = {
            CursId: cursId,
            UtilizatorId: parseInt(userId),
            DataOra: dataOra.toISOString()
        };

        try {
            const res = await fetch('https://localhost:7210/api/rezervare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const err = await res.text();
                setMesaj(`❌ ${err}`);
            } else {
                const updated = await fetch(`https://localhost:7210/api/rezervare/user/${userId}`).then(r => r.json());
                setRezervari(updated);
                setMesaj('✅ Rezervare reușită!');
            }
        } catch {
            setMesaj('❌ Eroare la trimiterea rezervării.');
        }
    };

    const handleAnulare = async (id) => {
        if (!window.confirm("Anulezi această rezervare?")) return;

        try {
            const res = await fetch(`https://localhost:7210/api/rezervare/${id}`, { method: 'DELETE' });
            if (res.ok) {
                const updated = await fetch(`https://localhost:7210/api/rezervare/user/${userId}`).then(r => r.json());
                setRezervari(updated);
                setMesaj('✅ Rezervarea a fost anulată.');
            } else {
                setMesaj('❌ Eroare la anulare.');
            }
        } catch {
            setMesaj('❌ Server error.');
        }
    };

    const rezervariViitoare = rezervari.filter(r => new Date(r.dataOra) > new Date());

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>👋 Bun venit, {username}!</h1>
                <p>Vezi lecțiile tale rezervate și descoperă cursuri noi</p>
            </div>

            {mesaj && <div className="alert-msg">{mesaj}</div>}

            <section className="dashboard-section">
                <h3>📅 Lecții viitoare</h3>
                {rezervariViitoare.length === 0 ? (
                    <p>Nu ai lecții programate.</p>
                ) : (
                    <div className="rezervari-grid">
                        {rezervariViitoare.map((r, index) => (
                            <div key={index} className="rezervare-card">
                                <FaCalendarAlt size={24} />
                                <p><strong>{r.curs?.titlu}</strong></p>
                                <p>{new Date(r.dataOra).toLocaleString()}</p>
                                <button className="cancel-btn" onClick={() => handleAnulare(r.id)}>❌ Anulează</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="dashboard-section">
                <h3>🎓 Cursurile mele rezervate</h3>
                {rezervari.length === 0 ? (
                    <p>Nu ai rezervări efectuate.</p>
                ) : (
                    <ul className="rezervari-list">
                        {rezervari.map(r => (
                            <li key={r.id}>
                                <FaCheckCircle color="green" />
                                {r.curs?.titlu} – {new Date(r.dataOra).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="dashboard-section">
                <h3>📚 Toate cursurile disponibile</h3>
                <ListaCursuri
                    cursuri={cursuri}
                    rezervari={rezervari}
                    onRezerva={handleRezervare}
                    dataSelectata={dataSelectata}
                    setDataSelectata={setDataSelectata}
                />
            </section>

            {rezervariViitoare.length > 0 && (
                <section className="dashboard-section">
                    <h3>🗓️ Calendar rezervări</h3>
                    <RezervariCalendar rezervari={rezervariViitoare} />
                </section>
            )}
        </div>
    );
}

export default Dashboard;
