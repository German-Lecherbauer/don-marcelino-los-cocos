import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import "./EditarMembresiaModal.css";

interface Membresia {
    id: string;
    pacienteId: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

interface EditarMembresiaModalProps {
    abierto: boolean;
    membresia: Membresia;
    onCerrar: () => void;
    onActualizada: (membresia: Membresia) => void;
}

const obtenerFechaInput = (fecha: string) => {
    return fecha.slice(0, 10);
};

export default function EditarMembresiaModal({
    abierto,
    membresia,
    onCerrar,
    onActualizada,
}: EditarMembresiaModalProps) {
    const [fechaInicio, setFechaInicio] =
        useState("");

    const [fechaVencimiento, setFechaVencimiento] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);

    useEffect(() => {
        if (abierto) {
            setFechaInicio(
                obtenerFechaInput(
                    membresia.fechaInicio
                )
            );

            setFechaVencimiento(
                obtenerFechaInput(
                    membresia.fechaVencimiento
                )
            );

            setError("");
        }
    }, [abierto, membresia]);

    if (!abierto) {
        return null;
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (!fechaInicio || !fechaVencimiento) {
            setError(
                "Las dos fechas son obligatorias."
            );
            return;
        }

        if (
            new Date(fechaVencimiento) <
            new Date(fechaInicio)
        ) {
            setError(
                "La fecha de vencimiento no puede ser anterior a la fecha de inicio."
            );
            return;
        }

        setGuardando(true);

        try {
            const response =
                await apiClient.put<Membresia>(
                    `/membresias/${membresia.id}`,
                    {
                        fechaInicio,
                        fechaVencimiento,
                    }
                );

            onActualizada(
                response.data
            );

            onCerrar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data =
                    error.response?.data;

                setError(
                    data?.error ??
                    data?.message ??
                    data?.detail ??
                    "No se pudieron actualizar las fechas."
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
        <div className="editar-membresia-backdrop">
            <div className="editar-membresia-card">
                <div className="editar-membresia-header">
                    <div>
                        <h2>
                            Editar fechas
                        </h2>

                        <p>
                            Modificá el período de vigencia de la membresía.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="editar-membresia-close"
                        onClick={onCerrar}
                        disabled={guardando}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="editar-membresia-grid">
                        <div className="editar-membresia-field">
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
                            />
                        </div>

                        <div className="editar-membresia-field">
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
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="editar-membresia-error">
                            {error}
                        </div>
                    )}

                    <div className="editar-membresia-actions">
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