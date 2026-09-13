import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import CambiarEstadoMembresiaModal from "../components/CambiarEstadoMembresiaModal";
import EditarMembresiaModal from "../components/EditarMembresiaModal";
import { useAuth } from "../auth/AuthContext";
import "./MembresiaDetallePage.css";

interface Membresia {
    id: string;
    pacienteId: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

export default function MembresiaDetallePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const puedeEditar =
        usuario?.rol === 1 ||
        usuario?.rol === 2;

    const [membresia, setMembresia] =
        useState<Membresia | null>(null);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    const [modalEstadoAbierto, setModalEstadoAbierto] =
        useState(false);

    const [modalEditarAbierto, setModalEditarAbierto] =
        useState(false);

    useEffect(() => {
        const cargarMembresia = async () => {
            if (!id) {
                setError(
                    "Membresía no válida."
                );

                setCargando(false);
                return;
            }

            try {
                const response =
                    await apiClient.get<Membresia>(
                        `/membresias/${id}`
                    );

                setMembresia(
                    response.data
                );
            } catch {
                setError(
                    "No se pudo cargar la membresía."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarMembresia();
    }, [id]);

    const obtenerEstado = (
        estado: number
    ) => {
        switch (estado) {
            case 1:
                return "Activa";

            case 2:
                return "Vencida";

            case 3:
                return "Suspendida";

            case 4:
                return "Cancelada";

            default:
                return "Desconocido";
        }
    };

    const obtenerClaseEstado = (
        estado: number
    ) => {
        switch (estado) {
            case 1:
                return "activa";

            case 2:
                return "vencida";

            case 3:
                return "suspendida";

            case 4:
                return "cancelada";

            default:
                return "";
        }
    };

    const formatearFecha = (
        fecha: string
    ) => {
        return new Intl.DateTimeFormat(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                timeZone: "UTC",
            }
        ).format(
            new Date(fecha)
        );
    };

    if (cargando) {
        return (
            <div className="membresia-detalle-state">
                <span>
                    Don Marcelino
                </span>

                <strong>
                    Cargando membresía...
                </strong>
            </div>
        );
    }

    if (error || !membresia) {
        return (
            <div className="membresia-detalle-state">
                <p>
                    {error ||
                        "Membresía no encontrada."}
                </p>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="membresia-detalle-page">
            <header className="membresia-detalle-header">
                <div>
                    <p className="page-eyebrow">
                        Área de gestión
                    </p>

                    <h1>
                        Detalle de membresía
                    </h1>

                    <p>
                        Información y estado de la membresía.
                    </p>
                </div>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate(
                            `/pacientes/${membresia.pacienteId}`
                        )
                    }
                >
                    Volver al paciente
                </button>
            </header>

            <main className="membresia-detalle-content">
                <section className="membresia-detalle-card">
                    <div className="membresia-detalle-card-header">
                        <div>
                            <p className="membresia-section-label">
                                Membresía
                            </p>

                            <h2>
                                Información
                            </h2>

                            <p>
                                Período y estado actual.
                            </p>
                        </div>

                        <span
                            className={`membresia-estado ${obtenerClaseEstado(
                                membresia.estado
                            )}`}
                        >
                            {obtenerEstado(
                                membresia.estado
                            )}
                        </span>
                    </div>

                    <div className="membresia-detalle-grid">
                        <div className="membresia-detalle-item">
                            <span>
                                Fecha de inicio
                            </span>

                            <strong>
                                {formatearFecha(
                                    membresia.fechaInicio
                                )}
                            </strong>
                        </div>

                        <div className="membresia-detalle-item">
                            <span>
                                Fecha de vencimiento
                            </span>

                            <strong>
                                {formatearFecha(
                                    membresia.fechaVencimiento
                                )}
                            </strong>
                        </div>

                        <div className="membresia-detalle-item">
                            <span>
                                Estado
                            </span>

                            <strong>
                                {obtenerEstado(
                                    membresia.estado
                                )}
                            </strong>
                        </div>
                    </div>

                    {puedeEditar && (
                        <div className="membresia-detalle-actions">
                            <button
                                type="button"
                                className="table-action"
                                onClick={() =>
                                    setModalEditarAbierto(true)
                                }
                            >
                                Editar fechas
                            </button>

                            <button
                                type="button"
                                className="table-action"
                                onClick={() =>
                                    setModalEstadoAbierto(true)
                                }
                            >
                                Cambiar estado
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {puedeEditar && (
                <>
                    <EditarMembresiaModal
                        abierto={modalEditarAbierto}
                        membresia={membresia}
                        onCerrar={() =>
                            setModalEditarAbierto(false)
                        }
                        onActualizada={(actualizada) =>
                            setMembresia(actualizada)
                        }
                    />

                    <CambiarEstadoMembresiaModal
                        abierto={modalEstadoAbierto}
                        membresia={membresia}
                        onCerrar={() =>
                            setModalEstadoAbierto(false)
                        }
                        onActualizada={(actualizada) =>
                            setMembresia(actualizada)
                        }
                    />
                </>
            )}
        </div>
    );
}