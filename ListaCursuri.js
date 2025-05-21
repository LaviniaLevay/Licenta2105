import React from 'react';
import './styles/ListaCursuri.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlusCircle } from 'react-icons/fa';

function ListaCursuri({
    cursuri,
    rezervari = [],
    onRezerva,
    dataSelectata = {},
    setDataSelectata = () => { }
}) {
    const eDejaRezervat = (cursId) =>
        rezervari.some(r => r.curs?.id === cursId || r.curs?.cursId === cursId);

    if (!cursuri || cursuri.length === 0) {
        return <p className="no-courses">📭 Nu există cursuri disponibile.</p>;
    }

    return (
        <div className="grid-cursuri-wow">
            {cursuri.map((curs) => {
                const id = curs.id || curs.ID;
                const deja = eDejaRezervat(id);
                const selectedDate = dataSelectata[id];

                return (
                    <div key={id} className="card-curs-wow">
                        <div className="badge" data-nivel={curs.nivel}>{curs.nivel}</div>
                        <h3>{curs.titlu}</h3>
                        <p><strong>Profesor:</strong> {curs.profesor}</p>
                        <p><strong>Format:</strong> {curs.format}</p>
                        <p>{curs.descriere}</p>

                        {onRezerva && !deja ? (
                            <>
                                <label style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>
                                    Alege data și ora:
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => {
                                            console.log("📅 Data selectată pentru curs", id, ":", date);
                                            setDataSelectata(prev => ({
                                                ...prev,
                                                [id]: date
                                            }));
                                        }}
                                        showTimeSelect
                                        timeIntervals={30}
                                        dateFormat="Pp"
                                        minDate={new Date()}
                                        filterDate={(date) => {
                                            const zi = date.getDay();
                                            return zi !== 0 && zi !== 6;
                                        }}
                                        filterTime={(time) => {
                                            const hour = time.getHours();
                                            return hour >= 9 && hour < 18;
                                        }}
                                    />
                                </label>
                                <button
                                    className="btn-detalii-wow"
                                    onClick={() => {
                                        console.log("🚀 Trimitem rezervare pentru curs:", id);
                                        onRezerva(id);
                                    }}
                                    style={{ marginTop: '1rem' }}
                                >
                                    <FaPlusCircle style={{ marginRight: '5px' }} />
                                    Rezervă
                                </button>
                            </>
                        ) : (
                            <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1rem' }}>
                                ✅ Deja rezervat
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ListaCursuri;
 