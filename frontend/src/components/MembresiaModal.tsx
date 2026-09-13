import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import type { Membresia } from "../types/membresia";
import "./MembresiaModal.css";

interface MembresiaModalProps {
    abierto: boolean;
    pacienteId: string;
    pacienteNombre?: string;
    onCerrar: () => void;
    onCreada: (membresia: Membresia) => void;
}

const obtenerFechaHoy = () => {
    return new Date()
        .toISOString()
        .split("T")[0];
};

const obtenerFechaProximoMes = () => {
    const fecha = new Date();

    fecha.setMonth(
        fecha.getMonth() + 1
    );

    return fecha
        .toISOString()
        .split("T")[0];
};

export default function MembresiaModal({
    abierto,
    pacienteId,
    pacienteNombre,
    onCerrar,
    onCreada,
}: MembresiaModalProps) {
    const [fechaInicio, setFechaInicio] =
        useState("");

    const [
        fechaVencimiento,
        setFechaVencimiento,
    ] = useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);

    useEffect(() => {
        if (!abierto) {
            return;
        }

        setFechaInicio(
            obtenerFechaHoy()
        );

        setFechaVencimiento(
            obtenerFechaProximoMes()
        );

        setError("");
        setGuardando(false);
    }, [abierto]);

    if (!abierto) {
        return null;
    }

    const cerrarModal = () => {
        if (guardando) {
            return;
        }

        setError("");
        onCerrar();
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (
            !fechaInicio ||
            !fechaVencimiento
        ) {
            setError(
                "Completá las fechas de inicio y vencimiento."
            );

            return;
        }

        if (
            fechaVencimiento <
            fechaInicio
        ) {
            setError(
                "La fecha de vencimiento no puede ser anterior a la fecha de inicio."
            );

            return;
        }

        setGuardando(true);

        try {
            const response =
                await apiClient.post<Membresia>(
                    `/pacientes/${pacienteId}/membresias`,
                    {
                        fechaInicio,
                        fechaVencimiento,
                    }
                );

            onCreada(
                response.data
            );

            onCerrar();
        } catch (error) {
            if (
                axios.isAxiosError(
                    error
                )
            ) {
                setError(
                    error.response
                        ?.data?.error ??
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
        <div
            className="membresia-modal-backdrop"
            onClick={cerrarModal}
        >
            <div
                className="membresia-modal-card"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="membresia-modal-header">
                    <div>
                        <p className="membresia-modal-eyebrow">
                            Nueva membresía
                        </p>

                        <h2>
                            Crear membresía
                        </h2>

                        <p>
                            {pacienteNombre
                                ? `Registrá una nueva membresía para ${pacienteNombre}.`
                                : "Completá los datos de la membresía."}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="membresia-modal-close"
                        onClick={
                            cerrarModal
                        }
                        disabled={
                            guardando
                        }
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="membresia-modal-form"
                >
                    <div className="membresia-modal-grid">
                        <div className="membresia-modal-field">
                            <label htmlFor="fechaInicio">
                                Fecha de inicio
                            </label>

                            <input
                                id="fechaInicio"
                                type="date"
                                value={
                                    fechaInicio
                                }
                                onChange={(
                                    event
                                ) =>
                                    setFechaInicio(
                                        event
                                            .target
                                            .value
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
                                value={
                                    fechaVencimiento
                                }
                                onChange={(
                                    event
                                ) =>
                                    setFechaVencimiento(
                                        event
                                            .target
                                            .value
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
                            className="membresia-secondary-button"
                            onClick={
                                cerrarModal
                            }
                            disabled={
                                guardando
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="membresia-primary-button"
                            disabled={
                                guardando
                            }
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