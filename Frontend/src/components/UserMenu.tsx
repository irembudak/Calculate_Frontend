import React from "react";
import { useAuth } from "../hooks/useAuth";

const UserMenu: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex items-center gap-4">
      <span className="font-medium text-white">
        Merhaba, {user?.name || "Kullanıcı"}
      </span>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
                Çıkış Yap
            </button>
        </div>
    );
};

export default UserMenu;
