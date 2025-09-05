import React from "react";
import { useAuth } from "../context/AuthContext";

/**
 * HomePage:
 * - Kullanıcı giriş yaptıktan sonra açılan ilk sayfa
 * - Hoş geldin mesajı içerir
 * - Kullanıcıyı sol panelden hesaplamalara yönlendirir
 */
const HomePage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-purple-700 mb-4">
                Hoş Geldiniz, {user?.name || "Kullanıcı"} 🎉
            </h1>
            <p className="text-lg text-gray-700">
                Bu platformda farklı <span className="font-semibold">mühendislik hesaplamaları</span>
                yapabilir ve sonuçlarınızı raporlayabilirsiniz.
            </p>
            <p className="text-md text-gray-600 mt-4">
                Sol menüden bir hesaplama seçin ve hemen başlayın 🚀
            </p>
        </div>
    );
};

export default HomePage;
