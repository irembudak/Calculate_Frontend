import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    I: number; // Atalet momenti (kg·m²)
    w: number; // Açısal hız (rad/s)
}

const DonmeMomentumu: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ I: 0, w: 0 });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu görünürlük kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişikliklerini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    // ✅ Hesaplama: L = I * ω
    const handleCalculate = () => {
        const { I, w } = values;

        if (I > 0 && w > 0) {
            const L = I * w;
            setResult(L);
            setShowReportBtn(true);
        } else {
            setResult(null);
            setShowReportBtn(false);
        }
    };

    // ✅ Rapor kaydet (artık sadece kaydediyor, PDF indirmiyor!)
    const handleReport = () => {
        if (result === null) return;

        saveAndExportReport(
            "Dönme Momentumu Hesaplama",
            {
                "Atalet Momenti (I)": `${values.I} kg·m²`,
                "Açısal Hız (ω)": `${values.w} rad/s`,
            },
            `Dönme Momentumu (L) = ${result.toFixed(2)} kg·m²/s`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto mt-10">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-center">
                Dönme Momentumu Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">I (kg·m²):</label>
                    <input
                        type="number"
                        step="any"
                        name="I"
                        value={values.I}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="Atalet momenti"
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
                        Sonuç (L):{" "}
                        <span className="text-blue-600">{result.toFixed(2)} kg·m²/s</span>
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

export default DonmeMomentumu;
