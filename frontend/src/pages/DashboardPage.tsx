import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";
import type { DashboardResumen } from "../types/dashboard";
import "./DashboardPage.css";

export default function DashboardPage() {
    const { usuario } = useAuth();

    const [dashboard, setDashboard] =
        useState<DashboardResumen | null>(null);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                const response =
                    await apiClient.get<DashboardResumen>(
                        "/dashboard/resumen"
                    );

                setDashboard(response.data);
            } catch {
                setError(
                    "No se pudo cargar la información del dashboard."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarDashboard();
    }, []);

    const obtenerRol = (rol?: number) => {
        switch (rol) {
            case 1:
                return "Admin";

            case 2:
                return "Operador";

            case 3:
                return "Consulta";

            default:
                return "Usuario";
        }
    };

    const formatearFechaHora = (fecha: string) => {
        return new Intl.DateTimeFormat(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        ).format(new Date(fecha));
    };

    if (cargando) {
        return (
            <div className="dashboard-state">
                <span className="dashboard-state-label">
                    Don Marcelino
                </span>

                <strong>
                    Cargando dashboard...
                </strong>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-state dashboard-error">
                <span className="dashboard-state-label">
                    Error
                </span>

                <strong>
                    {error}
                </strong>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const metricas = [
        {
            etiqueta: "Total pacientes",
            valor: dashboard.totalPacientes,
        },
        {
            etiqueta: "Pacientes activos",
            valor: dashboard.pacientesActivos,
        },
        {
            etiqueta: "Membresías activas",
            valor: dashboard.membresiasActivas,
        },
        {
            etiqueta: "Membresías vencidas",
            valor: dashboard.membresiasVencidas,
        },
        {
            etiqueta: "Usuarios activos",
            valor: dashboard.usuariosActivos,
        },
    ];

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <p className="dashboard-brand">
                        Área de gestión
                    </p>

                    <h1>
                        Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Resumen general del sistema
                    </p>
                </div>

                <div className="dashboard-user">
                    <span className="dashboard-user-label">
                        Sesión iniciada como
                    </span>

                    <strong>
                        {usuario?.nombre}
                    </strong>

                    <span className="dashboard-user-role">
                        {obtenerRol(usuario?.rol)}
                    </span>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="metrics-section">
                    <p className="dashboard-section-label">
                        Resumen
                    </p>

                    <div className="metrics-grid">
                        {metricas.map((metrica) => (
                            <article
                                className="metric-card"
                                key={metrica.etiqueta}
                            >
                                <span className="metric-label">
                                    {metrica.etiqueta}
                                </span>

                                <strong className="metric-value">
                                    {metrica.valor}
                                </strong>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="activity-section">
                    <div className="section-heading">
                        <div>
                            <p className="dashboard-section-label">
                                Auditoría reciente
                            </p>

                            <h2>
                                Últimas acciones
                            </h2>

                            <p>
                                Actividad reciente registrada por el sistema.
                            </p>
                        </div>
                    </div>

                    {dashboard.ultimasAcciones.length === 0 ? (
                        <div className="empty-state">
                            No hay acciones recientes.
                        </div>
                    ) : (
                        <div className="activity-list">
                            {dashboard.ultimasAcciones.map(
                                (accion, index) => (
                                    <article
                                        className="activity-card"
                                        key={`${accion.fecha}-${index}`}
                                    >
                                        <div className="activity-top">
                                            <div className="activity-user">
                                                <span className="activity-dot" />

                                                <div>
                                                    <strong>
                                                        {accion.usuarioNombre}
                                                    </strong>

                                                    <span className="activity-meta">
                                                        {accion.accion}
                                                        {" · "}
                                                        {accion.entidad}
                                                    </span>
                                                </div>
                                            </div>

                                            <time>
                                                {formatearFechaHora(
                                                    accion.fecha
                                                )}
                                            </time>
                                        </div>

                                        <p>
                                            {accion.detalle}
                                        </p>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}