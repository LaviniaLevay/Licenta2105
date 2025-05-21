import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LearningStyleTest.css';

const LearningStyleTest = () => {
    const navigate = useNavigate();

    const questions = [
        {
            question: 'Cum preferi să înveți un concept nou?',
            options: [
                { text: 'Ascult explicații audio', type: 'audio' },
                { text: 'Văd un videoclip explicativ', type: 'vizual' },
                { text: 'Încerc să-l aplic direct', type: 'practic' },
            ],
        },
        {
            question: 'Cum îți amintești cel mai bine o lecție?',
            options: [
                { text: 'După cum a sunat explicația', type: 'audio' },
                { text: 'După imaginea din pagină', type: 'vizual' },
                { text: 'După ce am aplicat ceva', type: 'practic' },
            ],
        },
        {
            question: 'Ce fel de materiale preferi?',
            options: [
                { text: 'Podcasturi / audio', type: 'audio' },
                { text: 'Scheme și prezentări', type: 'vizual' },
                { text: 'Exerciții practice', type: 'practic' },
            ],
        },
        {
            question: 'Cum te pregătești pentru un test?',
            options: [
                { text: 'Ascult sau explic altcuiva', type: 'audio' },
                { text: 'Fac fișe și schițe', type: 'vizual' },
                { text: 'Rezolv exerciții', type: 'practic' },
            ],
        },
        {
            question: 'Cum reacționezi la o explicație lungă?',
            options: [
                { text: 'Îmi place dacă e clară verbal', type: 'audio' },
                { text: 'Mi-e greu dacă nu văd schema', type: 'vizual' },
                { text: 'Vreau să aplic ceva imediat', type: 'practic' },
            ],
        },
    ];

    const [current, setCurrent] = useState(0);
    const [scores, setScores] = useState({ audio: 0, vizual: 0, practic: 0 });
    const [finished, setFinished] = useState(false);

    const handleAnswer = (type) => {
        setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrent(0);
        setScores({ audio: 0, vizual: 0, practic: 0 });
        setFinished(false);
    };

    const total = questions.length;
    const progress = ((current + (finished ? 1 : 0)) / total) * 100;

    const bestType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    const getMessage = (type) => {
        switch (type) {
            case 'audio':
                return 'Ți se potrivește mai bine învățarea auditivă – explicații vorbite, podcasturi și dialoguri.';
            case 'vizual':
                return 'Ai un stil vizual – înveți mai eficient cu imagini, diagrame și schițe colorate.';
            case 'practic':
                return 'Îți place învățarea practică – exerciții, simulări și interacțiune directă.';
            default:
                return '';
        }
    };

    return (
        <div className="learning-style-test">
            <button onClick={() => navigate('/')} className="back-button">← Înapoi acasă</button>

            <h2>🎯 Test de stil de învățare</h2>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {!finished ? (
                <>
                    <div className="question-box">
                        <p><strong>Întrebarea {current + 1}/{total}</strong></p>
                        <h3>{questions[current].question}</h3>
                        <div className="options">
                            {questions[current].options.map((opt, idx) => (
                                <button key={idx} onClick={() => handleAnswer(opt.type)}>{opt.text}</button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="result-box">
                    <h3>📌 Rezultatul tău:</h3>
                    <p><strong>{getMessage(bestType)}</strong></p>
                    <button onClick={handleRestart}>🔁 Reia testul</button>
                </div>
            )}
        </div>
    );
};

export default LearningStyleTest;
