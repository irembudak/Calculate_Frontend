import React from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

const Raporlar: React.FC = () => {
    const { reports, exportToPDF } = useReports(); // rapor listesi ve PDF indirme fonksiyonu

    return (
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10">
            {/* Sayfa başlığı */}
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
                📊 Raporlar
            </h2>

            {/* Eğer hiç rapor yoksa mesaj göster */}
            {reports.length === 0 ? (
                <p className="text-center text-gray-600">
                    Henüz rapor oluşturulmadı.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 shadow-md rounded-lg bg-white">
                        {/* Tablo başlıkları */}
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                        <tr>
                            <th className="p-3 text-left">Başlık</th>
                            <th className="p-3 text-left">Girdi Değerleri</th>
                            <th className="p-3 text-left">Sonuç</th>
                            <th className="p-3 text-left">Tarih</th>
                            <th className="p-3 text-center">İşlemler</th>
                        </tr>
                        </thead>

                        {/* Tablo içerikleri */}
                        <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b">
                                {/* Başlık */}
                                <td className="px-4 py-2 font-bold text-black">
                                    {report.title}
                                </td>

                                {/* Girdi değerleri */}
                                <td className="px-4 py-2 text-black">
                                    {Object.entries(report.inputs).map(([k, v]) => (
                                        <div key={k}>
                                            {k} = {v}
                                        </div>
                                    ))}
                                </td>

                                {/* Sonuç */}
                                <td className="px-4 py-2 text-black">{report.result}</td>

                                {/* Tarih */}
                                <td className="px-4 py-2 text-black">{report.createdAt}</td>

                                {/* İşlem butonları */}
                                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                                    {/* ⬇️ İndir butonu */}
                                    <button
                                        onClick={() => exportToPDF(report)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        ⬇️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Raporlar;
