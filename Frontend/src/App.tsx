// React Router bileşenleri
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
// Auth durumu için context
import { useAuth } from "./context/AuthContext";

// Sayfalar
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";

// Hesaplama sayfaları
import DepremYuku from "./pages/DepremYuku";
import Basinc from "./pages/Basinc";
import PompaGucu from "./pages/PompaGucu";
import IsilGuc from "./pages/IsilGuc";
import HavalandirmaDebisi from "./pages/HavalandirmaDebisi";
import FanGucu from "./pages/FanGucu";
import MekanikGuc from "./pages/MekanikGuc";
import DonmeMomentumu from "./pages/DonmeMomentumu";
import IsilGenlesme from "./pages/IsilGenlesme";

// Raporlar sayfası
import ReportsPage from "./pages/Raporlar";
// src/App.tsx

function App() {
    // Kullanıcının giriş durumunu kontrol et
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Register */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Home (Dashboard yapısı) */}
                <Route
                    path="/home"
                    element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
                >
                    {/* Varsayılan yönlendirme */}
                    <Route index element={<Navigate to="deprem-yuku" replace />} />

                    {/* Hesaplama sayfaları */}
                    <Route path="deprem-yuku" element={<DepremYuku />} />
                    <Route path="basinc" element={<Basinc />} />
                    <Route path="pompa-gucu" element={<PompaGucu />} />
                    <Route path="isil-guc" element={<IsilGuc />} />
                    <Route path="havalandirma-debisi" element={<HavalandirmaDebisi />} />
                    <Route path="fan-gucu" element={<FanGucu />} />
                    <Route path="mekanik-guc" element={<MekanikGuc />} />
                    <Route path="donme-momentumu" element={<DonmeMomentumu />} />
                    <Route path="isil-genlesme" element={<IsilGenlesme />} />

                    {/* Raporlar sayfası */}
                    <Route path="raporlar" element={<ReportsPage />} />
                </Route>

                {/* Root adresine gidilirse login'e yönlendir */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
