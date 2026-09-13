import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import "./AuditoriaPage.css";

interface Auditoria {
    id: string;
    usuarioId: string;
    usuarioNombre: string;
    accion: string;
    entidad: string;
    entidadId: string;
    detalle: string;
    fecha: string;
}

export default function AuditoriaPage() {
    const [auditorias, setAuditorias] =
        useState<Auditoria[]>([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const cargarAuditorias = async () => {
            try {
                const response =
                    await apiClient.get<Auditoria[]>(
                        "/auditorias"
                    );

                setAuditorias(response.data);
            } catch {
                setError(
                    "No se pudo cargar la auditoría."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarAuditorias();
    }, []);

    const obtenerClaseAccion = (
        accion: string
    ) => {
        switch (accion.toLowerCase()) {
            case "crear":
                return "crear";

            case "actualizar":
                return "actualizar";

            case "cambiarestado":
                return "estado";

            case "cambiarrol":
                return "rol";

            case "activar":
                return "activar";

            case "desactivar":
                return "desactivar";

            default:
                return "default";
        }
    };

    const formatearAccion = (
        accion: string
    ) => {
        switch (accion) {
            case "CambiarEstado":
                return "Cambiar estado";

            case "CambiarRol":
                return "Cambiar rol";

            default:
                return accion;
        }
    };

    const formatearFechaHora = (
        fecha: string
    ) => {
        return new Intl.DateTimeFormat(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }
        ).format(
            new Date(fecha)
        );
    };

    if (cargando) {
        return (
            <div className="auditoria-state">
                <span>
                    Don Marcelino
                </span>

                <strong>
                    Cargando auditoría...
                </strong>
            </div>
        );
    }

    if (error) {
        return (
            <div className="auditoria-state">
                {error}
            </div>
        );
    }

    return (
        <div className="auditoria-page">
            <header className="auditoria-header">
                <div>
                    <p className="page-eyebrow">
                        Área de gestión
                    </p>

                    <h1>
                        Auditoría
                    </h1>

                    <p>
                        Registro de acciones realizadas en el sistema.
                    </p>
                </div>
            </header>

            <main className="auditoria-content">
                <section className="auditoria-card">
                    <div className="auditoria-card-header">
                        <div>
                            <p className="auditoria-section-label">
                                Actividad del sistema
                            </p>

                            <h2>
                                Historial de actividad
                            </h2>

                            <p>
                                {auditorias.length} registro
                                {auditorias.length !== 1
                                    ? "s"
                                    : ""} encontrado
                                {auditorias.length !== 1
                                    ? "s"
                                    : ""}.
                            </p>
                        </div>
                    </div>

                    {auditorias.length === 0 ? (
                        <div className="auditoria-empty">
                            No hay registros de auditoría.
                        </div>
                    ) : (
                        <div className="auditoria-table-wrapper">
                            <table className="auditoria-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Usuario</th>
                                        <th>Acción</th>
                                        <th>Entidad</th>
                                        <th>Detalle</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {auditorias.map(
                                        (
                                            auditoria
                                        ) => (
                                            <tr
                                                key={
                                                    auditoria.id
                                                }
                                            >
                                                <td className="auditoria-fecha">
                                                    {formatearFechaHora(
                                                        auditoria.fecha
                                                    )}
                                                </td>

                                                <td>
                                                    <strong className="auditoria-usuario">
                                                        {
                                                            auditoria.usuarioNombre
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`auditoria-accion ${obtenerClaseAccion(
                                                            auditoria.accion
                                                        )}`}
                                                    >
                                                        {formatearAccion(
                                                            auditoria.accion
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="auditoria-entidad">
                                                    {
                                                        auditoria.entidad
                                                    }
                                                </td>

                                                <td className="auditoria-detalle">
                                                    {
                                                        auditoria.detalle
                                                    }
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