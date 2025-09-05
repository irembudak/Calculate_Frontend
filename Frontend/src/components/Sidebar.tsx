import React from "react";

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-gray-900 bg-opacity-90 p-6 shadow-lg min-h-screen">
            <h3 className="sidebar-title text-xl font-semibold mb-6">Hesaplamalar</h3>
            <ul className="space-y-3">
                <li className="hover:text-purple-400 cursor-pointer">Deprem Yükü</li>
                <li className="hover:text-purple-400 cursor-pointer">Basınç</li>
                <li className="hover:text-purple-400 cursor-pointer">Pompa Gücü</li>
            </ul>
        </div>
    );
};

export default Sidebar;
