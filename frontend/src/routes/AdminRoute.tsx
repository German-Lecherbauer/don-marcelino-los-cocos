import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface AdminRouteProps {
    children: ReactNode;
}

export default function AdminRoute({
    children,
}: AdminRouteProps) {
    const {
        autenticado,
        usuario,
    } = useAuth();

    if (!autenticado || !usuario) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (usuario.rol !== 1) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return <>{children}</>;
}