import { Link, useLocation } from "react-router-dom";
import { useReports } from "../context/ReportContext";

/**
 * Dashboard.tsx
 * - Sol panelden hesaplama sayfalarına geçiş sağlar.
 * - Alt kısımda "Raporlar" linki bulunur.
 * - Aktif olunan sayfa highlight (arka plan) ile gösterilir.
 */
const Dashboard = () => {
    const location = useLocation();
    const { reports } = useReports();

    // Sidebar link bilgileri
    const menuItems = [
        { path: "/home/deprem-yuku", label: "Deprem Yükü" },
        { path: "/home/basinc", label: "Basınç" },
        { path: "/home/pompa-gucu", label: "Pompa Gücü" },
        { path: "/home/isil-guc", label: "Isıl Güç" },
        { path: "/home/havalandirma-debisi", label: "Havalandırma Debisi" },
        { path: "/home/fan-gucu", label: "Fan Gücü" },
        { path: "/home/mekanik-guc", label: "Mekanik Güç" },
        { path: "/home/donme-momentumu", label: "Dönme Momentumu" },
        { path: "/home/isil-genlesme", label: "Isıl Genleşme" },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Hesaplamalar menüsü */}
            <nav className="flex flex-col gap-2 flex-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`p-2 rounded transition ${
                            location.pathname === item.path
                                ? "bg-white/20 shadow-md font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Raporlar linki */}
            <div className="mt-6 border-t border-white/20 pt-4">
                <Link
                    to="/home/raporlar"
                    className={`block p-2 rounded transition ${
                        location.pathname === "/home/raporlar"
                            ? "bg-green-600 shadow-md font-semibold"
                            : "hover:bg-green-700"
                    }`}
                >
                    📑 Raporlar ({reports.length})
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
