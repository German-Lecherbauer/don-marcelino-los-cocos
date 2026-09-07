import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
import "./CambiarRolUsuarioModal.css";

interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: number;
    activo: boolean;
    fechaAlta: string;
}

interface CambiarRolUsuarioModalProps {
    abierto: boolean;
    usuario: Usuario;
    onCerrar: () => void;
    onActualizado: (usuario: Usuario) => void;
}

export default function CambiarRolUsuarioModal({
    abierto,
    usuario,
    onCerrar,
    onActualizado,
}: CambiarRolUsuarioModalProps) {
    const [rol, setRol] =
        useState(usuario.rol);

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);

    useEffect(() => {
        if (abierto) {
            setRol(usuario.rol);
            setError("");
        }
    }, [abierto, usuario]);

    if (!abierto) {
        return null;
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (rol === usuario.rol) {
            setError(
                "Seleccioná un rol diferente al actual."
            );
            return;
        }

        setGuardando(true);

        try {
            const response =
                await apiClient.patch<Usuario>(
                    `/usuarios/${usuario.id}/rol`,
                    {
                        rol,
                    }
                );

            onActualizado(
                response.data
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data =
                    error.response?.data;

                setError(
                    data?.error ??
                    data?.message ??
                    data?.detail ??
                    "No se pudo cambiar el rol."
                );
            } else {
                setError(
                    "Ocurrió un error inesperado."
                );
            }
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="cambiar-rol-backdrop">
            <div className="cambiar-rol-card">
                <div className="cambiar-rol-header">
                    <div>
                        <h2>
                            Cambiar rol
                        </h2>

                        <p>
                            {usuario.nombre}
                            {" · "}
                            {usuario.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="cambiar-rol-close"
                        onClick={onCerrar}
                        disabled={guardando}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="cambiar-rol-field">
                        <label htmlFor="nuevoRol">
                            Nuevo rol
                        </label>

                        <select
                            id="nuevoRol"
                            value={rol}
                            onChange={(e) =>
                                setRol(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        >
                            <option value={1}>
                                Admin
                            </option>

                            <option value={2}>
                                Operador
                            </option>

                            <option value={3}>
                                Consulta
                            </option>
                        </select>
                    </div>

                    {error && (
                        <div className="cambiar-rol-error">
                            {error}
                        </div>
                    )}

                    <div className="cambiar-rol-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onCerrar}
                            disabled={guardando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : "Guardar rol"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}