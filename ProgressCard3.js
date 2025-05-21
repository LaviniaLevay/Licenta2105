import React from 'react';
import BaseProgressCard from './BaseProgressCard';

const ProgressCard3 = () => {
    const scores = [5.8, 6.6, 7.4, 8.3];
    const label = "💻 Elevă: Carla, informatică Java";
    const note = "Participă la workshop-uri interactive, proiecte practice și sesiuni 1-la-1.";
    return <BaseProgressCard scores={scores} label={label} note={note} />;
};

export default ProgressCard3;
