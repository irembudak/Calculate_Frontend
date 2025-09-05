import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    n: number; // Hava değişim sayısı (1/saat)
    V: number; // Hacim (m³)
}

const HavalandirmaDebisi: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ n: 0, V: 0 });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });

    // ✅ Hesaplama: Q = (n * V) / 3600
    // n → hava değişim sayısı (1/saat)
    // V → hacim (m³)
    // 3600 → saniyeye çevirmek için
    const handleCalculate = () => {
        const { n, V } = values;

        if (n > 0 && V > 0) {
            const Q = (n * V) / 3600; // m³/s
            setResult(Q);
            setShowReportBtn(true);
        } else {
            setResult(null);
            setShowReportBtn(false);
        }
    };

    // ✅ Rapor kaydetme (artık sadece kaydediyor, PDF indirmiyor!)
    const handleReport = () => {
        if (result === null) return;

        saveAndExportReport(
            "Havalandırma Debisi Hesaplama",
            {
                "Hava Değişim Sayısı (n)": `${values.n} 1/saat`,
                "Hacim (V)": `${values.V} m³`,
            },
            `Debi (Q) = ${result.toFixed(2)} m³/s`
        );

        setShowReportBtn(false); // kayıttan sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-black text-center">
                Havalandırma Debisi Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">n (1/saat):</label>
                    <input
                        type="number"
                        step="any"
                        name="n"
                        value={values.n}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold">V (m³):</label>
                    <input
                        type="number"
                        step="any"
                        name="V"
                        value={values.V}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                    />
                </div>
            </div>

            {/* Hesapla butonu */}
            <button
                onClick={handleCalculate}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Hesapla
            </button>

            {/* Sonuç kutusu */}
            {result !== null && (
                <div className="mt-4 p-3 bg-white rounded-lg shadow text-black">
                    <p className="font-bold">
                        Sonuç (Q):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} m³/s</span>
                    </p>
                </div>
            )}

            {/* Raporla butonu */}
            {showReportBtn && (
                <button
                    onClick={handleReport}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    📄 Raporla
                </button>
            )}
        </div>
    );
};

export default HavalandirmaDebisi;
