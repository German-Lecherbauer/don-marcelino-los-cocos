import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PacientesPage from "./pages/PacientesPage";
import PacienteDetallePage from "./pages/PacienteDetallePage";
import MembresiasPage from "./pages/MembresiasPage";
import MembresiaDetallePage from "./pages/MembresiaDetallePage";
import UsuariosPage from "./pages/UsuariosPage";
import AuditoriaPage from "./pages/AuditoriaPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import MainLayout from "./layouts/MainLayout";

export default function App() {
    return (
        <Routes>
            {/* Público */}
            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            {/* Área privada */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/pacientes"
                    element={<PacientesPage />}
                />

                <Route
                    path="/pacientes/:id"
                    element={<PacienteDetallePage />}
                />

                <Route
                    path="/membresias"
                    element={<MembresiasPage />}
                />

                <Route
                    path="/membresias/:id"
                    element={<MembresiaDetallePage />}
                />

                <Route
                    path="/usuarios"
                    element={
                        <AdminRoute>
                            <UsuariosPage />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/auditoria"
                    element={
                        <AdminRoute>
                            <AuditoriaPage />
                        </AdminRoute>
                    }
                />
            </Route>

            {/* Ruta inexistente */}
            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />
        </Routes>
    );
}