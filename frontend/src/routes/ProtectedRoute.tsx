import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const { autenticado } = useAuth();

    if (!autenticado) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <>{children}</>;
}