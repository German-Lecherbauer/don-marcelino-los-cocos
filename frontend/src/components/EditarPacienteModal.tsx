import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import type { Paciente } from "../types/paciente";
import "./EditarPacienteModal.css";

interface EditarPacienteModalProps {
    abierto: boolean;
    paciente: Paciente;
    onCerrar: () => void;
    onActualizado: (paciente: Paciente) => void;
}

export default function EditarPacienteModal({
    abierto,
    paciente,
    onCerrar,
    onActualizado,
}: EditarPacienteModalProps) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [documento, setDocumento] = useState("");
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (!abierto) {
            return;
        }

        setNombre(paciente.nombre);
        setApellido(paciente.apellido);
        setEmail(paciente.email);
        setDocumento(paciente.documento);
        setError("");
    }, [abierto, paciente]);

    if (!abierto) {
        return null;
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setGuardando(true);

        try {
            const response = await apiClient.put<Paciente>(
                `/pacientes/${paciente.id}`,
                {
                    nombre,
                    apellido,
                    email,
                    documento,
                }
            );

            onActualizado(response.data);
            onCerrar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;

                setError(
                    data?.error ??
                    data?.message ??
                    data?.detail ??
                    "No se pudo actualizar el paciente."
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
        <div className="editar-paciente-backdrop">
            <div className="editar-paciente-card">
                <div className="editar-paciente-header">
                    <div>
                        <h2>Editar paciente</h2>

                        <p>
                            Modificá la información del paciente.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="editar-paciente-close"
                        onClick={onCerrar}
                        disabled={guardando}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="editar-paciente-grid">
                        <div className="editar-paciente-field">
                            <label htmlFor="editarNombre">
                                Nombre
                            </label>

                            <input
                                id="editarNombre"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="editar-paciente-field">
                            <label htmlFor="editarApellido">
                                Apellido
                            </label>

                            <input
                                id="editarApellido"
                                value={apellido}
                                onChange={(e) =>
                                    setApellido(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="editar-paciente-field">
                            <label htmlFor="editarEmail">
                                Email
                            </label>

                            <input
                                id="editarEmail"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="editar-paciente-field">
                            <label htmlFor="editarDocumento">
                                Documento
                            </label>

                            <input
                                id="editarDocumento"
                                value={documento}
                                onChange={(e) =>
                                    setDocumento(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="editar-paciente-error">
                            {error}
                        </div>
                    )}

                    <div className="editar-paciente-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCerrar}
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
                                : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}