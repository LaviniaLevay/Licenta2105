import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';


function RezervariCalendar({ rezervari }) {
    const events = rezervari.map(r => ({
        title: r.curs?.titlu || "Curs",
        start: r.dataOra,
        end: new Date(new Date(r.dataOra).getTime() + 60 * 60 * 1000), // durata 1h
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
    }));

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3>🗓 Calendarul lecțiilor tale</h3>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth'
                }}
                events={events}
                height="auto"
            />
        </div>
    );
}

export default RezervariCalendar;
