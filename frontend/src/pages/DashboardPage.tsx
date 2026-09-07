import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";
import type { DashboardResumen } from "../types/dashboard";
import "./DashboardPage.css";

export default function DashboardPage() {
    const { usuario, logout } = useAuth();

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

    if (cargando) {
        return (
            <div className="dashboard-state">
                Cargando dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-state dashboard-error">
                {error}
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <p className="dashboard-brand">
                        Don Marcelino
                    </p>

                    <h1>Dashboard</h1>

                    <p className="dashboard-subtitle">
                        Resumen general del sistema
                    </p>
                </div>

                <div className="dashboard-user">
                    <div>
                        <span className="dashboard-user-label">
                            Sesión iniciada como
                        </span>

                        <strong>
                            {usuario?.nombre}
                        </strong>
                    </div>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="metrics-grid">
                    <article className="metric-card">
                        <span>Total pacientes</span>

                        <strong>
                            {dashboard.totalPacientes}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span>Pacientes activos</span>

                        <strong>
                            {dashboard.pacientesActivos}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span>Membresías activas</span>

                        <strong>
                            {dashboard.membresiasActivas}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span>Membresías vencidas</span>

                        <strong>
                            {dashboard.membresiasVencidas}
                        </strong>
                    </article>

                    <article className="metric-card">
                        <span>Usuarios activos</span>

                        <strong>
                            {dashboard.usuariosActivos}
                        </strong>
                    </article>
                </section>

                <section className="activity-section">
                    <div className="section-heading">
                        <div>
                            <h2>Últimas acciones</h2>

                            <p>
                                Actividad reciente registrada por el sistema
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
                                            <div>
                                                <strong>
                                                    {accion.usuarioNombre}
                                                </strong>

                                                <span className="activity-meta">
                                                    {accion.accion} · {accion.entidad}
                                                </span>
                                            </div>

                                            <time>
                                                {new Date(
                                                    accion.fecha
                                                ).toLocaleString()}
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