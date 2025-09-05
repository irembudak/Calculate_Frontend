import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import { useAuth } from "../hooks/useAuth";

// Router yapısı: hangi path hangi sayfayı açacak.
// useAuth hook'u ile kullanıcı giriş yaptı mı kontrol ediyoruz.

const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Register */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Home: sadece giriş yapmış kullanıcılar görebilir */}
            <Route
                path="/home"
                element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
            />

            {/* Default: bilinmeyen adresi login'e yönlendir */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRouter;

function App() {
    return (
        <Router>
            <Routes>
                {/* Ana sayfalar */}
                <Route path="/" element={<h1>Ana Sayfa</h1>} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>Register</h1>} />

                {/* Hesaplamalar */}
                <Route path="/pompa-gucu" element={<PompaGucu />} />
                <Route path="/deprem-yuku" element={<DepremYuku />} />
                <Route path="/basinc" element={<Basinc />} />
                <Route path="/isil-guc" element={<IsilGuc />} />
                <Route path="/havalandirma-debisi" element={<HavalandirmaDebisi />} />
                <Route path="/fan-gucu" element={<FanGucu />} />
                <Route path="/mekanik-guc" element={<MekanikGuc />} />
                <Route path="/donme-momentumu" element={<DonmeMomentumu />} />
                <Route path="/isil-genlesme" element={<IsilGenlesme />} />
            </Routes>
        </Router>
    );
}

export default App;
