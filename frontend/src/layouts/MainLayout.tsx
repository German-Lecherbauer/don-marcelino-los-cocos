import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./MainLayout.css";

export default function MainLayout() {
    const { usuario, logout } = useAuth();

    const esAdmin = usuario?.rol === 1;

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <span className="sidebar-brand-small">
                        Don Marcelino
                    </span>

                    <strong>
                        y Los Cocos
                    </strong>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/pacientes"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        Pacientes
                    </NavLink>

                    <NavLink
                        to="/membresias"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        Membresías
                    </NavLink>

                    {esAdmin && (
                        <>
                            <NavLink
                                to="/usuarios"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                Usuarios
                            </NavLink>

                            <NavLink
                                to="/auditoria"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                Auditoría
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <span>
                            {usuario?.nombre}
                        </span>

                        <small>
                            {usuario?.email}
                        </small>
                    </div>

                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <section className="app-content">
                <Outlet />
            </section>
        </div>
    );
}