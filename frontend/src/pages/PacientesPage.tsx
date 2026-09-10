import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import PacienteModal from "../components/PacienteModal";
import { useAuth } from "../auth/AuthContext";
import type { Paciente } from "../types/paciente";
import "./PacientesPage.css";

export default function PacientesPage() {
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const puedeEditar =
        usuario?.rol === 1 ||
        usuario?.rol === 2;

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                const response =
                    await apiClient.get<Paciente[]>(
                        "/pacientes"
                    );

                setPacientes(response.data);
            } catch {
                setError(
                    "No se pudieron cargar los pacientes."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarPacientes();
    }, []);

    const agregarPaciente = (
        paciente: Paciente
    ) => {
        setPacientes((actuales) => [
            ...actuales,
            paciente,
        ]);
    };

    const formatearFecha = (fecha: string) => {
        return new Intl.DateTimeFormat(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        ).format(new Date(fecha));
    };

    if (cargando) {
        return (
            <div className="pacientes-state">
                <span>
                    Don Marcelino
                </span>

                <strong>
                    Cargando pacientes...
                </strong>
            </div>
        );
    }

    return (
        <div className="pacientes-page">
            <header className="pacientes-header">
                <div>
                    <p className="page-eyebrow">
                        Área de gestión
                    </p>

                    <h1>
                        Pacientes
                    </h1>

                    <p className="pacientes-subtitle">
                        Gestión y seguimiento de pacientes.
                    </p>
                </div>

                {puedeEditar && (
                    <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                            setModalAbierto(true)
                        }
                    >
                        Nuevo paciente
                    </button>
                )}
            </header>

            <main className="pacientes-content">
                {error && (
                    <div className="pacientes-error">
                        {error}
                    </div>
                )}

                <section className="pacientes-panel">
                    <div className="pacientes-panel-header">
                        <div>
                            <p className="page-section-label">
                                Registro
                            </p>

                            <h2>
                                Listado de pacientes
                            </h2>

                            <p>
                                {pacientes.length} pacientes registrados
                            </p>
                        </div>
                    </div>

                    {pacientes.length === 0 ? (
                        <div className="pacientes-empty">
                            No hay pacientes registrados.
                        </div>
                    ) : (
                        <div className="pacientes-table-wrapper">
                            <table className="pacientes-table">
                                <thead>
                                    <tr>
                                        <th>Paciente</th>
                                        <th>Documento</th>
                                        <th>Email</th>
                                        <th>Fecha de alta</th>
                                        <th>Estado</th>
                                        <th className="table-actions-heading">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pacientes.map(
                                        (paciente) => (
                                            <tr
                                                key={
                                                    paciente.id
                                                }
                                            >
                                                <td>
                                                    <strong className="patient-name">
                                                        {
                                                            paciente.nombre
                                                        }{" "}
                                                        {
                                                            paciente.apellido
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    {
                                                        paciente.documento
                                                    }
                                                </td>

                                                <td className="patient-email">
                                                    {
                                                        paciente.email
                                                    }
                                                </td>

                                                <td>
                                                    {formatearFecha(
                                                        paciente.fechaAlta
                                                    )}
                                                </td>

                                                <td>
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
                                                </td>

                                                <td className="table-actions-cell">
                                                    <button
                                                        type="button"
                                                        className="table-action"
                                                        onClick={() =>
                                                            navigate(
                                                                `/pacientes/${paciente.id}`
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

            {puedeEditar && (
                <PacienteModal
                    abierto={modalAbierto}
                    onCerrar={() =>
                        setModalAbierto(false)
                    }
                    onCreado={
                        agregarPaciente
                    }
                />
            )}
        </div>
    );
}