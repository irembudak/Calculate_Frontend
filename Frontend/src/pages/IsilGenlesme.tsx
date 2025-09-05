import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    L0: number;     // İlk uzunluk (m)
    alpha: number;  // Genleşme katsayısı (1/°C)
    deltaT: number; // Sıcaklık farkı (°C)
}

const IsilGenlesme: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ L0: 0, alpha: 0, deltaT: 0 });

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

    // ✅ Hesaplama: ΔL = L0 * α * ΔT
    const handleCalculate = () => {
        const { L0, alpha, deltaT } = values;

        if (L0 > 0 && alpha > 0 && deltaT !== 0) {
            const deltaL = L0 * alpha * deltaT; // sonuç (m)
            setResult(deltaL);
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
            "Isıl Genleşme Hesaplama",
            {
                "İlk Uzunluk (L₀)": `${values.L0} m`,
                "Genleşme Katsayısı (α)": `${values.alpha} 1/°C`,
                "Sıcaklık Farkı (ΔT)": `${values.deltaT} °C`,
            },
            `Uzama (ΔL) = ${result.toFixed(6)} m`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra butonu gizle
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto mt-10">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-center">
                Isıl Genleşme Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">L₀ (m):</label>
                    <input
                        type="number"
                        step="any"
                        name="L0"
                        value={values.L0}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="İlk uzunluk"
                    />
                </div>

                <div>
                    <label className="font-semibold">α (1/°C):</label>
                    <input
                        type="number"
                        step="any"
                        name="alpha"
                        value={values.alpha}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="Genleşme katsayısı"
                    />
                </div>

                <div>
                    <label className="font-semibold">ΔT (°C):</label>
                    <input
                        type="number"
                        step="any"
                        name="deltaT"
                        value={values.deltaT}
                        onChange={handleChange}
                        className="p-2 rounded-lg border w-full"
                        placeholder="Sıcaklık farkı"
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
                        Sonuç (ΔL):{" "}
                        <span className="text-blue-600">{result.toFixed(6)} m</span>
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

export default IsilGenlesme;
