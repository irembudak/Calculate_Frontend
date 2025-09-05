import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    T: number; // Tork (N·m)
    w: number; // Açısal hız (rad/s)
}

const MekanikGuc: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ T: 0, w: 0 });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    // ✅ Hesaplama: P = T * ω
    // T → Tork (N·m)
    // ω → Açısal hız (rad/s)
    // Sonuç → Watt (W)
    const handleCalculate = () => {
        const { T, w } = values;

        if (T > 0 && w > 0) {
            const P = T * w;
            setResult(P);
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
            "Mekanik Güç Hesaplama",
            {
                "Tork (T)": `${values.T} N·m`,
                "Açısal Hız (ω)": `${values.w} rad/s`,
            },
            `Mekanik Güç (P) = ${result.toFixed(2)} W`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto mt-10">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-center">
                Mekanik Güç Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">T (N·m):</label>
                    <input
                        type="number"
                        step="any"
                        name="T"
                        value={values.T}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="Tork"
                    />
                </div>

                <div>
                    <label className="font-semibold">ω (rad/s):</label>
                    <input
                        type="number"
                        step="any"
                        name="w"
                        value={values.w}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="Açısal hız"
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
                        Sonuç (P):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} W</span>
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

export default MekanikGuc;
