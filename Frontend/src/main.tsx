import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind veya global CSS
import { AuthProvider } from "./context/AuthContext";
import { ReportProvider } from "./context/ReportContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* ✅ Kullanıcı oturumu için AuthProvider */}
        {/* ✅ Raporları yönetmek için ReportProvider */}
        <AuthProvider>
            <ReportProvider>
                <App />
            </ReportProvider>
        </AuthProvider>
    </React.StrictMode>
);
