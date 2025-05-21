import React from 'react';
import BaseProgressCard from './BaseProgressCard';

const ProgressCard2 = () => {
    const scores = [7.0, 7.5, 8.2, 9.0];
    const label = "🗣️ Elev: Radu, pregătire engleză";
    const note = "Progres obținut prin conversații săptămânale live + feedback scris de la profesor.";
    return <BaseProgressCard scores={scores} label={label} note={note} />;
};

export default ProgressCard2;
