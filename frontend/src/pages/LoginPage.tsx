import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setCargando(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch {
            setError("Email o contraseña incorrectos.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Don Marcelino</h1>
                    <p>Gestión de pacientes y membresías</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="admin@donmarcelino.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Ingresá tu contraseña"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Ingresando..."
                            : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}