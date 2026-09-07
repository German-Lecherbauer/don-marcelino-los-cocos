import { useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import type { Paciente } from "../types/paciente";
import "./PacienteModal.css";

interface PacienteModalProps {
    abierto: boolean;
    onCerrar: () => void;
    onCreado: (paciente: Paciente) => void;
}

export default function PacienteModal({
    abierto,
    onCerrar,
    onCreado,
}: PacienteModalProps) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [documento, setDocumento] = useState("");
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    if (!abierto) {
        return null;
    }

    const limpiarFormulario = () => {
        setNombre("");
        setApellido("");
        setEmail("");
        setDocumento("");
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
            const response = await apiClient.post<Paciente>(
                "/pacientes",
                {
                    nombre,
                    apellido,
                    email,
                    documento,
                }
            );

            onCreado(response.data);
            limpiarFormulario();
            onCerrar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.error ??
                    "No se pudo crear el paciente."
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
        <div className="modal-backdrop">
            <div className="modal-card">
                <div className="modal-header">
                    <div>
                        <h2>Nuevo paciente</h2>
                        <p>Ingresá los datos del paciente.</p>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={cerrarModal}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-grid">
                        <div className="modal-field">
                            <label htmlFor="nombre">
                                Nombre
                            </label>

                            <input
                                id="nombre"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                                placeholder="Nombre"
                                autoComplete="given-name"
                            />
                        </div>

                        <div className="modal-field">
                            <label htmlFor="apellido">
                                Apellido
                            </label>

                            <input
                                id="apellido"
                                value={apellido}
                                onChange={(e) =>
                                    setApellido(e.target.value)
                                }
                                placeholder="Apellido"
                                autoComplete="family-name"
                            />
                        </div>

                        <div className="modal-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="paciente@email.com"
                                autoComplete="email"
                            />
                        </div>

                        <div className="modal-field">
                            <label htmlFor="documento">
                                Documento
                            </label>

                            <input
                                id="documento"
                                value={documento}
                                onChange={(e) =>
                                    setDocumento(e.target.value)
                                }
                                placeholder="Documento"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="modal-error">
                            {error}
                        </div>
                    )}

                    <div className="modal-actions">
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
                                ? "Guardando..."
                                : "Crear paciente"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}