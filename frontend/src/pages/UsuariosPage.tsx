import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import CrearUsuarioModal from "../components/CrearUsuarioModal";
import CambiarRolUsuarioModal from "../components/CambiarRolUsuarioModal";
import "./UsuariosPage.css";

interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: number;
    activo: boolean;
    fechaAlta: string;
}

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [modalCrearAbierto, setModalCrearAbierto] =
        useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado] =
        useState<Usuario | null>(null);

    const [cambiandoEstadoId, setCambiandoEstadoId] =
        useState<string | null>(null);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const response =
                    await apiClient.get<Usuario[]>(
                        "/usuarios"
                    );

                setUsuarios(response.data);
            } catch {
                setError(
                    "No se pudieron cargar los usuarios."
                );
            } finally {
                setCargando(false);
            }
        };

        cargarUsuarios();
    }, []);

    const obtenerRol = (rol: number) => {
        switch (rol) {
            case 1:
                return "Admin";

            case 2:
                return "Operador";

            case 3:
                return "Consulta";

            default:
                return "Desconocido";
        }
    };

    const obtenerClaseRol = (rol: number) => {
        switch (rol) {
            case 1:
                return "admin";

            case 2:
                return "operador";

            case 3:
                return "consulta";

            default:
                return "";
        }
    };

    const cambiarEstadoUsuario = async (
        usuario: Usuario
    ) => {
        const nuevoEstado = !usuario.activo;

        const confirmar = window.confirm(
            nuevoEstado
                ? `¿Querés activar a ${usuario.nombre}?`
                : `¿Querés desactivar a ${usuario.nombre}?`
        );

        if (!confirmar) {
            return;
        }

        setCambiandoEstadoId(usuario.id);

        try {
            const response =
                await apiClient.patch<Usuario>(
                    `/usuarios/${usuario.id}/estado`,
                    null,
                    {
                        params: {
                            activo: nuevoEstado,
                        },
                    }
                );

            setUsuarios((actuales) =>
                actuales.map((actual) =>
                    actual.id === usuario.id
                        ? response.data
                        : actual
                )
            );
        } catch {
            alert(
                "No se pudo cambiar el estado del usuario."
            );
        } finally {
            setCambiandoEstadoId(null);
        }
    };

    if (cargando) {
        return (
            <div className="usuarios-state">
                Cargando usuarios...
            </div>
        );
    }

    if (error) {
        return (
            <div className="usuarios-state">
                {error}
            </div>
        );
    }

    return (
        <div className="usuarios-page">
            <header className="usuarios-header">
                <div>
                    <p className="page-eyebrow">
                        Don Marcelino
                    </p>

                    <h1>
                        Usuarios
                    </h1>

                    <p>
                        Administración de usuarios y permisos.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                        setModalCrearAbierto(true)
                    }
                >
                    Nuevo usuario
                </button>
            </header>

            <main className="usuarios-content">
                <section className="usuarios-card">
                    <div className="usuarios-card-header">
                        <div>
                            <h2>
                                Usuarios registrados
                            </h2>

                            <p>
                                {usuarios.length} usuario
                                {usuarios.length !== 1
                                    ? "s"
                                    : ""} registrado
                                {usuarios.length !== 1
                                    ? "s"
                                    : ""}.
                            </p>
                        </div>
                    </div>

                    {usuarios.length === 0 ? (
                        <div className="usuarios-empty">
                            No hay usuarios registrados.
                        </div>
                    ) : (
                        <div className="usuarios-table-wrapper">
                            <table className="usuarios-table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Estado</th>
                                        <th>Fecha alta</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuarios.map(
                                        (usuario) => (
                                            <tr
                                                key={
                                                    usuario.id
                                                }
                                            >
                                                <td>
                                                    <strong>
                                                        {
                                                            usuario.nombre
                                                        }
                                                    </strong>
                                                </td>

                                                <td>
                                                    {
                                                        usuario.email
                                                    }
                                                </td>

                                                <td>
                                                    <span
                                                        className={`rol-badge ${obtenerClaseRol(
                                                            usuario.rol
                                                        )}`}
                                                    >
                                                        {obtenerRol(
                                                            usuario.rol
                                                        )}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            usuario.activo
                                                                ? "status-badge active"
                                                                : "status-badge inactive"
                                                        }
                                                    >
                                                        {usuario.activo
                                                            ? "Activo"
                                                            : "Inactivo"}
                                                    </span>
                                                </td>

                                                <td>
                                                    {new Date(
                                                        usuario.fechaAlta
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>
                                                    <div className="usuarios-actions">
                                                        <button
                                                            type="button"
                                                            className="table-action"
                                                            onClick={() =>
                                                                setUsuarioSeleccionado(
                                                                    usuario
                                                                )
                                                            }
                                                        >
                                                            Cambiar rol
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={
                                                                usuario.activo
                                                                    ? "danger-button"
                                                                    : "table-action"
                                                            }
                                                            onClick={() =>
                                                                cambiarEstadoUsuario(
                                                                    usuario
                                                                )
                                                            }
                                                            disabled={
                                                                cambiandoEstadoId ===
                                                                usuario.id
                                                            }
                                                        >
                                                            {cambiandoEstadoId ===
                                                                usuario.id
                                                                ? "Guardando..."
                                                                : usuario.activo
                                                                    ? "Desactivar"
                                                                    : "Activar"}
                                                        </button>
                                                    </div>
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

            <CrearUsuarioModal
                abierto={modalCrearAbierto}
                onCerrar={() =>
                    setModalCrearAbierto(false)
                }
                onCreado={(nuevoUsuario) =>
                    setUsuarios((actuales) => [
                        ...actuales,
                        nuevoUsuario,
                    ])
                }
            />

            {usuarioSeleccionado && (
                <CambiarRolUsuarioModal
                    abierto={true}
                    usuario={
                        usuarioSeleccionado
                    }
                    onCerrar={() =>
                        setUsuarioSeleccionado(
                            null
                        )
                    }
                    onActualizado={(actualizado) => {
                        setUsuarios((actuales) =>
                            actuales.map(
                                (usuario) =>
                                    usuario.id ===
                                        actualizado.id
                                        ? actualizado
                                        : usuario
                            )
                        );

                        setUsuarioSeleccionado(
                            null
                        );
                    }}
                />
            )}
        </div>
    );
}