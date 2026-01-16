import { useState } from 'react';
import '../css/Login.css';

const Login = ({ acceder }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            acceder(email); 
        } else {
            alert("Por favor escribe un correo");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Gestión cargadores eléctricos</h2>
                <p className="login-subtitle">Inicia sesión para reservar</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="usuario@ejemplo.com"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="login-input"
                    />
                    <button type="submit" className="btn-login">
                        Entrar
                    </button>
                </form>

                <p className="login-footer">
                    <a href="#" className="login-link">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;