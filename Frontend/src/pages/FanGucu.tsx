import React, { useState } from "react";
import { useReports } from "../context/ReportContext"; // ✅ global rapor context

// 🔹 Girdi tipleri
interface Inputs {
    Q: number;   // Debi (m³/s)
    dp: number;  // Basınç farkı (Pa)
    eta: number; // Verim (0–1 arası)
}

const FanGucu: React.FC = () => {
    // 🔹 Kullanıcı girişleri
    const [values, setValues] = useState<Inputs>({ Q: 0, dp: 0, eta: 1 });

    // 🔹 Hesaplama sonucu
    const [result, setResult] = useState<number | null>(null);

    // 🔹 Rapor butonu kontrolü
    const [showReportBtn, setShowReportBtn] = useState(false);

    // 🔹 Global rapor fonksiyonları
    const { saveAndExportReport } = useReports();

    // ✅ Input değişimlerini yakala
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [e.target.name]: parseFloat(e.target.value) || 0 });

    // ✅ Hesaplama: P = (Q * Δp) / η
    const handleCalculate = () => {
        const { Q, dp, eta } = values;

        if (eta > 0) {
            const P = (Q * dp) / eta;
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
            "Fan Gücü Hesaplama",
            {
                "Debi (Q)": `${values.Q} m³/s`,
                "Basınç Farkı (Δp)": `${values.dp} Pa`,
                "Verim (η)": values.eta.toString(),
            },
            `Fan Gücü (P) = ${result.toFixed(2)} W`
        );

        setShowReportBtn(false); // rapor kaydedildikten sonra buton gizlenir
    };

    return (
        <div className="bg-gray-200 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            {/* Başlık */}
            <h2 className="text-xl font-bold mb-4 text-black text-center">
                Fan Gücü Hesaplama
            </h2>

            {/* Input alanları */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold text-black mb-1">
                        Q (Debi) [m³/s]
                    </label>
                    <input
                        type="number"
                        name="Q"
                        value={values.Q}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-black mb-1">
                        Δp (Basınç farkı) [Pa]
                    </label>
                    <input
                        type="number"
                        name="dp"
                        value={values.dp}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-black mb-1">
                        η (Verim) [0–1]
                    </label>
                    <input
                        type="number"
                        name="eta"
                        step="any"
                        value={values.eta}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
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
                <div className="mt-4 p-3 bg-white flex justify-between items-center rounded shadow text-black">
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
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    📄 Raporla
                </button>
            )}
        </div>
    );
};

export default FanGucu;
