import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/apiClient";
import MembresiaModal from "../components/MembresiaModal";
import EditarPacienteModal from "../components/EditarPacienteModal";
import type { Paciente } from "../types/paciente";
import "./PacienteDetallePage.css";

interface Membresia {
    id: string;
    pacienteId: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

export default function PacienteDetallePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [membresias, setMembresias] = useState<Membresia[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [modalMembresiaAbierto, setModalMembresiaAbierto] =
        useState(false);

    const [modalEditarAbierto, setModalEditarAbierto] =
        useState(false);

    const [desactivando, setDesactivando] =
        useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            if (!id) {
                setError("Paciente no válido.");
                setCargando(false);
                return;
            }

            try {
                const pacienteResponse =
                    await apiClient.get<Paciente>(
                        `/pacientes/${id}`
                    );

                setPaciente(pacienteResponse.data);

                try {
                    const membresiasResponse =
                        await apiClient.get<Membresia[]>(
                            `/pacientes/${id}/membresias`
                        );

                    setMembresias(
                        membresiasResponse.data
                    );
                } catch {
                    setMembresias([]);
                }
            } catch {
                setError(
                    "No se pudo cargar la información del paciente."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [id]);

    const obtenerEstadoMembresia = (
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

    const formatearFechaMembresia = (
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

    const desactivarPaciente = async () => {
        if (!paciente) {
            return;
        }

        const confirmar = window.confirm(
            `¿Seguro que querés desactivar a ${paciente.nombre} ${paciente.apellido}?`
        );

        if (!confirmar) {
            return;
        }

        setDesactivando(true);

        try {
            await apiClient.delete(
                `/pacientes/${paciente.id}`
            );

            setPaciente({
                ...paciente,
                activo: false,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.error ??
                    "No se pudo desactivar el paciente."
                );
            } else {
                alert(
                    "Ocurrió un error inesperado."
                );
            }
        } finally {
            setDesactivando(false);
        }
    };

    if (cargando) {
        return (
            <div className="paciente-detalle-state">
                Cargando paciente...
            </div>
        );
    }

    if (error || !paciente) {
        return (
            <div className="paciente-detalle-state">
                <p>
                    {error ||
                        "Paciente no encontrado."}
                </p>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate("/pacientes")
                    }
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="paciente-detalle-page">
            <header className="paciente-detalle-header">
                <div>
                    <p className="page-eyebrow">
                        Don Marcelino
                    </p>

                    <h1>
                        {paciente.nombre}{" "}
                        {paciente.apellido}
                    </h1>

                    <p>
                        Detalle y seguimiento del paciente.
                    </p>
                </div>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate("/pacientes")
                    }
                >
                    Volver a pacientes
                </button>
            </header>

            <main className="paciente-detalle-content">
                <section className="detalle-card">
                    <div className="detalle-card-header">
                        <div>
                            <h2>
                                Datos del paciente
                            </h2>

                            <p>
                                Información personal registrada.
                            </p>
                        </div>

                        <span
                            className={
                                paciente.activo
                                    ? "status-badge active"
                                    : "status-badge inactive"
                            }
                        >
                            {paciente.activo
                                ? "Activo"
                                : "Inactivo"}
                        </span>
                    </div>

                    <div className="detalle-grid">
                        <div className="detalle-item">
                            <span>Nombre</span>

                            <strong>
                                {paciente.nombre}
                            </strong>
                        </div>

                        <div className="detalle-item">
                            <span>Apellido</span>

                            <strong>
                                {paciente.apellido}
                            </strong>
                        </div>

                        <div className="detalle-item">
                            <span>Documento</span>

                            <strong>
                                {paciente.documento}
                            </strong>
                        </div>

                        <div className="detalle-item">
                            <span>Fecha de alta</span>

                            <strong>
                                {new Date(
                                    paciente.fechaAlta
                                ).toLocaleDateString()}
                            </strong>
                        </div>

                        <div className="detalle-item detalle-item-email">
                            <span>Email</span>

                            <strong>
                                {paciente.email}
                            </strong>
                        </div>
                    </div>

                    <div className="detalle-actions">
                        <button
                            type="button"
                            className="table-action"
                            onClick={() =>
                                setModalEditarAbierto(
                                    true
                                )
                            }
                        >
                            Editar paciente
                        </button>

                        {paciente.activo && (
                            <button
                                type="button"
                                className="danger-button"
                                onClick={
                                    desactivarPaciente
                                }
                                disabled={
                                    desactivando
                                }
                            >
                                {desactivando
                                    ? "Desactivando..."
                                    : "Desactivar paciente"}
                            </button>
                        )}
                    </div>
                </section>

                <section className="detalle-card">
                    <div className="detalle-card-header">
                        <div>
                            <h2>
                                Membresías
                            </h2>

                            <p>
                                Historial de membresías del paciente.
                            </p>
                        </div>

                        {paciente.activo && (
                            <button
                                type="button"
                                className="primary-button"
                                onClick={() =>
                                    setModalMembresiaAbierto(
                                        true
                                    )
                                }
                            >
                                Nueva membresía
                            </button>
                        )}
                    </div>

                    {membresias.length === 0 ? (
                        <div className="detalle-empty">
                            Este paciente todavía no tiene membresías.
                        </div>
                    ) : (
                        <div className="detalle-table-wrapper">
                            <table className="detalle-table">
                                <thead>
                                    <tr>
                                        <th>Inicio</th>
                                        <th>Vencimiento</th>
                                        <th>Estado</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {membresias.map(
                                        (
                                            membresia
                                        ) => (
                                            <tr
                                                key={
                                                    membresia.id
                                                }
                                            >
                                                <td>
                                                    {formatearFechaMembresia(
                                                        membresia.fechaInicio
                                                    )}
                                                </td>

                                                <td>
                                                    {formatearFechaMembresia(
                                                        membresia.fechaVencimiento
                                                    )}
                                                </td>

                                                <td>
                                                    <span className="membership-badge">
                                                        {obtenerEstadoMembresia(
                                                            membresia.estado
                                                        )}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        className="table-action"
                                                        onClick={() =>
                                                            navigate(
                                                                `/membresias/${membresia.id}`
                                                            )
                                                        }
                                                    >
                                                        Ver
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>

            <MembresiaModal
                abierto={
                    modalMembresiaAbierto
                }
                pacienteId={paciente.id}
                onCerrar={() =>
                    setModalMembresiaAbierto(
                        false
                    )
                }
                onCreada={(membresia) =>
                    setMembresias(
                        (actuales) => [
                            ...actuales,
                            membresia,
                        ]
                    )
                }
            />

            <EditarPacienteModal
                abierto={modalEditarAbierto}
                paciente={paciente}
                onCerrar={() =>
                    setModalEditarAbierto(
                        false
                    )
                }
                onActualizado={(
                    pacienteActualizado
                ) =>
                    setPaciente(
                        pacienteActualizado
                    )
                }
            />
        </div>
    );
}