import { useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import "./MembresiaModal.css";

interface Membresia {
    id: string;
    pacienteId: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

interface MembresiaModalProps {
    abierto: boolean;
    pacienteId: string;
    onCerrar: () => void;
    onCreada: (membresia: Membresia) => void;
}

export default function MembresiaModal({
    abierto,
    pacienteId,
    onCerrar,
    onCreada,
}: MembresiaModalProps) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    if (!abierto) {
        return null;
    }

    const limpiarFormulario = () => {
        setFechaInicio("");
        setFechaVencimiento("");
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
            const response = await apiClient.post<Membresia>(
                `/pacientes/${pacienteId}/membresias`,
                {
                    fechaInicio,
                    fechaVencimiento,
                }
            );

            onCreada(response.data);

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
                    (typeof data === "string" ? data : null) ??
                    "No se pudo crear la membresía."
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
        <div className="membresia-modal-backdrop">
            <div className="membresia-modal-card">
                <div className="membresia-modal-header">
                    <div>
                        <h2>Nueva membresía</h2>

                        <p>
                            Ingresá el período de vigencia.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="membresia-modal-close"
                        onClick={cerrarModal}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="membresia-modal-grid">
                        <div className="membresia-modal-field">
                            <label htmlFor="fechaInicio">
                                Fecha de inicio
                            </label>

                            <input
                                id="fechaInicio"
                                type="date"
                                value={fechaInicio}
                                onChange={(e) =>
                                    setFechaInicio(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="membresia-modal-field">
                            <label htmlFor="fechaVencimiento">
                                Fecha de vencimiento
                            </label>

                            <input
                                id="fechaVencimiento"
                                type="date"
                                value={fechaVencimiento}
                                onChange={(e) =>
                                    setFechaVencimiento(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="membresia-modal-error">
                            {error}
                        </div>
                    )}

                    <div className="membresia-modal-actions">
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
                                : "Crear membresía"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}