import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PacientesPage from "./pages/PacientesPage";
import PacienteDetallePage from "./pages/PacienteDetallePage";
import MembresiasPage from "./pages/MembresiasPage";
import UsuariosPage from "./pages/UsuariosPage";
import AuditoriaPage from "./pages/AuditoriaPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import MembresiaDetallePage from "./pages/MembresiaDetallePage";

export default function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

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
                    path="/usuarios"
                    element={<UsuariosPage />}
                />

                <Route
                    path="/auditoria"
                    element={<AuditoriaPage />}
                />
            </Route>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

            <Route
                path="/membresias/:id"
                element={<MembresiaDetallePage />}
            />

        </Routes>
    );
}