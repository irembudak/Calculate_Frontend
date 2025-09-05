import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Modal gösterim durumu
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-gray-900 text-white flex flex-col p-4">
                {/* Başlık - beyaz renk */}
                <h3 className="sidebar-title text-xl font-semibold mb-6">Hesaplamalar</h3>

                <nav className="flex flex-col gap-2">
                    <Link
                        to="deprem-yuku"
                        className={`p-2 rounded ${
                            location.pathname.includes("deprem-yuku")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Deprem Yükü
                    </Link>
                    <Link
                        to="basinc"
                        className={`p-2 rounded ${
                            location.pathname.includes("basinc")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Basınç
                    </Link>
                    <Link
                        to="pompa-gucu"
                        className={`p-2 rounded ${
                            location.pathname.includes("pompa-gucu")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Pompa Gücü
                    </Link>
                    <Link
                        to="isil-guc"
                        className={`p-2 rounded ${
                            location.pathname.includes("isil-guc")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Isıl Güç
                    </Link>
                    <Link
                        to="havalandirma-debisi"
                        className={`p-2 rounded ${
                            location.pathname.includes("havalandirma-debisi")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Havalandırma Debisi
                    </Link>
                    <Link
                        to="fan-gucu"
                        className={`p-2 rounded ${
                            location.pathname.includes("fan-gucu")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Fan Gücü
                    </Link>
                    <Link
                        to="mekanik-guc"
                        className={`p-2 rounded ${
                            location.pathname.includes("mekanik-guc")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Mekanik Güç
                    </Link>
                    <Link
                        to="donme-momentumu"
                        className={`p-2 rounded ${
                            location.pathname.includes("donme-momentumu")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Dönme Momentumu
                    </Link>
                    <Link
                        to="isil-genlesme"
                        className={`p-2 rounded ${
                            location.pathname.includes("isil-genlesme")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Isıl Genleşme
                    </Link>
                </nav>

                {/* Raporlar linki */}
                <div className="mt-auto">
                    <Link
                        to="raporlar"
                        className={`p-2 flex items-center gap-2 rounded ${
                            location.pathname.includes("raporlar")
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                        }`}
                    >
                        📊 Raporlar
                    </Link>
                </div>
            </aside>

            {/* İçerik ve üst menü */}
            <main className="flex-1 flex flex-col">
                {/* Üst menü */}
                <header className="flex justify-end items-center bg-gray-800 text-white p-4 gap-4">
                    {/* Kullanıcı adı */}
                    <button className="bg-gray-700 px-4 py-2 rounded">
                        {user?.name || "Admin"}
                    </button>

                    {/* Çıkış butonu */}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                    >
                        Çıkış
                    </button>
                </header>

                {/* Seçili hesaplama sayfası */}
                <div className="flex-1 p-6 bg-gradient-to-r from-purple-800 via-purple-600 to-black text-white overflow-y-auto">
                    <Outlet />
                </div>
            </main>

            {/* Çıkış modalı */}
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <h2 className="text-lg font-bold mb-4">
                            Çıkış yapmak istediğinize emin misiniz?
                        </h2>
                        <div className="flex gap-4 justify-end">
                            {/* Evet: oturumu kapat ve login sayfasına dön */}
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/login");
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Evet
                            </button>
                            {/* Hayır: modalı kapat */}
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="bg-gray-400 px-4 py-2 rounded"
                            >
                                Hayır
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
