import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./MainLayout.css";

export default function MainLayout() {
    const { usuario, logout } = useAuth();

    const [menuAbierto, setMenuAbierto] =
        useState(false);

    const esAdmin =
        usuario?.rol === 1;

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    const cerrarSesion = () => {
        cerrarMenu();
        logout();
    };

    return (
        <div className="app-shell">
            <header className="mobile-header">
                <div className="mobile-brand">
                    <span>
                        Don Marcelino
                    </span>

                    <strong>
                        y Los Cocos
                    </strong>
                </div>

                <button
                    type="button"
                    className={`mobile-menu-button ${menuAbierto
                            ? "open"
                            : ""
                        }`}
                    aria-label={
                        menuAbierto
                            ? "Cerrar menú"
                            : "Abrir menú"
                    }
                    aria-expanded={
                        menuAbierto
                    }
                    onClick={() =>
                        setMenuAbierto(
                            (actual) =>
                                !actual
                        )
                    }
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {menuAbierto && (
                <button
                    type="button"
                    className="sidebar-overlay"
                    aria-label="Cerrar menú"
                    onClick={
                        cerrarMenu
                    }
                />
            )}

            <aside
                className={`sidebar ${menuAbierto
                        ? "sidebar-open"
                        : ""
                    }`}
            >
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
                        onClick={
                            cerrarMenu
                        }
                        className={({
                            isActive,
                        }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/pacientes"
                        onClick={
                            cerrarMenu
                        }
                        className={({
                            isActive,
                        }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }
                    >
                        Pacientes
                    </NavLink>

                    <NavLink
                        to="/membresias"
                        onClick={
                            cerrarMenu
                        }
                        className={({
                            isActive,
                        }) =>
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
                                onClick={
                                    cerrarMenu
                                }
                                className={({
                                    isActive,
                                }) =>
                                    isActive
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                Usuarios
                            </NavLink>

                            <NavLink
                                to="/auditoria"
                                onClick={
                                    cerrarMenu
                                }
                                className={({
                                    isActive,
                                }) =>
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
                            {
                                usuario?.nombre
                            }
                        </span>

                        <small>
                            {
                                usuario?.email
                            }
                        </small>
                    </div>

                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={
                            cerrarSesion
                        }
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