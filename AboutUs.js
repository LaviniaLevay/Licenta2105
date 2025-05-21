import React from 'react';
import './styles/About.css';

function AboutUs() {
    return (
        <div className="about-fullscreen">
            <div className="about-overlay">
                <div className="about-content">
                    <h1>Despre MentorWay</h1>
                    <p>
                        MentorWay este o platformă educațională online dedicată sprijinirii elevilor care își doresc să-și atingă potențialul maxim. Credem că fiecare copil merită acces la profesori buni, lecții clare și o experiență de învățare bine organizată.
                    </p>

                    <p>
                        Platforma noastră oferă un spațiu intuitiv unde elevii pot descoperi cursuri potrivite nevoilor lor, pot rezerva ședințe de meditație, și pot gestiona cu ușurință programul lecțiilor. Totul se desfășoară într-un mediu digital sigur și accesibil de oriunde.
                    </p>

                    <h2>Misiunea noastră</h2>
                    <p>
                        La MentorWay, ne propunem să transformăm meditațiile într-o experiență plăcută, flexibilă și eficientă. Punem accent pe profesionalism, organizare și conectare reală între elev și profesor.
                    </p>

                    <h2>Ce oferim</h2>
                    <ul>
                        <li>🧑‍🏫 Meditații personalizate, predate de profesori cu experiență</li>
                        <li>📅 Rezervare online simplă și rapidă</li>
                        <li>📊 Acces la un calendar cu lecțiile viitoare</li>
                        <li>🧭 Navigare ușoară și design prietenos</li>
                    </ul>

                    <h2>De ce să alegi MentorWay?</h2>
                    <p>
                        Pentru că învățarea devine mai ușoară atunci când este bine organizată. MentorWay îmbină tehnologia cu nevoile reale ale elevilor, oferind o platformă modernă, eficientă și prietenoasă.
                    </p>

                    <p className="quote">
                        „Învățarea nu trebuie să fie grea. Cu resursele și oamenii potriviți, poate deveni o experiență care inspiră.” – Echipa MentorWay
                    </p>
                </div>
            </div>
        </div>

    );
}

export default AboutUs;
