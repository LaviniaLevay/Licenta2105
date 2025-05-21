import React, { useState } from 'react';
import ListaCursuri from './ListaCursuri';
import './styles/FiltruCursuri.css';

function FiltruCursuri() {
    const [nivel, setNivel] = useState('');
    const [format, setFormat] = useState('');
    const [profesor, setProfesor] = useState('');
    const [filtrate, setFiltrate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCauta = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let url = 'https://localhost:7210/api/curs/search?';
            if (nivel) url += `nivel=${nivel}&`;
            if (format) url += `format=${format}&`;
            if (profesor) url += `profesor=${profesor}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Eroare la căutare');
            const data = await response.json();
            setFiltrate(data);
        } catch (err) {
            console.error(err);
            setError('Eroare la filtrare cursuri.');
        } finally {
            setLoading(false);
        }
    };

    const handleAfiseazaToate = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://localhost:7210/api/curs');
            if (!response.ok) throw new Error('Eroare la încărcare cursuri');
            const data = await response.json();
            setFiltrate(data);
        } catch (err) {
            console.error(err);
            setError('Nu s-au putut încărca cursurile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="filtru-modern-wrapper">
            <div className="filtru-card">
                <h2>🔎 Filtrează cursurile</h2>

                <form onSubmit={handleCauta} className="filtru-grid">
                    <div className="filtru-item">
                        <label>Nivel</label>
                        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
                            <option value="">Toate</option>
                            <option value="Începător">Începător</option>
                            <option value="Mediu">Mediu</option>
                            <option value="Avansat">Avansat</option>
                        </select>
                    </div>

                    <div className="filtru-item">
                        <label>Format</label>
                        <select value={format} onChange={(e) => setFormat(e.target.value)}>
                            <option value="">Toate</option>
                            <option value="Online">Online</option>
                            <option value="Fizic">Fizic</option>
                        </select>
                    </div>

                    <div className="filtru-item">
                        <label>Profesor</label>
                        <input
                            type="text"
                            value={profesor}
                            onChange={(e) => setProfesor(e.target.value)}
                            placeholder="Nume profesor"
                        />
                    </div>

                    <div className="filtru-buttons">
                        <button type="submit" className="btn-primary">🔍 Caută</button>
                        <button type="button" className="btn-secondary" onClick={handleAfiseazaToate}>
                            🔄 Afișează toate
                        </button>
                    </div>
                </form>

                {loading && <p className="loading-msg">⏳ Se încarcă...</p>}
                {error && <p className="error-msg">{error}</p>}
                {filtrate.length > 0 && (
                    <p className="result-count">✅ {filtrate.length} cursuri găsite</p>
                )}
            </div>

            <ListaCursuri cursuri={filtrate} />
        </div>
    );
}

export default FiltruCursuri;
