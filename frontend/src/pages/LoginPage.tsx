import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import logoDonMarcelino from "../assets/logo-don-marcelino-los-cocos.png";

import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setCargando(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch {
            setError(
                "Email o contraseña incorrectos."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-background" />

            <div className="login-shell">
                <button
                    type="button"
                    className="login-back-button"
                    onClick={() => navigate("/")}
                >
                    ← Volver al sitio
                </button>

                <div className="login-layout">
                    <section className="login-brand-panel">
                        <div className="login-brand-copy">
                            <p className="login-eyebrow">
                                Área privada
                            </p>

                            <h1>
                                Gestión
                                <br />
                                para nuestra
                                <br />
                                comunidad.
                            </h1>

                            <p className="login-brand-text">
                                Plataforma interna de Don Marcelino
                                y Los Cocos para la gestión de
                                pacientes, membresías y procesos
                                administrativos.
                            </p>
                        </div>

                        <div className="login-logo-wrapper">
                            <img
                                src={logoDonMarcelino}
                                alt="Don Marcelino y Los Cocos"
                                className="login-logo"
                            />
                        </div>
                    </section>

                    <section className="login-form-panel">
                        <div className="login-card">
                            <div className="login-header">
                                <p className="login-card-eyebrow">
                                    Acceso socios
                                </p>

                                <h2>
                                    Iniciar sesión
                                </h2>

                                <p>
                                    Ingresá tus credenciales
                                    para acceder al sistema.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="login-form"
                            >
                                <div className="login-form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        placeholder="usuario@donmarcelino.com"
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className="login-form-group">
                                    <label htmlFor="password">
                                        Contraseña
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Ingresá tu contraseña"
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div
                                        className="login-error"
                                        role="alert"
                                    >
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="login-submit-button"
                                    disabled={cargando}
                                >
                                    {cargando
                                        ? "Ingresando..."
                                        : "Ingresar al sistema"}
                                </button>
                            </form>

                            <div className="login-footer">
                                <span>
                                    Don Marcelino y Los Cocos
                                </span>

                                <span>
                                    Asociación Civil
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}