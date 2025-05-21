import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './styles/Header.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const isLoggedIn = !!localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    return (
        <header className="modern-header">
            <div className="logo" onClick={() => navigate('/')}>MentorWay</div>

            <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Acasă</Link>
                <Link to="/courses" onClick={() => setMenuOpen(false)}>Cursuri</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>Despre</Link>
                {isLoggedIn && <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>}
            </nav>

            <div className="header-right">
                {location.pathname !== '/' && (
                    <button className="btn-back" onClick={() => navigate(-1)}>Înapoi</button>
                )}

                {isLoggedIn && (
                    <div className="user-dropdown" tabIndex={0} onBlur={closeDropdown}>
                        <div className="user-trigger" onClick={toggleDropdown}>
                            <FaUserCircle size={20} />
                            <span>{username}</span>
                        </div>
                        {dropdownOpen && (
                            <div className="dropdown-menu profile-view">
                                <p><strong>{username}</strong></p>
                                <p>{email}</p>
                                <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>{role}</p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
            </div>
        </header>
    );
}

export default Header;
