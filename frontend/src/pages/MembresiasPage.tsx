import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import "./MembresiasPage.css";

interface MembresiaListado {
    id: string;
    pacienteId: string;
    pacienteNombre: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}

export default function MembresiasPage() {
    const navigate = useNavigate();

    const [membresias, setMembresias] =
        useState<MembresiaListado[]>([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const cargarMembresias = async () => {
            try {
                const response =
                    await apiClient.get<MembresiaListado[]>(
                        "/membresias"
                    );

                setMembresias(
                    response.data
                );
            } catch {
                setError(
                    "No se pudieron cargar las membresías."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarMembresias();
    }, []);

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
            <div className="membresias-state">
                Cargando membresías...
            </div>
        );
    }

    if (error) {
        return (
            <div className="membresias-state">
                {error}
            </div>
        );
    }

    return (
        <div className="membresias-page">
            <header className="membresias-header">
                <div>
                    <p className="page-eyebrow">
                        Área de gestión
                    </p>

                    <h1>
                        Membresías
                    </h1>

                    <p>
                        Gestión general de membresías registradas.
                    </p>
                </div>
            </header>

            <main className="membresias-content">
                <section className="membresias-card">
                    <div className="membresias-card-header">
                        <div>
                            <h2>
                                Listado de membresías
                            </h2>

                            <p>
                                {membresias.length} membresía
                                {membresias.length !== 1
                                    ? "s"
                                    : ""} registrada
                                {membresias.length !== 1
                                    ? "s"
                                    : ""}.
                            </p>
                        </div>
                    </div>

                    {membresias.length === 0 ? (
                        <div className="membresias-empty">
                            No hay membresías registradas.
                        </div>
                    ) : (
                        <div className="membresias-table-wrapper">
                            <table className="membresias-table">
                                <thead>
                                    <tr>
                                        <th>Paciente</th>
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
                                                    <button
                                                        type="button"
                                                        className="membresia-paciente-link"
                                                        onClick={() =>
                                                            navigate(
                                                                `/pacientes/${membresia.pacienteId}`
                                                            )
                                                        }
                                                    >
                                                        {
                                                            membresia.pacienteNombre
                                                        }
                                                    </button>
                                                </td>

                                                <td>
                                                    {formatearFecha(
                                                        membresia.fechaInicio
                                                    )}
                                                </td>

                                                <td>
                                                    {formatearFecha(
                                                        membresia.fechaVencimiento
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`membresias-estado ${obtenerClaseEstado(
                                                            membresia.estado
                                                        )}`}
                                                    >
                                                        {obtenerEstado(
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
        </div>
    );
}