import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import "./CambiarEstadoMembresiaModal.css";

interface Membresia {
    id: string;
    pacienteId: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

interface CambiarEstadoMembresiaModalProps {
    abierto: boolean;
    membresia: Membresia;
    onCerrar: () => void;
    onActualizada: (membresia: Membresia) => void;
}

export default function CambiarEstadoMembresiaModal({
    abierto,
    membresia,
    onCerrar,
    onActualizada,
}: CambiarEstadoMembresiaModalProps) {
    const [estado, setEstado] = useState(membresia.estado);
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (abierto) {
            setEstado(membresia.estado);
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
        setGuardando(true);

        try {
            const response = await apiClient.patch<Membresia>(
                `/membresias/${membresia.id}/estado`,
                {
                    estado,
                }
            );

            onActualizada(response.data);
            onCerrar();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;

                setError(
                    data?.error ??
                    data?.message ??
                    data?.detail ??
                    "No se pudo cambiar el estado."
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
        <div className="estado-modal-backdrop">
            <div className="estado-modal-card">
                <div className="estado-modal-header">
                    <div>
                        <h2>Cambiar estado</h2>
                        <p>Seleccioná el nuevo estado de la membresía.</p>
                    </div>

                    <button
                        type="button"
                        className="estado-modal-close"
                        onClick={onCerrar}
                        disabled={guardando}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="estado-modal-field">
                        <label htmlFor="estado">
                            Estado
                        </label>

                        <select
                            id="estado"
                            value={estado}
                            onChange={(e) =>
                                setEstado(Number(e.target.value))
                            }
                        >
                            <option value={1}>Activa</option>
                            <option value={2}>Vencida</option>
                            <option value={3}>Suspendida</option>
                            <option value={4}>Cancelada</option>
                        </select>
                    </div>

                    {error && (
                        <div className="estado-modal-error">
                            {error}
                        </div>
                    )}

                    <div className="estado-modal-actions">
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
                                : "Guardar estado"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}