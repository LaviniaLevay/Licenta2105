import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/home.css';
import homeBgImage from './Assets/images/homebg.png';
import mathImage from './Assets/images/math.png';
import engImage from './Assets/images/eng.png';
import csImage from './Assets/images/cs.png';
import zoom1 from './Assets/images/zoom1.jpg';
import zoom2 from './Assets/images/zoom2.jpg';
import zoom3 from './Assets/images/zoom3.jpg';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
    const testimonials = [
        { text: "Am luat 10 la Bac datorită lecțiilor de pe platformă. Super profesori!", author: "Andrei P." },
        { text: "Mi-a plăcut că am putut învăța în ritmul meu și că aveam materiale clare.", author: "Maria T." },
        { text: "M-am pregătit pentru admiterea la Medicină și am intrat cu brio!", author: "Ioana M." },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const ProgressCard = ({ title, stats, footer }) => (
        <div className="progress-card">
            <h4>{title}</h4>
            <div className="progress-table">
                {stats.filter(s => s.week).map((row, index) => (
                    <div key={index} className="progress-row">
                        <span className="week-label">Săpt. {row.week}</span>
                        <div className="bar-wrapper">
                            <div
                                className="bar-fill"
                                style={{ width: `${(parseFloat(row.score) / 10) * 100}%` }}
                            ></div>
                        </div>
                        <span className="score">{row.score}</span>
                    </div>
                ))}
            </div>
            {footer && <div className="estimate-highlight">{footer}</div>}
        </div>
    );


    return (
        <div className="home-page">
            <section className="hero-section-with-bg" style={{ backgroundImage: `url(${homeBgImage})` }}>
                <div className="hero-overlay">
                    <div className="hero-text">
                        <h1>Educația care face diferența</h1>
                        <p>Meditații moderne, interactive și eficiente – pentru elevii de azi.</p>
                        <a href="/courses" className="cta-button">🎓 Explorează Cursurile</a>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2>✅ De ce MentorWay?</h2>
                <div className="features-grid">
                    <div className="feature-card"><h3>Profesori cu Experiență</h3><p>Predau clar, răbdător și orientat spre rezultate.</p></div>
                    <div className="feature-card"><h3>Materiale Premium</h3><p>PDF-uri, exerciții interactive, resurse video + audio.</p></div>
                    <div className="feature-card"><h3>Flexibilitate Maximă</h3><p>Online sau fizic, în funcție de ce ți se potrivește.</p></div>
                    <div className="feature-card"><h3>Mentorat Personalizat</h3><p>Îți aloci un mentor care te urmărește constant.</p></div>
                </div>
            </section>

            <section className="popular-courses">
                <h2>🔥 Cursuri Populare</h2>
                <div className="courses-grid">
                    <div className="course-card"><img src={mathImage} alt="Matematică" /><h3>Matematică Bac</h3>
                        <ul><li>Algebră, funcții, probabilități</li><li>Pregătire pentru orice profil</li><li>Suport și fișe PDF</li></ul>
                        <a href="/courses/1" className="details-button">Detalii</a>
                    </div>
                    <div className="course-card"><img src={engImage} alt="Engleză" /><h3>Engleză Generală</h3>
                        <ul><li>Speaking & Listening practice</li><li>Grammar fără stres</li><li>Interactive Zoom lessons</li></ul>
                        <a href="/courses/2" className="details-button">Detalii</a>
                    </div>
                    <div className="course-card"><img src={csImage} alt="Informatică" /><h3>Informatică Java/Python</h3>
                        <ul><li>Algoritmi + Proiecte reale</li><li>Pregătire admitere + Bac</li><li>Live coding cu profesorul</li></ul>
                        <a href="/courses/3" className="details-button">Detalii</a>
                    </div>
                </div>
            </section>

            <section className="how-section">
                <h2>🧑‍🔬 Cum funcționează MentorWay?</h2>
                <div className="how-steps-grid">
                    <div className="how-step-card">
                        <div className="step-number">1️⃣</div>
                        <div className="step-content">
                            <h3>Îți faci cont</h3>
                            <p>Email și nume. Rapid și gratuit.</p>
                        </div>
                    </div>
                    <div className="how-step-card">
                        <div className="step-number">2️⃣</div>
                        <div className="step-content">
                            <h3>Alegi un curs</h3>
                            <p>Filtru după nivel, materie și profesor.</p>
                        </div>
                    </div>
                    <div className="how-step-card">
                        <div className="step-number">3️⃣</div>
                        <div className="step-content">
                            <h3>Te conectezi pe Zoom</h3>
                            <p>Primești linkul și reminderul.</p>
                        </div>
                    </div>
                    <div className="how-step-card">
                        <div className="step-number">4️⃣</div>
                        <div className="step-content">
                            <h3>Primești feedback</h3>
                            <p>Observații personalizate după lecții.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="testimonials-section">
                <h2>❤️ Ce spun cursanții noștri</h2>
                <div className="testimonial-carousel">
                    {testimonials.map((t, index) => (
                        <div key={index} className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}>
                            <p>"{t.text}"</p>
                            <span>- {t.author}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="gallery-section">
                <h2>🖼️ Cum arată o lecție MentorWay?</h2>
                <p className="gallery-desc">Cursuri reale, interactive, pe Zoom – o experiență de învățare modernă.</p>
                <div className="gallery-wrapper">
                    <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} centeredSlides autoplay={{ delay: 3500 }} pagination={{ clickable: true }} navigation loop className="gallery-swiper">
                        <SwiperSlide>
                            <div className="slide-two-column">
                                <div className="slide-left">
                                    <img src={zoom1} alt="Zoom 1" className="gallery-image" />
                                    <div className="slide-caption">
                                        <h3>Meditație 1-la-1: matematică și planificare</h3>
                                        <p>Elevul își notează, primește explicații live și revizuiește conceptele discutate.</p>
                                    </div>
                                </div>
                                <div className="slide-right">
                                    <ProgressCard
                                        title="📊 Evoluție Bacalaureat"
                                        stats={[
                                            { week: "1", score: "7.0" },
                                            { week: "2", score: "7.5" },
                                            { week: "3", score: "8.2" },
                                            { week: "4", score: "9.0" }
                                        ]}
                                        footer="🔮 Estimare finală: 9.2"
                                    />

                                   
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="slide-two-column">
                                <div className="slide-left">
                                    <img src={zoom2} alt="Zoom 2" className="gallery-image" />
                                    <div className="slide-caption">
                                        <h3>Exerciții interactive de engleză</h3>
                                        <p>Conversație fluentă, feedback imediat și exerciții adaptate nivelului tău.</p>
                                    </div>
                                </div>
                                <div className="slide-right">
                                    <ProgressCard
                                        title="📘 Evoluție Cambridge"
                                        stats={[
                                            { week: "1", score: "6.8" },
                                            { week: "2", score: "7.1" },
                                            { week: "3", score: "7.8" },
                                            { week: "4", score: "8.5" }
                                        ]}
                                        footer="🎯 Nivel estimat CEFR: B2"
                                    />

                                   
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="slide-two-column">
                                <div className="slide-left">
                                    <img src={zoom3} alt="Zoom 3" className="gallery-image" />
                                    <div className="slide-caption">
                                        <h3>Lecție live cu profesorul</h3>
                                        <p>Explicații clare, desfășurate ca la clasă – dar de acasă.</p>
                                    </div>
                                </div>
                                <div className="slide-right">
                                    <ProgressCard
                                        title="📚 Evaluare Națională – Progres"
                                        stats={[
                                            { week: "1", score: "6.5" },
                                            { week: "2", score: "7.2" },
                                            { week: "3", score: "8.1" },
                                            { week: "4", score: "8.6" }
                                        ]}
                                        footer="📈 Estimare simulare: 8.9"
                                    />

                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <section className="learning-style-teaser">
                <div className="learning-card">
                    <div className="learning-icon">🧠</div>
                    <div className="learning-content">
                        <h2>Descoperă stilul tău de învățare</h2>
                        <p>Fă testul rapid și află ce metodă ți se potrivește cel mai bine!</p>
                        <a href="/learning-style-test" className="cta-button">📊 Fă testul</a>
                    </div>
                </div>
            </section>


            <section className="final-cta">
                <h2>Începe astăzi</h2>
                <p>Alătură-te comunității noastre și descoperă ce înseamnă o meditație de calitate.</p>
                <a href="/signup" className="cta-button">🚀 Creează un cont</a>
            </section>

            <footer className="footer">
                <p>&copy; 2025 MentorWay. Toate drepturile rezervate.</p>
            </footer>
        </div>
    );
};

export default Home;
