import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // 🧹 Ștergem datele din localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('token'); // dacă folosești token
        // 🔁 Redirecționăm către login sau home
        navigate('/login');
    }, [navigate]);

    return null;
}

export default Logout;
