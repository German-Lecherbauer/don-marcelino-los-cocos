import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import apiClient from "../api/apiClient";
import type { LoginResponse, Usuario } from "../types/auth";

interface AuthContextType {
    usuario: Usuario | null;
    token: string | null;
    autenticado: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenGuardado = localStorage.getItem("token");
        const usuarioGuardado = localStorage.getItem("usuario");

        if (tokenGuardado && usuarioGuardado) {
            setToken(tokenGuardado);
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const login = async (
        email: string,
        password: string
    ): Promise<void> => {
        const response = await apiClient.post<LoginResponse>(
            "/auth/login",
            {
                email,
                password,
            }
        );

        const { token, usuario } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        setToken(token);
        setUsuario(usuario);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setToken(null);
        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                token,
                autenticado: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider."
        );
    }

    return context;
}