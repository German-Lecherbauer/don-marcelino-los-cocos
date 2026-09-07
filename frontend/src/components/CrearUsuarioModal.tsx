import { useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import "./CrearUsuarioModal.css";

interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: number;
    activo: boolean;
    fechaAlta: string;
}

interface CrearUsuarioModalProps {
    abierto: boolean;
    onCerrar: () => void;
    onCreado: (usuario: Usuario) => void;
}

export default function CrearUsuarioModal({
    abierto,
    onCerrar,
    onCreado,
}: CrearUsuarioModalProps) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState(2);

    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    if (!abierto) {
        return null;
    }

    const limpiarFormulario = () => {
        setNombre("");
        setEmail("");
        setPassword("");
        setRol(2);
        setError("");
    };

    const cerrarModal = () => {
        limpiarFormulario();
        onCerrar();
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setGuardando(true);

        try {
            const response =
                await apiClient.post<Usuario>(
                    "/usuarios",
                    {
                        nombre,
                        email,
                        password,
                        rol,
                    }
                );

            onCreado(response.data);

            limpiarFormulario();
            onCerrar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;

                setError(
                    data?.error ??
                    data?.message ??
                    data?.detail ??
                    data?.title ??
                    "No se pudo crear el usuario."
                );
            } else {
                setError(
                    "Ocurrió un error inesperado."
                );
            }
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="crear-usuario-backdrop">
            <div className="crear-usuario-card">
                <div className="crear-usuario-header">
                    <div>
                        <h2>
                            Nuevo usuario
                        </h2>

                        <p>
                            Creá un usuario para acceder al sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="crear-usuario-close"
                        onClick={cerrarModal}
                        disabled={guardando}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="crear-usuario-grid">
                        <div className="crear-usuario-field">
                            <label htmlFor="nombre">
                                Nombre
                            </label>

                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="crear-usuario-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="crear-usuario-field">
                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="crear-usuario-field">
                            <label htmlFor="rol">
                                Rol
                            </label>

                            <select
                                id="rol"
                                value={rol}
                                onChange={(e) =>
                                    setRol(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            >
                                <option value={1}>
                                    Admin
                                </option>

                                <option value={2}>
                                    Operador
                                </option>

                                <option value={3}>
                                    Consulta
                                </option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="crear-usuario-error">
                            {error}
                        </div>
                    )}

                    <div className="crear-usuario-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={cerrarModal}
                            disabled={guardando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Creando..."
                                : "Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}