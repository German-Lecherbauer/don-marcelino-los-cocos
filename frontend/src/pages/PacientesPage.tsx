import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import PacienteModal from "../components/PacienteModal";
import type { Paciente } from "../types/paciente";
import "./PacientesPage.css";

export default function PacientesPage() {
    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        const cargarPacientes = async () => {
            try {
                const response =
                    await apiClient.get<Paciente[]>("/pacientes");

                setPacientes(response.data);
            } catch {
                setError("No se pudieron cargar los pacientes.");
            } finally {
                setCargando(false);
            }
        };

        cargarPacientes();
    }, []);

    const agregarPaciente = (paciente: Paciente) => {
        setPacientes((actuales) => [
            ...actuales,
            paciente,
        ]);
    };

    if (cargando) {
        return (
            <div className="pacientes-state">
                Cargando pacientes...
            </div>
        );
    }

    return (
        <div className="pacientes-page">
            <header className="pacientes-header">
                <div>
                    <p className="page-eyebrow">
                        Don Marcelino
                    </p>

                    <h1>Pacientes</h1>

                    <p>
                        Gestión y seguimiento de pacientes.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={() => setModalAbierto(true)}
                >
                    Nuevo paciente
                </button>
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
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pacientes.map((paciente) => (
                                        <tr key={paciente.id}>
                                            <td>
                                                <strong>
                                                    {paciente.nombre}{" "}
                                                    {paciente.apellido}
                                                </strong>
                                            </td>

                                            <td>
                                                {paciente.documento}
                                            </td>

                                            <td>
                                                {paciente.email}
                                            </td>

                                            <td>
                                                {new Date(
                                                    paciente.fechaAlta
                                                ).toLocaleDateString()}
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

                                            <td>
                                                <button
                                                    className="table-action"
                                                    type="button"
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>

            <PacienteModal
                abierto={modalAbierto}
                onCerrar={() => setModalAbierto(false)}
                onCreado={agregarPaciente}
            />
        </div>
    );
}