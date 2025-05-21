import React from 'react';
import BaseProgressCard from './BaseProgressCard';

const ProgressCard1 = () => {
    const scores = [6.5, 7.2, 7.9, 8.4];
    const label = "📘 Elevă: Andreea, profil real";
    const note = "Participă la pregătire intensivă pentru BAC la matematică. Lecțiile au loc de 2 ori pe săptămână.";
    return <BaseProgressCard scores={scores} label={label} note={note} />;
};

export default ProgressCard1;
